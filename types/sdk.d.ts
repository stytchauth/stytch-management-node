import { fetchConfig } from "./shared";
export interface AuthorizedB2BDomain {
    domain: string;
    /**
     * SlugPattern is the slug pattern that can be used to support authentication flows specific to each
     * organization. An example value here might be 'https://{{slug}}.example.com'. The value **must** include
     * '{{slug}}' as a placeholder for the slug.
     */
    slug_pattern: string;
}
export interface B2BBasicConfig {
    /**
     * Enabled indicates whether the B2B project SDK is enabled. This allows the SDK to manage user and session
     * data.
     */
    enabled: boolean;
    allow_self_onboarding: boolean;
    enable_member_permissions: boolean;
    domains: AuthorizedB2BDomain[];
    bundle_ids: string[];
}
export interface B2BConfig {
    basic?: B2BBasicConfig;
    sessions?: B2BSessionsConfig;
    magic_links?: B2BMagicLinksConfig;
    oauth?: B2BOAuthConfig;
    totps?: B2BTOTPsConfig;
    sso?: B2BSSOConfig;
    otps?: B2BOTPsConfig;
    DFPPA?: B2BDFPPAConfig;
    passwords?: B2BPasswordsConfig;
    cookies?: B2BCookiesConfig;
}
export interface B2BCookiesConfig {
    http_only: "DISABLED" | "ENABLED" | "ENFORCED" | string;
}
export interface B2BDFPPAConfig {
    enabled?: "ENABLED" | "PASSIVE" | "DISABLED" | string;
    on_challenge?: "ALLOW" | "BLOCK" | "TRIGGER_CAPTCHA" | string;
}
export interface B2BMagicLinksConfig {
    enabled: boolean;
    /**
     * Indicates that PKCE is required in auth flows for the related SDK endpoints. PKCE increases security by
     * introducing a one-time secret for each auth flow to ensure the user starts and completes each auth flow
     * from the same application on the device. This prevents a malicious app from intercepting a redirect and
     * authenticating with the user's token. PKCE is enabled by default for mobile SDKs.
     */
    pkce_required: boolean;
}
export interface B2BOAuthConfig {
    enabled: boolean;
    /**
     * Indicates that PKCE is required in auth flows for the related SDK endpoints. PKCE increases security by
     * introducing a one-time secret for each auth flow to ensure the user starts and completes each auth flow
     * from the same application on the device. This prevents a malicious app from intercepting a redirect and
     * authenticating with the user's token. PKCE is enabled by default for mobile SDKs.
     */
    pkce_required: boolean;
}
export interface B2BOTPsConfig {
    sms_enabled: boolean;
    sms_autofill_metadata: SMSAutofillMetadata[];
    email_enabled: boolean;
}
export interface B2BPasswordsConfig {
    enabled: boolean;
    /**
     * PKCERequired indicates whether PKCE is required for password resets. PKCE increases security by
     * introducing a one-time secret for each auth flow to ensure the user starts and completes each auth flow
     * from the same application on the device. This prevents a malicious app from intercepting a redirect and
     * authenticating with the user's token. PKCE is enabled by default for mobile SDKs.
     */
    pkce_required_for_password_resets: boolean;
}
export interface B2BSSOConfig {
    enabled: boolean;
    /**
     * Indicates that PKCE is required in auth flows for the related SDK endpoints. PKCE increases security by
     * introducing a one-time secret for each auth flow to ensure the user starts and completes each auth flow
     * from the same application on the device. This prevents a malicious app from intercepting a redirect and
     * authenticating with the user's token. PKCE is enabled by default for mobile SDKs.
     */
    pkce_required: boolean;
}
export interface B2BSessionsConfig {
    max_session_duration_minutes: number;
}
export interface B2BTOTPsConfig {
    create_totps: boolean;
    enabled: boolean;
}
export interface ConsumerBasicConfig {
    /**
     * Enabled indicates whether the consumer project SDK is enabled. This allows the SDK to manage user and
     * session data.
     */
    enabled: boolean;
    domains: string[];
    bundle_ids: string[];
}
export interface ConsumerBiometricsConfig {
    create_biometrics_enabled: boolean;
    /**
     * Enabled indicates whether the consumer project SDK is enabled. This allows the SDK to manage user and
     * session data.
     */
    enabled: boolean;
}
export interface ConsumerConfig {
    basic?: ConsumerBasicConfig;
    sessions?: ConsumerSessionsConfig;
    magic_links?: ConsumerMagicLinksConfig;
    otps?: ConsumerOTPsConfig;
    oauth?: ConsumerOAuthConfig;
    totps?: ConsumerTOTPsConfig;
    webauthn?: ConsumerWebAuthnConfig;
    crypto_wallets?: ConsumerCryptoWalletsConfig;
    DFPPA?: ConsumerDFPPAConfig;
    biometrics?: ConsumerBiometricsConfig;
    passwords?: ConsumerPasswordsConfig;
    cookies?: ConsumerCookiesConfig;
}
export interface ConsumerCookiesConfig {
    http_only: "DISABLED" | "ENABLED" | "ENFORCED" | string;
}
export interface ConsumerCryptoWalletsConfig {
    enabled: boolean;
    siwe_required: boolean;
}
export interface ConsumerDFPPAConfig {
    enabled?: "ENABLED" | "PASSIVE" | "DISABLED" | string;
    on_challenge?: "ALLOW" | "BLOCK" | "TRIGGER_CAPTCHA" | string;
}
export interface ConsumerMagicLinksConfig {
    login_or_create_enabled: boolean;
    send_enabled: boolean;
    /**
     * Indicates that PKCE is required in auth flows for the related SDK endpoints. PKCE increases security by
     * introducing a one-time secret for each auth flow to ensure the user starts and completes each auth flow
     * from the same application on the device. This prevents a malicious app from intercepting a redirect and
     * authenticating with the user's token. PKCE is enabled by default for mobile SDKs.
     */
    pkce_required: boolean;
}
export interface ConsumerOAuthConfig {
    enabled: boolean;
    /**
     * Indicates that PKCE is required in auth flows for the related SDK endpoints. PKCE increases security by
     * introducing a one-time secret for each auth flow to ensure the user starts and completes each auth flow
     * from the same application on the device. This prevents a malicious app from intercepting a redirect and
     * authenticating with the user's token. PKCE is enabled by default for mobile SDKs.
     */
    pkce_required: boolean;
}
export interface ConsumerOTPsConfig {
    sms_login_or_create_enabled: boolean;
    /**
     * WhatsAppLoginOrCreateEnabled indicates whether the WhatsApp OTP login or create endpoint is enabled in
     * the SDK.
     */
    whatsapp_login_or_create_enabled: boolean;
    email_login_or_create_enabled: boolean;
    sms_send_enabled: boolean;
    whatsapp_send_enabled: boolean;
    email_send_enabled: boolean;
    sms_autofill_metadata: SMSAutofillMetadata[];
}
export interface ConsumerPasswordsConfig {
    enabled: boolean;
    /**
     * PKCERequired indicates whether PKCE is required for password resets. PKCE increases security by
     * introducing a one-time secret for each auth flow to ensure the user starts and completes each auth flow
     * from the same application on the device. This prevents a malicious app from intercepting a redirect and
     * authenticating with the user's token. PKCE is enabled by default for mobile SDKs.
     */
    pkce_required_for_password_resets: boolean;
}
export interface ConsumerSessionsConfig {
    max_session_duration_minutes: number;
}
export interface ConsumerTOTPsConfig {
    create_totps: boolean;
    enabled: boolean;
}
export interface ConsumerWebAuthnConfig {
    create_webauthns: boolean;
    enabled: boolean;
}
export interface SMSAutofillMetadata {
    metadata_type: "domain" | "hash" | string;
    /**
     * MetadataValue is the value of the metadata to use for autofill. This should be the associated domain
     * name (for MetadataType "domain") or application hash (for MetadataType "hash").
     */
    metadata_value: string;
    bundle_id: string;
}
export interface GetB2BConfigRequest {
    project_slug: string;
    environment_slug: string;
}
export interface GetB2BConfigResponse {
    request_id: string;
    config: B2BConfig;
    status_code: number;
}
export interface GetConsumerConfigRequest {
    project_slug: string;
    environment_slug: string;
}
export interface GetConsumerConfigResponse {
    request_id: string;
    config: ConsumerConfig;
    status_code: number;
}
export interface SetB2BConfigRequest {
    project_slug: string;
    environment_slug: string;
    config?: B2BConfig;
}
export interface SetB2BConfigResponse {
    request_id: string;
    config: B2BConfig;
    status_code: number;
}
export interface SetConsumerConfigRequest {
    project_slug: string;
    environment_slug: string;
    config?: ConsumerConfig;
}
export interface SetConsumerConfigResponse {
    request_id: string;
    config: ConsumerConfig;
    status_code: number;
}
export declare class SDK {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * GetConsumerConfig retrieves the SDK configuration for a B2C project environment
     * @param params {@link GetConsumerConfigRequest}
     * @returns {@link GetConsumerConfigResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    getConsumerConfig(params: GetConsumerConfigRequest): Promise<GetConsumerConfigResponse>;
    /**
     * SetConsumerConfig updates the SDK configuration for a B2C project environment
     * @param data {@link SetConsumerConfigRequest}
     * @returns {@link SetConsumerConfigResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    setConsumerConfig(data: SetConsumerConfigRequest): Promise<SetConsumerConfigResponse>;
    /**
     * GetB2BConfig retrieves the SDK configuration for a B2B project environment
     * @param params {@link GetB2BConfigRequest}
     * @returns {@link GetB2BConfigResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    getB2BConfig(params: GetB2BConfigRequest): Promise<GetB2BConfigResponse>;
    /**
     * SetB2BConfig updates the SDK configuration for a B2B project environment
     * @param data {@link SetB2BConfigRequest}
     * @returns {@link SetB2BConfigResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    setB2BConfig(data: SetB2BConfigRequest): Promise<SetB2BConfigResponse>;
}
//# sourceMappingURL=sdk.d.ts.map