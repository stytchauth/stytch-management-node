import { fetchConfig } from "./shared";
export interface DefaultRole {
    permissions: Permission[];
}
export interface Permission {
    resource_id: string;
    actions: string[];
}
export interface Policy {
    /**
     * StytchResources consists of resources created by Stytch that always exist. This field will be returned
     * in relevant Policy objects but can never be overridden or deleted.
     */
    stytch_resources: Resource[];
    /**
     * The following fields are valid for both B2B and Consumer projects: CustomRoles are additional roles that
     * exist within the environment beyond the stytch_member, stytch_admin, or stytch_user roles.
     */
    custom_roles: Role[];
    /**
     * CustomResources are resources that exist within the environment beyond those defined within the
     * stytch_resources.
     */
    custom_resources: Resource[];
    custom_scopes: Scope[];
    /**
     * The following fields are valid for B2B projects only: StytchMember is the default role given to members
     * within the environment. Only permissions are returned; role_id and description are managed by Stytch.
     */
    stytch_member?: DefaultRole;
    /**
     * StytchAdmin is the role assigned to admins within an organization. Only permissions are returned;
     * role_id and description are managed by Stytch.
     */
    stytch_admin?: DefaultRole;
    /**
     * The following field is valid for Consumer projects only: StytchUser is the default role given to users
     * within the environment. Only permissions are returned; role_id and description are managed by Stytch.
     */
    stytch_user?: DefaultRole;
}
export interface Resource {
    resource_id: string;
    description: string;
    available_actions: string[];
}
export interface Role {
    role_id: string;
    description: string;
    permissions: Permission[];
}
export interface Scope {
    scope: string;
    description: string;
    permissions: Permission[];
}
export interface GetRequest {
    project_slug: string;
    environment_slug: string;
}
export interface GetResponse {
    request_id: string;
    policy: Policy;
    status_code: number;
}
export interface SetRequest {
    project_slug: string;
    environment_slug: string;
    /**
     * The following fields are valid for B2B projects only: StytchMember is the default role given to members
     * within the environment. Only permissions are returned; role_id and description are managed by Stytch.
     */
    stytch_member?: DefaultRole;
    /**
     * StytchAdmin is the role assigned to admins within an organization. Only permissions are returned;
     * role_id and description are managed by Stytch.
     */
    stytch_admin?: DefaultRole;
    /**
     * The following field is valid for Consumer projects only: StytchUser is the default role given to users
     * within the environment. Only permissions are returned; role_id and description are managed by Stytch.
     */
    stytch_user?: DefaultRole;
    /**
     * The following fields are valid for both B2B and Consumer projects: CustomRoles are additional roles that
     * exist within the environment beyond the stytch_member, stytch_admin, or stytch_user roles.
     */
    custom_roles?: Role[];
    /**
     * CustomResources are resources that exist within the environment beyond those defined within the
     * stytch_resources.
     */
    custom_resources?: Resource[];
    custom_scopes?: Scope[];
}
export interface SetResponse {
    request_id: string;
    policy: Policy;
    status_code: number;
}
export declare class RBACPolicy {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Get retrieves the RBAC policy for an environment.
     * @param params {@link GetRequest}
     * @returns {@link GetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: GetRequest): Promise<GetResponse>;
    /**
     * Set updates the RBAC policy for an environment.
     * @param data {@link SetRequest}
     * @returns {@link SetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    set(data: SetRequest): Promise<SetResponse>;
}
//# sourceMappingURL=rbacpolicy.d.ts.map