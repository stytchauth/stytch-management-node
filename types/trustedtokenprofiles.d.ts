import { fetchConfig } from "./shared";
export interface PEMFile {
    pem_file_id: string;
    public_key: string;
}
export interface TrustedTokenProfile {
    profile_id: string;
    name: string;
    audience: string;
    issuer: string;
    pem_files: PEMFile[];
    can_jit_provision: boolean;
    jwks_url?: string;
    attribute_mapping?: Record<string, any>;
    public_key_type?: "JWK" | "PEM" | string;
}
export interface CreatePEMFileRequest {
    project_slug: string;
    environment_slug: string;
    profile_id: string;
    public_key: string;
}
export interface CreatePEMFileResponse {
    request_id: string;
    pem_file: PEMFile;
    status_code: number;
}
export interface CreateRequest {
    project_slug: string;
    environment_slug: string;
    name: string;
    audience: string;
    issuer: string;
    pem_files: string[];
    can_jit_provision: boolean;
    jwks_url?: string;
    attribute_mapping?: Record<string, any>;
    public_key_type?: "JWK" | "PEM" | string;
}
export interface CreateResponse {
    request_id: string;
    profile: TrustedTokenProfile;
    status_code: number;
}
export interface DeletePEMFileRequest {
    project_slug: string;
    environment_slug: string;
    profile_id: string;
    pem_file_id: string;
}
export interface DeletePEMFileResponse {
    request_id: string;
    status_code: number;
}
export interface DeleteRequest {
    project_slug: string;
    environment_slug: string;
    profile_id: string;
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
    profiles: TrustedTokenProfile[];
    status_code: number;
}
export interface GetPEMFileRequest {
    project_slug: string;
    environment_slug: string;
    profile_id: string;
    pem_file_id: string;
}
export interface GetPEMFileResponse {
    request_id: string;
    pem_file: PEMFile;
    status_code: number;
}
export interface GetRequest {
    project_slug: string;
    environment_slug: string;
    profile_id: string;
}
export interface GetResponse {
    request_id: string;
    profile: TrustedTokenProfile;
    status_code: number;
}
export interface UpdateRequest {
    project_slug: string;
    environment_slug: string;
    profile_id: string;
    name?: string;
    audience?: string;
    issuer?: string;
    jwks_url?: string;
    attribute_mapping?: Record<string, any>;
    can_jit_provision?: boolean;
}
export interface UpdateResponse {
    request_id: string;
    profile: TrustedTokenProfile;
    status_code: number;
}
export declare class TrustedTokenProfiles {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Create creates a trusted token profile for an environment.
     * @param data {@link CreateRequest}
     * @returns {@link CreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: CreateRequest): Promise<CreateResponse>;
    /**
     * Get retrieves the trusted token profile for an environment.
     * @param params {@link GetRequest}
     * @returns {@link GetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: GetRequest): Promise<GetResponse>;
    /**
     * GetAll retrieves all the trusted token profiles for an environment.
     * @param params {@link GetAllRequest}
     * @returns {@link GetAllResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    getAll(params: GetAllRequest): Promise<GetAllResponse>;
    /**
     * Update updates a trusted token profile for an environment.
     * @param data {@link UpdateRequest}
     * @returns {@link UpdateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    update(data: UpdateRequest): Promise<UpdateResponse>;
    /**
     * Delete deletes a trusted token profile for an environment.
     * @param data {@link DeleteRequest}
     * @returns {@link DeleteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    delete(data: DeleteRequest): Promise<DeleteResponse>;
    /**
     * CreatePEM creates a PEM file for a trusted token profile for an environment.
     * @param data {@link CreatePEMFileRequest}
     * @returns {@link CreatePEMFileResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    createPEMFile(data: CreatePEMFileRequest): Promise<CreatePEMFileResponse>;
    /**
     * DeletePEM deletes a PEM file for a trusted token profile for an environment.
     * @param data {@link DeletePEMFileRequest}
     * @returns {@link DeletePEMFileResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    deletePEMFile(data: DeletePEMFileRequest): Promise<DeletePEMFileResponse>;
    /**
     * GetPEM retrieves a PEM file for a trusted token profile for an environment.
     * @param params {@link GetPEMFileRequest}
     * @returns {@link GetPEMFileResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    getPEMFile(params: GetPEMFileRequest): Promise<GetPEMFileResponse>;
}
//# sourceMappingURL=trustedtokenprofiles.d.ts.map