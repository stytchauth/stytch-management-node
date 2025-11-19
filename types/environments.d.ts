import { fetchConfig } from "./shared";
export interface Environment {
    environment_slug: string;
    project_slug: string;
    name: string;
    oauth_callback_id: string;
    cross_org_passwords_enabled: boolean;
    user_impersonation_enabled: boolean;
    zero_downtime_session_migration_url: string;
    /**
     * Indicates whether users in the environment who get locked out should automatically get an unlock email
     * magic link.
     */
    user_lock_self_serve_enabled: boolean;
    /**
     * UserLockThreshold represents the number of failed authenticate attempts that will cause a user in the
     * environment to be locked. Defaults to 10.
     */
    user_lock_threshold: number;
    /**
     * Represents the time in seconds that the user in the environment remains locked once the lock is set.
     * Defaults to 1 hour (3600 seconds).
     */
    user_lock_ttl: number;
    idp_authorization_url: string;
    /**
     * IDPDynamicClientRegistrationEnabled indicates whether the project has opted in to Dynamic Client
     * Registration (DCR) for Connected Apps.
     */
    idp_dynamic_client_registration_enabled: boolean;
    /**
     * IDPDynamicClientRegistrationAccessTokenTemplateContent is the access token template to use for clients
     * created through Dynamic Client Registration (DCR).
     */
    idp_dynamic_client_registration_access_token_template_content: string;
    type?: "LIVE" | "TEST" | string;
    created_at?: string;
}
export interface Metrics {
    user_count: number;
    /**
     * OrganizationCount is the number of active organizations in the environment (only relevant for B2B
     * projects).
     */
    organization_count: number;
    member_count: number;
    m2m_client_count: number;
}
export interface CreateRequest {
    project_slug: string;
    name: string;
    type?: "LIVE" | "TEST" | string;
    environment_slug?: string;
    cross_org_passwords_enabled?: boolean;
    user_impersonation_enabled?: boolean;
    zero_downtime_session_migration_url?: string;
    /**
     * Indicates whether users in the environment who get locked out should automatically get an unlock email
     * magic link.
     */
    user_lock_self_serve_enabled?: boolean;
    /**
     * UserLockThreshold represents the number of failed authenticate attempts that will cause a user in the
     * environment to be locked. Defaults to 10.
     */
    user_lock_threshold?: number;
    /**
     * Represents the time in seconds that the user in the environment remains locked once the lock is set.
     * Defaults to 1 hour (3600 seconds).
     */
    user_lock_ttl?: number;
    idp_authorization_url?: string;
    /**
     * IDPDynamicClientRegistrationEnabled indicates whether the project has opted in to Dynamic Client
     * Registration (DCR) for Connected Apps.
     */
    idp_dynamic_client_registration_enabled?: boolean;
    /**
     * IDPDynamicClientRegistrationAccessTokenTemplateContent is the access token template to use for clients
     * created through Dynamic Client Registration (DCR).
     */
    idp_dynamic_client_registration_access_token_template_content?: string;
}
export interface CreateResponse {
    request_id: string;
    environment: Environment;
    status_code: number;
}
export interface DeleteRequest {
    project_slug: string;
    environment_slug: string;
}
export interface DeleteResponse {
    request_id: string;
    status_code: number;
}
export interface GetAllRequest {
    project_slug: string;
}
export interface GetAllResponse {
    request_id: string;
    environments: Environment[];
    status_code: number;
}
export interface GetMetricsRequest {
    project_slug: string;
    environment_slug: string;
}
export interface GetMetricsResponse {
    request_id: string;
    metrics: Metrics;
    status_code: number;
}
export interface GetRequest {
    project_slug: string;
    environment_slug: string;
}
export interface GetResponse {
    request_id: string;
    environment: Environment;
    status_code: number;
}
export interface UpdateRequest {
    project_slug: string;
    environment_slug: string;
    name?: string;
    cross_org_passwords_enabled?: boolean;
    user_impersonation_enabled?: boolean;
    zero_downtime_session_migration_url?: string;
    /**
     * Indicates whether users in the environment who get locked out should automatically get an unlock email
     * magic link.
     */
    user_lock_self_serve_enabled?: boolean;
    /**
     * UserLockThreshold represents the number of failed authenticate attempts that will cause a user in the
     * environment to be locked. Defaults to 10.
     */
    user_lock_threshold?: number;
    /**
     * Represents the time in seconds that the user in the environment remains locked once the lock is set.
     * Defaults to 1 hour (3600 seconds).
     */
    user_lock_ttl?: number;
    idp_authorization_url?: string;
    /**
     * IDPDynamicClientRegistrationEnabled indicates whether the project has opted in to Dynamic Client
     * Registration (DCR) for Connected Apps.
     */
    idp_dynamic_client_registration_enabled?: boolean;
    /**
     * IDPDynamicClientRegistrationAccessTokenTemplateContent is the access token template to use for clients
     * created through Dynamic Client Registration (DCR).
     */
    idp_dynamic_client_registration_access_token_template_content?: string;
}
export interface UpdateResponse {
    request_id: string;
    environment: Environment;
    status_code: number;
}
export declare class Environments {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Creates a new environment in a project.
     * @param data {@link CreateRequest}
     * @returns {@link CreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: CreateRequest): Promise<CreateResponse>;
    /**
     * Retrieves an environment.
     * @param params {@link GetRequest}
     * @returns {@link GetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: GetRequest): Promise<GetResponse>;
    /**
     * Retrieves all environments in a project.
     * @param params {@link GetAllRequest}
     * @returns {@link GetAllResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    getAll(params: GetAllRequest): Promise<GetAllResponse>;
    /**
     * Updates the environment.
     * @param data {@link UpdateRequest}
     * @returns {@link UpdateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    update(data: UpdateRequest): Promise<UpdateResponse>;
    /**
     * Deletes an environment.
     * @param data {@link DeleteRequest}
     * @returns {@link DeleteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    delete(data: DeleteRequest): Promise<DeleteResponse>;
    /**
     * Retrieves metrics for an environment.
     * @param params {@link GetMetricsRequest}
     * @returns {@link GetMetricsResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    getMetrics(params: GetMetricsRequest): Promise<GetMetricsResponse>;
}
//# sourceMappingURL=environments.d.ts.map