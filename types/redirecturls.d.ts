import { fetchConfig } from "./shared";
export interface RedirectURL {
    url: string;
    valid_types: URLType[];
}
export interface URLType {
    is_default: boolean;
    type?: "LOGIN" | "INVITE" | "SIGNUP" | "RESET_PASSWORD" | "DISCOVERY" | string;
}
export interface CreateRequest {
    project_slug: string;
    environment_slug: string;
    url: string;
    valid_types?: URLType[];
    /**
     * DoNotPromoteDefaults is used to suppress the automatic "promotion" of a RedirectURL to the default if no
     * other RedirectURL exists for the given type. This is primarily intended for use with
     * stytchauth/terraform-provider-stytch to allow Terraform provisioning to be idempotent. For a Create
     * request, the default behavior is to promote the RedirectURL to the default if no other RedirectURL
     * exists for the given type, even if `IsDefault` was set to false.  WARNING: If this is set to true, it is
     * possible to have valid RedirectURLs for a given type but *no* default RedirectURL for that type. If no
     * default exists for a given type, using an API endpoint that uses redirect URLs (such as sending a magic
     * link), you will need to explicitly specify which redirect URL should be used.
     */
    do_not_promote_defaults?: boolean;
}
export interface CreateResponse {
    request_id: string;
    redirect_url: RedirectURL;
    status_code: number;
}
export interface DeleteRequest {
    project_slug: string;
    environment_slug: string;
    url: string;
    /**
     * DoNotPromoteDefaults is used to suppress the automatic "promotion" of a RedirectURL to the default if no
     * other RedirectURL exists for the given type. This is primarily intended for use with
     * stytchauth/terraform-provider-stytch to allow Terraform provisioning to be idempotent. For a Create
     * request, the default behavior is to promote the RedirectURL to the default if no other RedirectURL
     * exists for the given type, even if `IsDefault` was set to false.  WARNING: If this is set to true, it is
     * possible to have valid RedirectURLs for a given type but *no* default RedirectURL for that type. If no
     * default exists for a given type, using an API endpoint that uses redirect URLs (such as sending a magic
     * link), you will need to explicitly specify which redirect URL should be used.
     */
    do_not_promote_defaults?: boolean;
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
    redirect_urls: RedirectURL[];
    status_code: number;
}
export interface GetRequest {
    project_slug: string;
    environment_slug: string;
    url: string;
}
export interface GetResponse {
    request_id: string;
    redirect_url: RedirectURL;
    status_code: number;
}
export interface UpdateRequest {
    project_slug: string;
    environment_slug: string;
    url: string;
    valid_types?: URLType[];
    /**
     * DoNotPromoteDefaults is used to suppress the automatic "promotion" of a RedirectURL to the default if no
     * other RedirectURL exists for the given type. This is primarily intended for use with
     * stytchauth/terraform-provider-stytch to allow Terraform provisioning to be idempotent. For a Create
     * request, the default behavior is to promote the RedirectURL to the default if no other RedirectURL
     * exists for the given type, even if `IsDefault` was set to false.  WARNING: If this is set to true, it is
     * possible to have valid RedirectURLs for a given type but *no* default RedirectURL for that type. If no
     * default exists for a given type, using an API endpoint that uses redirect URLs (such as sending a magic
     * link), you will need to explicitly specify which redirect URL should be used.
     */
    do_not_promote_defaults?: boolean;
}
export interface UpdateResponse {
    request_id: string;
    redirect_url: RedirectURL;
    status_code: number;
}
export declare class RedirectURLs {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Create creates a redirect URL for an environment.
     * @param data {@link CreateRequest}
     * @returns {@link CreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: CreateRequest): Promise<CreateResponse>;
    /**
     * Get retrieves a redirect URL for an environment.
     * @param params {@link GetRequest}
     * @returns {@link GetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: GetRequest): Promise<GetResponse>;
    /**
     * GetAll retrieves all redirect URLs for an environment.
     * @param params {@link GetAllRequest}
     * @returns {@link GetAllResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    getAll(params: GetAllRequest): Promise<GetAllResponse>;
    /**
     * Update updates the valid types for a redirect URL for an environment.
     * @param data {@link UpdateRequest}
     * @returns {@link UpdateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    update(data: UpdateRequest): Promise<UpdateResponse>;
    /**
     * Delete deletes a redirect URL for an environment.
     * @param data {@link DeleteRequest}
     * @returns {@link DeleteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    delete(data: DeleteRequest): Promise<DeleteResponse>;
}
//# sourceMappingURL=redirecturls.d.ts.map