import { fetchConfig } from "./shared";
export interface Project {
    project_slug: string;
    name: string;
    vertical?: "ALL" | "CONSUMER" | "B2B" | string;
    created_at?: string;
}
export interface CreateRequest {
    name: string;
    vertical?: "ALL" | "CONSUMER" | "B2B" | string;
    project_slug?: string;
}
export interface CreateResponse {
    request_id: string;
    project: Project;
    status_code: number;
}
export interface DeleteRequest {
    project_slug: string;
}
export interface DeleteResponse {
    request_id: string;
    status_code: number;
}
export interface GetAllResponse {
    request_id: string;
    projects: Project[];
    status_code: number;
}
export interface GetRequest {
    project_slug: string;
}
export interface GetResponse {
    request_id: string;
    project: Project;
    status_code: number;
}
export interface UpdateRequest {
    project_slug: string;
    name?: string;
}
export interface UpdateResponse {
    request_id: string;
    project: Project;
    status_code: number;
}
export declare class Projects {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Create creates a project, including both a live and test environment.
     * @param data {@link CreateRequest}
     * @returns {@link CreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: CreateRequest): Promise<CreateResponse>;
    /**
     * Get retrieves a project.
     * @param params {@link GetRequest}
     * @returns {@link GetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: GetRequest): Promise<GetResponse>;
    /**
     * GetAll retrieves all projects in a workspace.
     * @param params {@link GetAllRequest}
     * @returns {@link GetAllResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    getAll(): Promise<GetAllResponse>;
    /**
     * Update updates the project.
     * @param data {@link UpdateRequest}
     * @returns {@link UpdateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    update(data: UpdateRequest): Promise<UpdateResponse>;
    /**
     * Delete deletes a project and all of its environments.
     * @param data {@link DeleteRequest}
     * @returns {@link DeleteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    delete(data: DeleteRequest): Promise<DeleteResponse>;
}
//# sourceMappingURL=projects.d.ts.map