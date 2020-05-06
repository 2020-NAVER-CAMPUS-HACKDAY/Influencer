'use strict'

/**
 * Convert value to boolean but false if undefined
 * @param {String} value
 * @param {String} fallback default value
 * @return {Boolean}
 */
const useIfDefined = (value, fallback) => {
  if (typeof value === 'undefined') {
    return fallback
  } else {
    return value === 'true'
  }
}

/**
 * Configuration for transporters
 * Configuration by transporter :
 * @param {Integer} enabled
 * @param {Object|String} endpoints sended as first arg with connect() method
 */
module.exports = {
  transporters: {
    axon: {
      enabled: false, // useIfDefined(process.env.AGENT_TRANSPORT_AXON, false),
      endpoints: {
        push: process.env.AGENT_PUSH_ENDPOINT || 'push',
        pull: process.env.AGENT_REVERSE_ENDPOINT || 'reverse'
      }
    },
    websocket: {
      enabled: true, // useIfDefined(process.env.AGENT_TRANSPORT_WEBSOCKET, true),
      endpoints: process.env.AGENT_WEBSOCKET_ENDPOINT || 'ws'
    }
  }
}
