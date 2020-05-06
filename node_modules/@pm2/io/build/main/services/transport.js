"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IPCTransport_1 = require("../transports/IPCTransport");
const WebsocketTransport_1 = require("../transports/WebsocketTransport");
class TransportConfig {
}
exports.TransportConfig = TransportConfig;
function createTransport(name, config) {
    switch (name) {
        case 'ipc': {
            const transport = new IPCTransport_1.IPCTransport();
            transport.init(config);
            return transport;
        }
        case 'websocket': {
            const transport = new WebsocketTransport_1.WebsocketTransport();
            transport.init(config);
            return transport;
        }
    }
    console.error(`Failed to find transport implementation: ${name}`);
    return process.exit(1);
}
exports.createTransport = createTransport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL3RyYW5zcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDZEQUF5RDtBQUN6RCx5RUFBcUU7QUFHckUsTUFBYSxlQUFlO0NBMEMzQjtBQTFDRCwwQ0EwQ0M7QUFnQ0QsU0FBZ0IsZUFBZSxDQUFFLElBQVksRUFBRSxNQUF1QjtJQUNwRSxRQUFRLElBQUksRUFBRTtRQUNaLEtBQUssS0FBSyxDQUFDLENBQUM7WUFDVixNQUFNLFNBQVMsR0FBRyxJQUFJLDJCQUFZLEVBQUUsQ0FBQTtZQUNwQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3RCLE9BQU8sU0FBUyxDQUFBO1NBQ2pCO1FBQ0QsS0FBSyxXQUFXLENBQUMsQ0FBQztZQUNoQixNQUFNLFNBQVMsR0FBRyxJQUFJLHVDQUFrQixFQUFFLENBQUE7WUFDMUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN0QixPQUFPLFNBQVMsQ0FBQTtTQUNqQjtLQUNGO0lBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyw0Q0FBNEMsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUNqRSxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDeEIsQ0FBQztBQWZELDBDQWVDIn0=