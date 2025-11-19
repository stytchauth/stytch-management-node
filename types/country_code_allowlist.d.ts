import { fetchConfig } from "./shared";
export interface GetAllowedSMSCountryCodesRequest {
    project_slug: string;
    environment_slug: string;
}
export interface GetAllowedSMSCountryCodesResponse {
    request_id: string;
    country_codes: string[];
    status_code: number;
}
export interface GetAllowedWhatsAppCountryCodesRequest {
    project_slug: string;
    environment_slug: string;
}
export interface GetAllowedWhatsAppCountryCodesResponse {
    request_id: string;
    country_codes: string[];
    status_code: number;
}
export interface SetAllowedSMSCountryCodesRequest {
    project_slug: string;
    environment_slug: string;
    country_codes: string[];
}
export interface SetAllowedSMSCountryCodesResponse {
    request_id: string;
    country_codes: string[];
    status_code: number;
}
export interface SetAllowedWhatsAppCountryCodesRequest {
    project_slug: string;
    environment_slug: string;
    country_codes: string[];
}
export interface SetAllowedWhatsAppCountryCodesResponse {
    request_id: string;
    country_codes: string[];
    status_code: number;
}
export declare class CountryCodeAllowlist {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * GetAllowedSMSCountryCodes retrieves the allowed SMS country codes for an environment.
     * @param params {@link GetAllowedSMSCountryCodesRequest}
     * @returns {@link GetAllowedSMSCountryCodesResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    getAllowedSMSCountryCodes(params: GetAllowedSMSCountryCodesRequest): Promise<GetAllowedSMSCountryCodesResponse>;
    /**
     * GetAllowedWhatsAppCountryCodes retrieves the allowed WhatsApp country codes for an environment.
     * @param params {@link GetAllowedWhatsAppCountryCodesRequest}
     * @returns {@link GetAllowedWhatsAppCountryCodesResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    getAllowedWhatsAppCountryCodes(params: GetAllowedWhatsAppCountryCodesRequest): Promise<GetAllowedWhatsAppCountryCodesResponse>;
    /**
     * SetAllowedSMSCountryCodes sets the allowed SMS country codes for an environment.
     * @param data {@link SetAllowedSMSCountryCodesRequest}
     * @returns {@link SetAllowedSMSCountryCodesResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    setAllowedSMSCountryCodes(data: SetAllowedSMSCountryCodesRequest): Promise<SetAllowedSMSCountryCodesResponse>;
    /**
     * SetAllowedWhatsAppCountryCodes sets the allowed WhatsApp country codes for an environment.
     * @param data {@link SetAllowedWhatsAppCountryCodesRequest}
     * @returns {@link SetAllowedWhatsAppCountryCodesResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    setAllowedWhatsAppCountryCodes(data: SetAllowedWhatsAppCountryCodesRequest): Promise<SetAllowedWhatsAppCountryCodesResponse>;
}
//# sourceMappingURL=country_code_allowlist.d.ts.map