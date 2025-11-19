import { fetchConfig } from "./shared";
export interface JWTTemplate {
    template_content: string;
    custom_audience: string;
    jwt_template_type?: "SESSION" | "M2M" | string;
}
export interface GetRequest {
    project_slug: string;
    environment_slug: string;
    jwt_template_type?: "SESSION" | "M2M" | string;
}
export interface GetResponse {
    request_id: string;
    jwt_template: JWTTemplate;
    status_code: number;
}
export interface SetRequest {
    project_slug: string;
    environment_slug: string;
    template_content: string;
    custom_audience: string;
    jwt_template_type?: "SESSION" | "M2M" | string;
}
export interface SetResponse {
    request_id: string;
    jwt_template: JWTTemplate;
    status_code: number;
}
export declare class JWTTemplates {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Get retrieves a JWT template for a project
     * @param params {@link GetRequest}
     * @returns {@link GetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: GetRequest): Promise<GetResponse>;
    /**
     * Set updates a specific JWT template for a project
     * @param data {@link SetRequest}
     * @returns {@link SetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    set(data: SetRequest): Promise<SetResponse>;
}
//# sourceMappingURL=jwttemplates.d.ts.map