import { fetchConfig } from "./shared";
export interface PublicToken {
    public_token: string;
    created_at?: string;
}
export interface CreateRequest {
    project_slug: string;
    environment_slug: string;
}
export interface CreateResponse {
    request_id: string;
    public_token: PublicToken;
    status_code: number;
}
export interface DeleteRequest {
    project_slug: string;
    environment_slug: string;
    public_token: string;
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
    public_tokens: PublicToken[];
    status_code: number;
}
export interface GetRequest {
    project_slug: string;
    environment_slug: string;
    public_token: string;
}
export interface GetResponse {
    request_id: string;
    public_token: PublicToken;
    status_code: number;
}
export declare class PublicTokens {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Create creates a new public token for an environment.
     * @param data {@link CreateRequest}
     * @returns {@link CreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: CreateRequest): Promise<CreateResponse>;
    /**
     * Get retrieves a public token for an environment.
     * @param params {@link GetRequest}
     * @returns {@link GetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: GetRequest): Promise<GetResponse>;
    /**
     * GetAll retrieves all the active public tokens defined for an environment.
     * @param params {@link GetAllRequest}
     * @returns {@link GetAllResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    getAll(params: GetAllRequest): Promise<GetAllResponse>;
    /**
     * Delete deletes a public token for an environment.
     * @param data {@link DeleteRequest}
     * @returns {@link DeleteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    delete(data: DeleteRequest): Promise<DeleteResponse>;
}
//# sourceMappingURL=publictokens.d.ts.map