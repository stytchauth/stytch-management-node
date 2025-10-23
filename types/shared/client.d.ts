import type { Dispatcher } from "undici";
export interface ClientConfig {
    workspace_key_id: string;
    workspace_key_secret: string;
    base_url?: string;
    timeout?: number;
    dispatcher?: Dispatcher;
}
export interface fetchConfig {
    baseURL: string;
    headers: Record<string, string>;
    timeout: number;
    dispatcher?: Dispatcher;
}
export declare class BaseClient {
    protected fetchConfig: fetchConfig;
    protected baseURL: string;
    constructor(config: ClientConfig);
}
//# sourceMappingURL=client.d.ts.map