'use strict'

const debug = require('debug')('interactor:watchdog')
const child = require('child_process')
const path = require('path')

process.env.PM2_AGENT_ONLINE = true

module.exports = class WatchDog {
  static start (p) {
    this.ipm2 = p.conf.ipm2
    this.relaunching = false
    this.autoDumpTime = 5 * 60 * 1000

    /**
     * Handle PM2 connection state changes
     */
    this.ipm2.on('ready', _ => {
      debug('Connected to PM2')
      this.relaunching = false
      this.autoDump()
    })

    debug('Launching')

    this.ipm2.on('reconnecting', _ => {
      debug('PM2 is disconnected - Relaunching PM2')

      if (this.relaunching === true) return debug('Already relaunching PM2')
      this.relaunching = true

      if (this.dump_interval) {
        clearInterval(this.dump_interval)
      }

      return this.resurrect()
    })
  }

  static stop() {
    clearInterval(this.dump_interval)
  }

  static resurrect () {
    debug(`Trying to launch PM2: ${path.resolve(__dirname, '../../../../bin/pm2')}`)
    child.exec(`node ${path.resolve(__dirname, '../../../../bin/pm2')} resurrect`, _ => {
      setTimeout(_ => {
        this.relaunching = false
      }, 2500)
    })
  }

  static autoDump () {
    this.dump_interval = setInterval(_ => {
      if (this.relaunching === true) return

      this.ipm2.pm2Interface.dump(function (err) {
        return err ? debug('Error when dumping', err) : debug('PM2 process list dumped')
      })
    }, this.autoDumpTime)
  }
}
