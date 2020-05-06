import { Transport, TransportConfig } from '../services/transport';
import { Action } from '../services/actions';
import { InternalMetric } from '../services/metrics';
import { EventEmitter2 } from 'eventemitter2';
declare class SerializedAction {
    action_name: string;
    action_type: string;
    opts: Object | null | undefined;
    arity: number;
}
export declare class ProcessMetadata {
    axm_actions: SerializedAction[];
    axm_monitor: Object;
    axm_options: Object;
    axm_dynamic?: Object;
    interpreter?: string;
    versionning?: Object;
}
export declare class WebsocketTransport extends EventEmitter2 implements Transport {
    private config;
    private agent;
    private process;
    private initiated;
    private logger;
    init(config: TransportConfig): Transport;
    setMetrics(metrics: InternalMetric[]): {};
    addAction(action: Action): void;
    setOptions(options: any): any;
    private getFormattedPayload;
    send(channel: string, payload: Object): 0 | -1;
    destroy(): void;
    removeListener(): any;
    removeAllListeners(): any;
    on(): any;
}
export {};
