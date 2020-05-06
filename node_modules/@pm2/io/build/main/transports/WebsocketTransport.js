"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("debug");
const eventemitter2_1 = require("eventemitter2");
class SerializedAction {
}
class ProcessMetadata {
}
exports.ProcessMetadata = ProcessMetadata;
class WebsocketTransport extends eventemitter2_1.EventEmitter2 {
    constructor() {
        super(...arguments);
        this.initiated = false;
        this.logger = debug_1.default('axm:transport:websocket');
    }
    init(config) {
        if (this.initiated === true) {
            console.error(`Trying to re-init the transport, please avoid`);
            return this;
        }
        this.initiated = true;
        const AgentNode = require('@pm2/agent-node');
        this.logger('Init new transport service');
        this.config = config;
        this.process = {
            axm_actions: [],
            axm_options: {},
            axm_monitor: {}
        };
        this.agent = new AgentNode(this.config, this.process);
        if (this.agent instanceof Error) {
            throw this.agent;
        }
        this.agent.sendLogs = config.sendLogs || false;
        this.agent.start();
        this.agent.transport.on('**', (data) => {
            this.logger(`Received reverse message from websocket transport`);
            this.emit('data', data);
        });
        this.logger('Agent launched');
        return this;
    }
    setMetrics(metrics) {
        return this.process.axm_monitor = metrics.reduce((object, metric) => {
            if (typeof metric.name !== 'string')
                return object;
            object[metric.name] = {
                historic: metric.historic,
                unit: metric.unit,
                type: metric.id,
                value: metric.value
            };
            return object;
        }, {});
    }
    addAction(action) {
        this.logger(`Add action: ${action.name}:${action.type}`);
        const serializedAction = {
            action_name: action.name,
            action_type: action.type,
            arity: action.arity,
            opts: action.opts
        };
        this.process.axm_actions.push(serializedAction);
    }
    setOptions(options) {
        this.logger(`Set options: [${Object.keys(options).join(',')}]`);
        return this.process.axm_options = Object.assign(this.process.axm_options, options);
    }
    getFormattedPayload(channel, payload) {
        switch (channel) {
            case 'axm:reply':
                return { data: payload };
            case 'process:exception':
                return { data: payload };
            case 'human:event': {
                const name = payload.__name;
                payload.__name = undefined;
                return { name, data: payload };
            }
        }
        return payload;
    }
    send(channel, payload) {
        return this.agent.send(channel, this.getFormattedPayload(channel, payload)) ? 0 : -1;
    }
    destroy() {
        this.agent.transport.disconnect();
        this.logger('destroy');
    }
    removeListener() {
        return this.agent.transport.removeListener.apply(this, arguments);
    }
    removeAllListeners() {
        return this.agent.transport.removeAllListeners.apply(this, arguments);
    }
    on() {
        return this.agent.transport.on.apply(this, arguments);
    }
}
exports.WebsocketTransport = WebsocketTransport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2Vic29ja2V0VHJhbnNwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3RyYW5zcG9ydHMvV2Vic29ja2V0VHJhbnNwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsaUNBQXlCO0FBR3pCLGlEQUE2QztBQUU3QyxNQUFNLGdCQUFnQjtDQUtyQjtBQUVELE1BQWEsZUFBZTtDQU8zQjtBQVBELDBDQU9DO0FBRUQsTUFBYSxrQkFBbUIsU0FBUSw2QkFBYTtJQUFyRDs7UUFLVSxjQUFTLEdBQVksS0FBSyxDQUFBO1FBQzFCLFdBQU0sR0FBYSxlQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQTtJQStGN0QsQ0FBQztJQTdGQyxJQUFJLENBQUUsTUFBdUI7UUFDM0IsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTtZQUMzQixPQUFPLENBQUMsS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUE7WUFDOUQsT0FBTyxJQUFJLENBQUE7U0FDWjtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO1FBQ3JCLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ2IsV0FBVyxFQUFFLEVBQUU7WUFDZixXQUFXLEVBQUUsRUFBRTtZQUNmLFdBQVcsRUFBRSxFQUFFO1NBQ2hCLENBQUE7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3JELElBQUksSUFBSSxDQUFDLEtBQUssWUFBWSxLQUFLLEVBQUU7WUFDL0IsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFBO1NBQ2pCO1FBQ0Qs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