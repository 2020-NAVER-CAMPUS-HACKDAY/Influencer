'use strict'

const os = require('os')
const pkg = require('../../package.json')
const cst = require('../../constants')

module.exports = (publicKey, server) => {
  return {
    MACHINE_NAME: server,
    PUBLIC_KEY: publicKey,
    PM2_VERSION: cst.PM2_VERSION,
    MEMORY: os.totalmem() / 1000 / 1000,
    HOSTNAME: os.hostname(),
    CPUS: os.cpus()
  }
}

module.exports.computeInternalIp = _ => {
  const interfaceType = {
    v4: {
      default: '127.0.0.1',
      family: 'IPv4'
    },
    v6: {
      default: '::1',
      family: 'IPv6'
    }
  }

  const retrieveAddress = (type) => {
    let interfce = interfaceType[type]
    let ret = interfce.default
    let interfaces = os.networkInterfaces()

    Object.keys(interfaces).forEach(function (el) {
      interfaces[el].forEach(function (el2) {
        if (!el2.internal && el2.family === interfce.family) {
          ret = el2.address
        }
      })
    })
    return ret
  }

  return retrieveAddress('v4')
}

module.exports.getServerMeta = _ => {
  const cpuMeta = {
    number: os.cpus().length,
    info: os.cpus().length > 0 ? os.cpus()[0].model : 'no-data'
  }
  const username = process.env.SUDO_USER || process.env.C9_USER || process.env.LOGNAME ||
      process.env.USER || process.env.LNAME || process.env.USERNAME

  return {
    loadavg: os.loadavg(),
    total_mem: os.totalmem(),
    free_mem: os.freemem(),
    cpu: cpuMeta,
    username: username,
    hostname: os.hostname(),
    uptime: os.uptime(),
    type: os.type(),
    platform: os.platform(),
    arch: os.arch(),
    interaction: true,
    pm2_version: cst.PM2_VERSION,
    pm2_agent_version: pkg.version,
    node_version: process.version
  }
}

let lastCpuUsage = {}
const getCpuUsage = _ => {
  let usage = null
  if (lastCpuUsage && lastCpuUsage._start) {
    usage = Object.assign({}, process.cpuUsage(lastCpuUsage._start.cpuUsage))
    usage.time = Date.now() - lastCpuUsage._start.time
  } else {
    usage = Object.assign({}, process.cpuUsage())
    usage.time = process.uptime() * 1000 // s to ms
  }
  usage.percent = (usage.system + usage.user) / (usage.time * 10)
  Object.defineProperty(usage, '_start', {
    value: {
      cpuUsage: process.cpuUsage(),
      time: Date.now()
    }
  })
  lastCpuUsage = usage
  return Math.floor(usage.percent)
}
module.exports.getCpuUsage = getCpuUsage

module.exports.getMemoryUsage = _ => {
  return Math.floor(process.memoryUsage().rss)
}
