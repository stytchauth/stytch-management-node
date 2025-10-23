import { fetchConfig } from "./shared";
export interface CustomHTMLCustomization {
    template_type?: "LOGIN" | "SIGNUP" | "INVITE" | "RESET_PASSWORD" | "ONE_TIME_PASSCODE" | "ONE_TIME_PASSCODE_SIGNUP" | "VERIFY_EMAIL_PASSWORD_RESET" | "UNLOCK" | "PREBUILT" | string;
    html_content?: string;
    plaintext_content?: string;
    subject?: string;
}
export interface EmailTemplate {
    /**
     * TemplateID is a unique identifier to use for the template – this is how you will refer to the template
     * when sending emails from your project or managing this template. It can never be changed after creation.
     */
    template_id: string;
    name?: string;
    /**
     * SenderInformation is information about the email sender, such as the reply address or rendered name.
     * This is an optional field for PrebuiltCustomization, but required for CustomHTMLCustomization.
     */
    sender_information?: SenderInformation;
    /**
     * PrebuiltCustomization is customization related to prebuilt fields (such as button color) for prebuilt
     * email templates.
     */
    prebuilt_customization?: PrebuiltCustomization;
    custom_html_customization?: CustomHTMLCustomization;
}
export interface PrebuiltCustomization {
    button_border_radius?: number;
    button_color?: string;
    button_text_color?: string;
    font_family?: "ARIAL" | "BRUSH_SCRIPT_MT" | "COURIER_NEW" | "GEORGIA" | "HELVETICA" | "TAHOMA" | "TIMES_NEW_ROMAN" | "TREBUCHET_MS" | "VERDANA" | string;
    text_alignment?: "LEFT" | "CENTER" | string;
}
export interface SenderInformation {
    /**
     * FromLocalPart is the prefix of the sender’s email address, everything before the @ symbol (e.g.,
     * first.last).
     */
    from_local_part?: string;
    /**
     * FromDomain is the postfix of the sender’s email address, everything after the @ symbol (e.g.,
     * stytch.com).
     */
    from_domain?: string;
    from_name?: string;
    /**
     * ReplyToLocalPart is the prefix of the reply-to email address, everything before the @ symbol (e.g.,
     * first.last).
     */
    reply_to_local_part?: string;
    reply_to_name?: string;
}
export interface CreateRequest {
    project_slug: string;
    /**
     * TemplateID is a unique identifier to use for the template – this is how you will refer to the template
     * when sending emails from your project or managing this template. It can never be changed after creation.
     */
    template_id: string;
    name?: string;
    /**
     * SenderInformation is information about the email sender, such as the reply address or rendered name.
     * This is an optional field for PrebuiltCustomization, but required for CustomHTMLCustomization.
     */
    sender_information?: SenderInformation;
    /**
     * PrebuiltCustomization is customization related to prebuilt fields (such as button color) for prebuilt
     * email templates.
     */
    prebuilt_customization?: PrebuiltCustomization;
    custom_html_customization?: CustomHTMLCustomization;
}
export interface CreateResponse {
    request_id: string;
    email_template: EmailTemplate;
    status_code: number;
}
export interface DeleteRequest {
    project_slug: string;
    /**
     * TemplateID is a unique identifier to use for the template – this is how you will refer to the template
     * when sending emails from your project or managing this template. It can never be changed after creation.
     */
    template_id: string;
}
export interface DeleteResponse {
    request_id: string;
    status_code: number;
}
export interface GetAllRequest {
    project_slug: string;
}
export interface GetAllResponse {
    request_id: string;
    email_templates: EmailTemplate[];
    status_code: number;
}
export interface GetDefaultRequest {
    project_slug: string;
    email_template_type?: "LOGIN" | "SIGNUP" | "INVITE" | "RESET_PASSWORD" | "ONE_TIME_PASSCODE" | "ONE_TIME_PASSCODE_SIGNUP" | "VERIFY_EMAIL_PASSWORD_RESET" | "UNLOCK" | "PREBUILT" | string;
}
export interface GetDefaultResponse {
    request_id: string;
    /**
     * TemplateID is a unique identifier to use for the template – this is how you will refer to the template
     * when sending emails from your project or managing this template. It can never be changed after creation.
     */
    template_id: string;
    status_code: number;
}
export interface GetRequest {
    project_slug: string;
    /**
     * TemplateID is a unique identifier to use for the template – this is how you will refer to the template
     * when sending emails from your project or managing this template. It can never be changed after creation.
     */
    template_id: string;
}
export interface GetResponse {
    request_id: string;
    email_template: EmailTemplate;
    status_code: number;
}
export interface SetDefaultRequest {
    project_slug: string;
    /**
     * TemplateID is a unique identifier to use for the template – this is how you will refer to the template
     * when sending emails from your project or managing this template. It can never be changed after creation.
     */
    template_id: string;
    email_template_type?: "LOGIN" | "SIGNUP" | "INVITE" | "RESET_PASSWORD" | "ONE_TIME_PASSCODE" | "ONE_TIME_PASSCODE_SIGNUP" | "VERIFY_EMAIL_PASSWORD_RESET" | "UNLOCK" | "PREBUILT" | string;
}
export interface SetDefaultResponse {
    request_id: string;
    status_code: number;
}
export interface UnsetDefaultRequest {
    project_slug: string;
    /**
     * EmailTemplateType is the template type for which to unset the default email template. Note that
     * unsetting the PREBUILT type is not supported.
     */
    email_template_type?: "LOGIN" | "SIGNUP" | "INVITE" | "RESET_PASSWORD" | "ONE_TIME_PASSCODE" | "ONE_TIME_PASSCODE_SIGNUP" | "VERIFY_EMAIL_PASSWORD_RESET" | "UNLOCK" | "PREBUILT" | string;
}
export interface UnsetDefaultResponse {
    request_id: string;
    status_code: number;
}
export interface UpdateRequest {
    project_slug: string;
    /**
     * TemplateID is a unique identifier to use for the template – this is how you will refer to the template
     * when sending emails from your project or managing this template. It can never be changed after creation.
     */
    template_id: string;
    name?: string;
    /**
     * SenderInformation is information about the email sender, such as the reply address or rendered name.
     * This is an optional field for PrebuiltCustomization, but required for CustomHTMLCustomization.
     */
    sender_information?: SenderInformation;
    /**
     * PrebuiltCustomization is customization related to prebuilt fields (such as button color) for prebuilt
     * email templates.
     */
    prebuilt_customization?: PrebuiltCustomization;
    custom_html_customization?: CustomHTMLCustomization;
}
export interface UpdateResponse {
    request_id: string;
    email_template: EmailTemplate;
    status_code: number;
}
export declare class EmailTemplates {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Create creates an email template for a project.
     * @param data {@link CreateRequest}
     * @returns {@link CreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: CreateRequest): Promise<CreateResponse>;
    /**
     * Get retrieves an email template for a project.
     * @param params {@link GetRequest}
     * @returns {@link GetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: GetRequest): Promise<GetResponse>;
    /**
     * GetAll retrieves all email templates for a project.
     * @param params {@link GetAllRequest}
     * @returns {@link GetAllResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    getAll(params: GetAllRequest): Promise<GetAllResponse>;
    /**
     * Update updates an email template for a project.
     * @param data {@link UpdateRequest}
     * @returns {@link UpdateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    update(data: UpdateRequest): Promise<UpdateResponse>;
    /**
     * Delete deletes an email template for a project.
     * @param data {@link DeleteRequest}
     * @returns {@link DeleteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    delete(data: DeleteRequest): Promise<DeleteResponse>;
    /**
     * SetDefault sets the default email template for a specific template type in a project.
     * @param data {@link SetDefaultRequest}
     * @returns {@link SetDefaultResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    setDefault(data: SetDefaultRequest): Promise<SetDefaultResponse>;
    /**
     * GetDefault retrieves the default email template for a specific template type in a project.
     * @param params {@link GetDefaultRequest}
     * @returns {@link GetDefaultResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    getDefault(params: GetDefaultRequest): Promise<GetDefaultResponse>;
    /**
     * UnsetDefault removes the default email template for a specific template type in a project.
     * @param data {@link UnsetDefaultRequest}
     * @returns {@link UnsetDefaultResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    unsetDefault(data: UnsetDefaultRequest): Promise<UnsetDefaultResponse>;
}
//# sourceMappingURL=emailtemplates.d.ts.map