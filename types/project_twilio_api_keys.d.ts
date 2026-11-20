import { fetchConfig } from "./shared";
export interface CreateTwilioAPIKeyRequest {
    project_slug: string;
    environment_slug: string;
    twilio_api_key_sid: string;
    twilio_api_key_secret: string;
}
export interface CreateTwilioAPIKeyResponse {
    request_id: string;
    twilio_api_key_sid: string;
    status_code: number;
}
export interface GetTwilioAPIKeyRequest {
    project_slug: string;
    environment_slug: string;
}
export interface GetTwilioAPIKeyResponse {
    request_id: string;
    twilio_api_key_sid: string;
    status_code: number;
}
export declare class ProjectTwilioAPIKeysService {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Get retrieves the SID of the active Twilio API key for an environment. The secret is never returned.
     * @param params {@link GetTwilioAPIKeyRequest}
     * @returns {@link GetTwilioAPIKeyResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    getTwilioAPIKey(params: GetTwilioAPIKeyRequest): Promise<GetTwilioAPIKeyResponse>;
    /**
     * Create stores the Twilio API key and secret for an environment. The key is used to call Twilio Fraud
     * Prevention as part of Device Fingerprinting Protected Auth.
     * @param data {@link CreateTwilioAPIKeyRequest}
     * @returns {@link CreateTwilioAPIKeyResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    createTwilioAPIKey(data: CreateTwilioAPIKeyRequest): Promise<CreateTwilioAPIKeyResponse>;
}
//# sourceMappingURL=project_twilio_api_keys.d.ts.map