'use strict'

const debug = require('debug')('agent:main')
const os = require('os')
const http = require('./utils/http')
const cst = require('../constants')
const meta = require('./utils/meta')
const version = require('../package.json').version
const Transport = require('./transport')

module.exports = class Agent {
  /**
   * Init new agent
   * @param {Object} config Configuration
   * @param {String} config.publicKey
   * @param {String} config.secretKey
   * @param {String} config.appName
   * @param {String} [config.serverName] Will be hostname if not provided
   * @param {String} [config.logFilter] RegExp used to filter logs
   * @param {Object} process Process to send
   */
  constructor (config, proc) {
    // Valid config
    if (!config ||
      typeof config.publicKey !== 'string' ||
      typeof config.secretKey !== 'string' ||
      typeof config.appName !== 'string' ||
      (typeof config.proxy !== 'undefined' && typeof config.proxy !== 'string') ||
      typeof proc !== 'object') {
      const err = new Error('You need to provide a valid configuration and process!')
      return err
    }
    debug(`New agent constructed with: [public: ${config.publicKey}, secret: ${config.secretKey}, app: ${config.appName}]`)
    if (!config.serverName) {
      const hostname = os.hostname().toLowerCase()
      config.serverName = `${hostname}-${this.generateUniqueId().substring(0, 6)}`
    }
    this.config = config
    if (this.config.logFilter && !(this.config.logFilter instanceof RegExp)) {
      this.config.logFilter = new RegExp(this.config.logFilter)
    }
    proc.unique_id = this.generateUniqueId()
    this.process = proc
    // Options to continously send logs to remote endpoint
    this.sendLogs = typeof config === 'object' && typeof config.sendLogs === 'boolean' ? config.sendLogs : false
    this.disableLogs = typeof config === 'object' && typeof config.disableLogs === 'boolean' ? config.disableLogs : false
    this.methods = { // Used to destruct
      processOutWrite: process.stdout.write,
      processErrWrite: process.stderr.write
    }
    // Init transport (listen event emitter even if an error occur)
    this.transport = new Transport()
  }

  /**
   * Used to destruct agent
   */
  destruct () {
    this.stop()
    process.stdout.write = this.methods.processOutWrite
    process.stderr.write = this.methods.processErrWrite
  }

  /**
   * Check credentials and start agent
   */
  start () {
    return new Promise((resolve, reject) => {
      if (this.isStopping) return reject(new Error('Agent is stopping'))

      // Trying to check infos
      this.checkCredentials(this.config, (err, endpoints) => {
        if (err) {
          this.restartOnError(err)
          return resolve() // avoid reject if we retry
        }

        // Connect to websocket
        this.transport.setConfig(endpoints.ws, {
          'X-KM-PUBLIC': this.config.publicKey,
          'X-KM-SECRET': this.config.secretKey,
          'X-KM-SERVER': this.config.serverName,
          'X-PM2-VERSION': cst.PM2_VERSION,
          'X-PROTOCOL-VERSION': cst.PROTOCOL_VERSION,
          'User-Agent': `PM2 Agent Node v${version}`,
          'x-opencensus-outgoing-request': '1'
        }, this.config.proxy)
        return this.transport.connect((err) => {
          if (err) {
            this.restartOnError(err)
            return resolve() // avoid reject if we retry
          }

          // Store config
          this.config.endpoint = endpoints.ws
          this.config.internalIp = meta.computeInternalIp()

          // Start sending status
          this.statusInterval = setInterval(this.sendStatus.bind(this), 1 * 1000) // each second
          this.listenForLogs()

          // Listening for endpoint update
          this.endpointUpdateInterval = setInterval(this.listenEndpointUpdate.bind(this), 5 * 60 * 1000) // each 5 min

          return resolve()
        })
      })
    })
  }

  /**
   * Restart agent because of an error
   */
  restartOnError (err) {
    if (this.isStopping) return

    debug(`Got an error on start pm2-agent-node: ${err.message}, retrying in 5sec...`)
    return setTimeout(() => {
      // Error already handled in start function
      this.start().catch(_ => {})
    }, 5 * 1000)
  }

  /**
   * Generate an unique ID
   */
  generateUniqueId () {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
    s[8] = s[13] = s[18] = s[23] = '-'
    return s.join('')
  }

  /**
   * Used to generate valid a process
   * @param {Object} process
   * @return {Object} process Valid process with default value
   */
  generateProcess (proc) {
    if (!proc.createdAt) proc.createdAt = new Date().getTime()
    return {
      pid: process.pid,
      name: this.config.appName,
      interpreter: proc.interpreter || 'node',
      restart_time: 0,
      created_at: proc.createdAt,
      exec_mode: 'fork_mode',
      watching: false,
      pm_uptime: proc.createdAt,
      status: 'online',
      pm_id: 0,
      unique_id: proc.unique_id,

      cpu: meta.getCpuUsage(),
      memory: meta.getMemoryUsage(),

      versioning: proc.versioning || null,

      node_env: process.env.NODE_ENV || null,

      axm_actions: proc.axm_actions || [],
      axm_monitor: proc.axm_monitor || {},
      axm_options: proc.axm_options || {},
      axm_dynamic: proc.dynamic || {}
    }
  }

  /**
   * Ping root.keymetrics.io, compare current endpoint, and reconnect agent if needed
   */
  listenEndpointUpdate () {
    debug(`Check if endpoint was updated`)
    this.checkCredentials(this.config, (err, endpoints) => {
      if (err) return debug(`Got an error on check credentials: ${err.message}`)
      if (endpoints.ws === this.config.endpoint) return debug(`Endpoint wasn't updated`)

      // Update transport endpoint
      this.config.endpoint = endpoints.ws
      this.transport.endpoint = endpoints.ws
      this.transport.disconnect()
      this.transport.connect((err) => {
        if (err) return debug(`Got an error on websocket connection while endpoint update: ${err.message}`)
        return debug(`Websocket endpoint updated!`)
      })
    })
  }

  /**
   * Check credentials with API
   * @param {Object} config Configuration
   * @param {String} config.publicKey
   * @param {String} config.secretKey
   * @param {String} config.appName
   * @param {Function} cb Invoked with <err, endpoints>
   */
  checkCredentials (config, cb) {
    http.open({
      url: cst.ROOT_URL + '/api/node/verifyPM2',
      method: 'POST',
      data: {
        public_id: config.publicKey,
        private_id: config.secretKey,
        data: meta(config.publicKey, config.serverName)
      },
      proxy: config.proxy,
      headers: {
        'User-Agent': `PM2 Agent Node v${version}`,
        'x-opencensus-outgoing-request': '1'
      }
    }, (err, data) => {
      if (err) return cb(err)
      if (data.disabled === true || data.pending === true) return cb(new Error('Interactor disabled.'))
      if (data.active === false) {
        this.stop()
        debug(`Stop agent, bucket is not active: ${data.msg}`)
        return cb(new Error('Interactor not active.'))
      }
      if (!data.endpoints) return cb(new Error(`Endpoints field not present (${JSON.stringify(data)}).`))
      return cb(null, data.endpoints)
    })
  }

  /**
   * Send status
   * @param {String} channel
   * @param {Object} payload
   */
  send (channel, payload) {
    if (payload.at === undefined) payload.at = Date.now()
    return this.transport.send({
      channel,
      payload: Object.assign(payload, {
        process: {
          pm_id: 0,
          name: this.config.appName,
          server: this.config.serverName,
          rev: null
        }
      })
    })
  }

  /**
   * Listen stdout and stderr to send logs
   */
  listenForLogs () {
    const send = this.send.bind(this, 'logs')
    let isTemporalyLogging = false // used for startLogging and stopLogging

    // Listen actions
    const reply = method => {
      this.transport.send({
        channel: 'trigger:pm2:result',
        payload: {
          ret: { err: null, data: `Log streaming ${isTemporalyLogging ? 'enabled' : 'disabled'}` },
          meta: {
            method_name: method,
            app_name: this.config.appName,
            machine_name: this.config.serverName,
            public_key: this.config.publicKey
          }
        }
      })
    }
    this.transport.on('trigger:pm2:action', (data) => {
      const method = data.method_name
      if (!['startLogging', 'stopLogging'].includes(method)) return // Don't listen that
      isTemporalyLogging = method === 'startLogging'
      debug(`${method} triggered`)
      return reply(method)
    })

    // Listen logs
    const self = this
    const originalStdOut = process.stdout.write
    process.stdout.write = function () {
      const res = originalStdOut.apply(this, arguments)
      // Don't send logs if not configured
      if (self.disableLogs) return res
      if (!self.sendLogs && isTemporalyLogging === false) return res
      if (self.config.logFilter && !self.config.logFilter.test(arguments[0])) return res
      send({
        at: new Date().getTime(),
        data: arguments[0]
      })
      return res
    }

    const originalStdErr = process.stderr.write
    process.stderr.write = function () {
      const res = originalStdErr.apply(this, arguments)
      // Don't send logs if not configured
      if (self.disableLogs) return res
      if (!self.sendLogs && isTemporalyLogging === false) return res
      if (self.config.logFilter && !self.config.logFilter.test(arguments[0])) return res
      send({
        at: new Date().getTime(),
        data: arguments[0]
      })
      return res
    }
  }

  /**
   * Send status
   */
  sendStatus () {
    return this.transport.send({
      channel: 'status',
      payload: {
        data: {
          process: [this.generateProcess(this.process)],
          server: meta.getServerMeta()
        },
        server_name: this.config.serverName,
        internal_ip: this.config.internalIp,
        rev_con: true
      }
    })
  }

  /**
   * Stop agent
   */
  stop () {
    debug('Stopping agent')
    this.isStopping = true
    this.transport.disconnect()
    clearInterval(this.statusInterval)
    clearInterval(this.endpointUpdateInterval)
  }
}
