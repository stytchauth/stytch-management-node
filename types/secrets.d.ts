import { fetchConfig } from "./shared";
export interface MaskedSecret {
    secret_id: string;
    last_four: string;
    created_at?: string;
    used_at?: string;
}
export interface Secret {
    secret_id: string;
    secret: string;
    created_at?: string;
}
export interface CreateRequest {
    project_slug: string;
    environment_slug: string;
}
export interface CreateResponse {
    request_id: string;
    secret: Secret;
    status_code: number;
}
export interface DeleteRequest {
    project_slug: string;
    environment_slug: string;
    secret_id: string;
}
export interface DeleteResponse {
    request_id: string;
    status_code: number;
}
export interface GetAllRequest {
    project_slug: string;
    environment_slug: string;
}
export interface GetAllResponse {
    request_id: string;
    secrets: MaskedSecret[];
    status_code: number;
}
export interface GetRequest {
    project_slug: string;
    environment_slug: string;
    secret_id: string;
}
export interface GetResponse {
    request_id: string;
    secret: MaskedSecret;
    status_code: number;
}
export declare class Secrets {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Create creates a secret for an environment. The response contains the full secret value, which will not
     * be exposed in future Get requests.
     * @param data {@link CreateRequest}
     * @returns {@link CreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: CreateRequest): Promise<CreateResponse>;
    /**
     * Get retrieves a secret for an environment.
     * @param params {@link GetRequest}
     * @returns {@link GetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: GetRequest): Promise<GetResponse>;
    /**
     * GetAll retrieves all secrets for an environment.
     * @param params {@link GetAllRequest}
     * @returns {@link GetAllResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    getAll(params: GetAllRequest): Promise<GetAllResponse>;
    /**
     * Delete deletes a secret for an environment.
     * @param data {@link DeleteRequest}
     * @returns {@link DeleteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    delete(data: DeleteRequest): Promise<DeleteResponse>;
}
//# sourceMappingURL=secrets.d.ts.map