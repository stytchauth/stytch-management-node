import type { Dispatcher } from "undici";
import { base64Encode } from "./base64";

const DEFAULT_TIMEOUT = 10 * 60 * 1000; // Ten minutes
const DEFAULT_BASE_URL = "https://management.stytch.com";

export interface ClientConfig {
  workspace_key_id: string;
  workspace_key_secret: string;
  base_url?: string;
  timeout?: number;
  dispatcher?: Dispatcher;
}

export interface fetchConfig {
  baseURL: string;
  headers: Record<string, string>;
  timeout: number;
  dispatcher?: Dispatcher;
}

export class BaseClient {
  protected fetchConfig: fetchConfig;
  protected baseURL: string;

  constructor(config: ClientConfig) {
    if (typeof config != "object") {
      throw new Error(
        "Unexpected config type. Refer to https://github.com/stytchauth/stytch-management-node for how to use the Management Node client library."
      );
    }

    if (!config.workspace_key_id) {
      throw new Error('Missing "workspace_key_id" in config');
    }

    if (!config.workspace_key_secret) {
      throw new Error('Missing "workspace_key_secret" in config');
    }

    // Validate base_url is using HTTPS if provided
    if (config.base_url && !config.base_url.startsWith("https://")) {
      throw new Error("base_url must use HTTPS scheme");
    }

    const baseURL = config.base_url || DEFAULT_BASE_URL;

    const headers = {
      "Content-Type": "application/json",
      "User-Agent": "Stytch Management Node v1.0.0", // TODO: Get version from package.json
      Authorization:
        "Basic " +
        base64Encode(
          config.workspace_key_id + ":" + config.workspace_key_secret
        ),
    };

    this.fetchConfig = {
      baseURL: baseURL,
      headers,
      timeout: config.timeout || DEFAULT_TIMEOUT,
      dispatcher: config.dispatcher,
    };

    // Get a baseURL that ends with a slash to make building route URLs easier.
    this.baseURL = baseURL;
    if (!this.baseURL.endsWith("/")) {
      this.baseURL += "/";
    }
  }
}
