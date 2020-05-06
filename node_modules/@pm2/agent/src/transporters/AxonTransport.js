'use strict'

const axon = require('pm2-axon')
const nssocket = require('nssocket')
const log = require('debug')('interactor:axon')
const cst = require('../../constants.js')
const Utility = require('../Utility.js')
const url = require('url')
const async = require('async')
const DataRetriever = require('../push/DataRetriever.js')
const Transporter = require('./Transporter')

/**
 * Axon Transport used to communicate with KM
 * @param {Object} opts options
 * @param {Daemon} daemon Interactor instance
 */
module.exports = class AxonTransport extends Transporter {
  constructor (opts, daemon) {
    super()
    log('AxonTransporter constructed')
    this.opts = opts
    this._daemon = daemon
    this._socket = null
    this._axon = null
    this.buffer = {}
    this.axonReconnectCounter = 0

    this._pushWorker = setInterval(this._send.bind(this), cst.STATUS_INTERVAL)
  }

  /**
   * Connect the axon client to a url
   * @param {String} url where the client will connect
   * @param {Function} cb invoked with <err>
   */
  connect (urls, cb) {
    log('Connecting axon transporter...')
    let self = this
    if (typeof urls === 'function') {
      cb = urls
      urls = this.urls
    }
    this.urls = urls
    let pullUrl = url.parse(urls.pull)
    let pullHost = pullUrl.hostname
    let pullPort = pullUrl.port
    let pushUrl = url.parse(urls.push)
    let pushHost = pushUrl.hostname
    let pushPort = pushUrl.port

    this._axon = axon.socket('pub')

    // Create connection to reverse interaction server
    this._socket = new nssocket.NsSocket({
      type: 'tcp4',
      reconnect: false,
      maxListeners: 50
    })
    // Authenticate request on reverse server
    this._socket.data('ask', () => {
      log('Authenticate axon transporter')
      let data = this._daemon.getSystemMetadata()
      for (let key in data) {
        data[key.toLowerCase()] = data[key]
        delete data[key]
      }
      data = Utility.Cipher.cipherMessage(JSON.stringify(data), this.opts.SECRET_KEY)

      // Send response
      if (!this._socket) return false // disconnected before
      this._socket.send('ask:rep', {
        data: data,
        public_key: this.opts.PUBLIC_KEY
      })
      return false
    })

    // Errors / close
    this._socket.on('close', _ => {
      log('Got a close on nssocket connection')
      this._onClose()
    })
    this._socket.on('error', (err) => {
      log(`Got an error on nssocket connection: ${err.message}`)
      this._onError(err)
    })
    this._axon.on('close', _ => {
      log('Got a close on axon connection')
    })
    this._axon.on('error', (err) => {
      log(`Got an error on axon connection: ${err.message}`)
    })
    this._axon.on('reconnect attempt', _ => {
      log(`Axon is trying to reconnect`)
    })

    // Setup listener
    this._socket.data('*', function (data) {
      // Call _onMessage() with event and data as params
      // Apply self to use this as transport
      return self._onMessage.apply(self, [ this, data ]) // eslint-disable-line
    })

    // Connect to interaction/reverse server
    log(`Connect axon with ${pushHost}:${pushPort} and nssocket with ${pullHost}:${pullPort}`)
    async.parallel([
      (next) => this._axon.connect(parseInt(pushPort), pushHost, next),
      (next) => this._socket.connect(parseInt(pullPort), pullHost, next)
    ], cb)
  }

  /**
   * Disconnect clients
   */
  disconnect () {
    log('Disconnect axon transporter')
    if (this._socket) {
      log('Destroy pull socket on axon transporter')
      this._socket.destroy()
    }
    if (this._axon) {
      log('Destroy push axon on axon transporter')
      this._axon.close()
    }
    this._axon = null
    this._socket = null
  }

  /**
   * Are push and reverse connections ready
   * @return {Boolean}
   */
  isConnected () {
    const isNsSocketConnected = this._socket && this._socket.connected
    const isAxonConnected = this._axon && this._axon.socks && this._axon.socks[0]
    if (!isNsSocketConnected) log('Nssocket is not connected anymore')
    if (!isAxonConnected) log(`Axon is not connected anymore (Buffer: ${this._axon && this._axon.socks && this._axon.socks[0] ? this._axon.sock.socks[0].bufferSize : 0})`)
    return isNsSocketConnected && isAxonConnected
  }

  /**
   * Send data to buffer
   * @param {String} channel
   * @param {Object} data
   */
  send (channel, data) {
    // Handle bad packet
    if (!channel || !data) return log('Trying to send message without all necessary fields')
    // Handle status
    if (channel === 'status' || channel === 'monitoring') return log('Status messages are handled manually with axon.')
    // Handle custom channels
    if (channel === 'profiling') return this.sendFile(data)
    if (channel.indexOf('trigger:') !== -1) return this.sendViaNssocket(channel, data)

    log('Sending packet to buffer over for channel %s', channel)
    if (!this.buffer[channel]) this.buffer[channel] = []
    return this.buffer[channel].push(data)
  }

  /**
   * Send file
   * @param {Object} data
   */
  sendFile (data) {
    if (!this.isConnected()) return log("Can't send file, axon is not connected")
    const meta = {
      pm_id: data.pm_id,
      name: data.name,
      server_name: data.server_name,
      public_key: data.public_key,
      type: data.type
    }
    meta[data.type] = true

    return this._axon.send(JSON.stringify(meta), data.data)
  }

  /**
   * Prepare packet, add status
   * @param {Function} next
   */
  preparePacket (next) {
    if (typeof this._daemon.getPM2Client().rpc.getMonitorData !== 'function') return next(new Error('Not able to connect to PM2'))
    this._daemon.getPM2Client().rpc.getMonitorData({}, (err, processes) => {
      if (err || !processes) return next(err || new Error('Not able to retrieve PM2 processes'))

      log('Add status to packet')
      processes = processes.filter((proc) => proc.pm2_env._km_monitored !== false)
      this.buffer['status'] = {
        data: DataRetriever.status(processes, this.opts),
        server_name: this.opts.MACHINE_NAME,
        internal_ip: this.opts.internal_ip,
        rev_con: true
      }
      this.buffer.server_name = this.opts.MACHINE_NAME
      return next()
    })
  }

  /**
   * Send buffer to endpoints
   */
  _send () {
    log(`Sending data to endpoints (Buffer size: ${Object.keys(this.buffer).length} keys [${Object.keys(this.buffer).join(', ')}])`)
    if (!this.isConnected()) return log("Axon is not connected, can't send any data.")

    // Handle axon buffer size
    if (this._axon.socks[0].bufferSize > 290000) {
      this.buffer = {} // reset buffer
      log(`Axon buffer is too high (${this._axon.socks[0].bufferSize}), stop sending data to it.`)
      if (++this.axonReconnectCounter > 20) {
        log('Forcing axon reconnection')
        this.axonReconnectCounter = 0
        this.reconnect(this.urls, _ => {
          log('Axon is now reconnected')
        })
      }
      return false
    }

    // Send status with packet
    this.preparePacket((err) => {
      if (err) return log(`Got an error on packet preparation: ${err.message}`)

      let packet = {
        public_key: this.opts.PUBLIC_KEY,
        data: Utility.Cipher.cipherMessage(this.buffer, this.opts.SECRET_KEY)
      }
      this.buffer = {} // reset buffer
      return this._axon.sendv2(JSON.stringify(packet), _ => {
        log('Buffer was sended.')
        packet = null
      })
    })
  }

  /**
   * Send via nssocket
   */
  sendViaNssocket (channel, data) {
    if (!this.isConnected()) return log("Can't send file, nssocket is not connected")
    return this._socket.send(channel, data)
  }

  /**
   * Broadcast the close event from websocket connection
   * @private
   * @param {Integer} code
   * @param {String} reason
   */
  _onMessage (event, data) {
    if (!data) return
    data = Utility.Cipher.decipherMessage(data, this.opts.SECRET_KEY)
    if (!data) return

    // ensure that all required field are present
    let eventName = event.event.join(':').substr('data:'.length)
    log('Received event %s from reverse server, emit it', eventName)
    this.emit(eventName, data)
  }
}
