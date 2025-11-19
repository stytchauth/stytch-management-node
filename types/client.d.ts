import { BaseClient, ClientConfig } from "./shared/client";
import { CountryCodeAllowlist } from "./country_code_allowlist";
import { EmailTemplates } from "./emailtemplates";
import { Environments } from "./environments";
import { EventLogStreaming } from "./event_log_streaming";
import { JWTTemplates } from "./jwttemplates";
import { PasswordStrengthConfig } from "./passwordstrengthconfig";
import { Projects } from "./projects";
import { PublicTokens } from "./publictokens";
import { RBACPolicy } from "./rbacpolicy";
import { RedirectURLs } from "./redirecturls";
import { SDK } from "./sdk";
import { Secrets } from "./secrets";
import { TrustedTokenProfiles } from "./trustedtokenprofiles";
export declare class ManagementClient extends BaseClient {
    projects: Projects;
    countryCodeAllowlist: CountryCodeAllowlist;
    emailTemplates: EmailTemplates;
    environments: Environments;
    eventLogStreaming: EventLogStreaming;
    jwtTemplates: JWTTemplates;
    passwordStrengthConfig: PasswordStrengthConfig;
    publicTokens: PublicTokens;
    rbacPolicy: RBACPolicy;
    redirectURLs: RedirectURLs;
    sdk: SDK;
    secrets: Secrets;
    trustedTokenProfiles: TrustedTokenProfiles;
    constructor(config: ClientConfig);
}
//# sourceMappingURL=client.d.ts.map