import { fetchConfig } from "./shared";
export interface DatadogConfig {
    api_key: string;
    site?: "US" | "US3" | "US5" | "EU" | "AP1" | string;
}
export interface DatadogConfigMasked {
    api_key_last_four: string;
    site?: "US" | "US3" | "US5" | "EU" | "AP1" | string;
}
export interface DestinationConfig {
    datadog?: DatadogConfig;
    grafana_loki?: GrafanaLokiConfig;
}
export interface DestinationConfigMasked {
    datadog?: DatadogConfigMasked;
    grafana_loki?: GrafanaLokiConfigMasked;
}
export interface EventLogStreaming {
    destination_type?: "DATADOG" | "GRAFANA_LOKI" | string;
    destination_config?: DestinationConfig;
    streaming_status?: "ACTIVE" | "DISABLED" | "PENDING" | string;
}
export interface EventLogStreamingMasked {
    destination_type?: "DATADOG" | "GRAFANA_LOKI" | string;
    destination_config?: DestinationConfigMasked;
    streaming_status?: "ACTIVE" | "DISABLED" | "PENDING" | string;
}
export interface GrafanaLokiConfig {
    hostname: string;
    username: string;
    password: string;
}
export interface GrafanaLokiConfigMasked {
    hostname: string;
    username: string;
    password_last_four: string;
}
export interface CreateRequest {
    project_slug: string;
    environment_slug: string;
    destination_type?: "DATADOG" | "GRAFANA_LOKI" | string;
    destination_config?: DestinationConfig;
}
export interface CreateResponse {
    request_id: string;
    event_log_streaming_config: EventLogStreaming;
    status_code: number;
}
export interface DeleteRequest {
    project_slug: string;
    environment_slug: string;
    destination_type?: "DATADOG" | "GRAFANA_LOKI" | string;
}
export interface DeleteResponse {
    request_id: string;
    status_code: number;
}
export interface DisableRequest {
    project_slug: string;
    environment_slug: string;
    destination_type?: "DATADOG" | "GRAFANA_LOKI" | string;
}
export interface DisableResponse {
    request_id: string;
    status_code: number;
}
export interface EnableRequest {
    project_slug: string;
    environment_slug: string;
    destination_type?: "DATADOG" | "GRAFANA_LOKI" | string;
}
export interface EnableResponse {
    request_id: string;
    status_code: number;
}
export interface GetRequest {
    project_slug: string;
    environment_slug: string;
    destination_type?: "DATADOG" | "GRAFANA_LOKI" | string;
}
export interface GetResponse {
    request_id: string;
    /**
     * EventLogStreamingConfig is the event log streaming configuration, with sensitive values masked (e.g.,
     * APIKey, Password).
     */
    event_log_streaming_config: EventLogStreamingMasked;
    status_code: number;
}
export interface UpdateRequest {
    project_slug: string;
    environment_slug: string;
    destination_type?: "DATADOG" | "GRAFANA_LOKI" | string;
    destination_config?: DestinationConfig;
}
export interface UpdateResponse {
    request_id: string;
    event_log_streaming_config: EventLogStreaming;
    status_code: number;
}
export declare class EventLogStreaming {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Get retrieves an event log streaming config for an environment.
     * @param params {@link GetRequest}
     * @returns {@link GetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: GetRequest): Promise<GetResponse>;
    /**
     * Create creates an event log streaming config for an environment.
     * @param data {@link CreateRequest}
     * @returns {@link CreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: CreateRequest): Promise<CreateResponse>;
    /**
     * Update updates an event log streaming config for an environment.
     * @param data {@link UpdateRequest}
     * @returns {@link UpdateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    update(data: UpdateRequest): Promise<UpdateResponse>;
    /**
     * Delete deletes an event log streaming config for an environment.
     * @param data {@link DeleteRequest}
     * @returns {@link DeleteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    delete(data: DeleteRequest): Promise<DeleteResponse>;
    /**
     * Enable starts streaming event logs for an environment to a destination.
     * @param data {@link EnableRequest}
     * @returns {@link EnableResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    enable(data: EnableRequest): Promise<EnableResponse>;
    /**
     * Disable stops streaming event logs for an environment to a destination.
     * @param data {@link DisableRequest}
     * @returns {@link DisableResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    disable(data: DisableRequest): Promise<DisableResponse>;
}
//# sourceMappingURL=event_log_streaming.d.ts.map