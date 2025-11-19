import { fetchConfig } from "./shared";
export interface PasswordStrengthConfig {
    /**
     * CheckBreachOnCreation is a flag to check whether to use the HaveIBeenPwned database to detect password
     * breaches when a user first creates their password.
     */
    check_breach_on_creation: boolean;
    /**
     * CheckBreachOnAuthentication denotes whether to use the HaveIBeenPwned database to detect password
     * breaches when a user authenticates.
     */
    check_breach_on_authentication: boolean;
    /**
     * ValidateOnAuthentication notes whether to require a password reset on authentication if a user's current
     * password no longer meets the project's current policy requirements.
     */
    validate_on_authentication: boolean;
    validation_policy?: "ValidationPolicyZXCVBN" | "ValidationPolicyLUDS" | string;
    /**
     * LudsMinPasswordLength is the minimum number of characters in a password if using a LUDS
     * validation_policy. This field is nil when using the ZXCVBN validation_policy.
     */
    luds_min_password_length?: number;
    /**
     * LudsMinPasswordComplexity is the minimum number of "character types" in a password (Lowercase,
     * Uppercase, Digits, Symbols) when using a LUDS validation_policy. This field is nil when using the ZXCVBN
     * validation_policy.
     */
    luds_min_password_complexity?: number;
}
export interface GetRequest {
    project_slug: string;
    environment_slug: string;
}
export interface GetResponse {
    request_id: string;
    password_strength_config: PasswordStrengthConfig;
    status_code: number;
}
export interface SetRequest {
    project_slug: string;
    environment_slug: string;
    /**
     * CheckBreachOnCreation is a flag to check whether to use the HaveIBeenPwned database to detect password
     * breaches when a user first creates their password.
     */
    check_breach_on_creation: boolean;
    /**
     * CheckBreachOnAuthentication denotes whether to use the HaveIBeenPwned database to detect password
     * breaches when a user authenticates.
     */
    check_breach_on_authentication: boolean;
    /**
     * ValidateOnAuthentication notes whether to require a password reset on authentication if a user's current
     * password no longer meets the project's current policy requirements.
     */
    validate_on_authentication: boolean;
    validation_policy?: "ValidationPolicyZXCVBN" | "ValidationPolicyLUDS" | string;
    /**
     * LudsMinPasswordLength is the minimum number of characters in a password if using a LUDS
     * validation_policy. This field is nil when using the ZXCVBN validation_policy.
     */
    luds_min_password_length?: number;
    /**
     * LudsMinPasswordComplexity is the minimum number of "character types" in a password (Lowercase,
     * Uppercase, Digits, Symbols) when using a LUDS validation_policy. This field is nil when using the ZXCVBN
     * validation_policy.
     */
    luds_min_password_complexity?: number;
}
export interface SetResponse {
    request_id: string;
    password_strength_config: PasswordStrengthConfig;
    status_code: number;
}
export declare class PasswordStrengthConfig {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Get retrieves the password strength configuration for an environment.
     * @param params {@link GetRequest}
     * @returns {@link GetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: GetRequest): Promise<GetResponse>;
    /**
     * Set updates the password strength configuration for an environment.
     * @param data {@link SetRequest}
     * @returns {@link SetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    set(data: SetRequest): Promise<SetResponse>;
}
//# sourceMappingURL=passwordstrengthconfig.d.ts.map