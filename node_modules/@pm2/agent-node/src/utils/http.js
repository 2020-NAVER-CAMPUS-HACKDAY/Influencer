'use strict'

const url = require('url')
const ProxyAgent = require('proxy-agent')

/**
 * HTTP wrapper
 */
module.exports = class HTTPClient {
  /**
   * Return native module (HTTP/HTTPS)
   * @param {String} url
   */
  static getModule (url) {
    return url.indexOf('https://') === 0 ? require('https') : require('http')
  }
  /**
   * Send an HTTP request and return data or error if status > 200
   * @param {Object} opts
   * @param {String} opts.url
   * @param {String} opts.method
   * @param {Object} [opts.data]
   * @param {Object} [opts.headers]
   * @param {Function} cb invoked with <err, body>
   */
  static open (opts, cb) {
    const http = this.getModule(opts.url)
    const parsedUrl = url.parse(opts.url)
    let data = null
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.path,
      port: parsedUrl.port,
      method: opts.method,
      agent: opts.proxy !== undefined ? new ProxyAgent(opts.proxy) : undefined,
      headers: opts.headers
    }
    if (opts.data) {
      data = JSON.stringify(opts.data)
      options.headers['Content-Type'] = 'application/json'
      options.headers['Content-Length'] = data.length
    }
    const req = http.request(options, (res) => {
      let body = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => {
        body += chunk.toString()
      })
      res.on('end', () => {
        let json = null
        try {
          json = JSON.parse(body)
        } catch (e) {
          return cb(e)
        }
        return cb(null, json)
      })
    })
    req.on('error', cb)
    if (data) {
      req.write(data)
    }
    req.end()
  }
}
