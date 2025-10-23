import { ManagementClient } from "./client";
import { ClientConfig } from "./shared/client";

describe("ManagementClient", () => {
  describe("constructor", () => {
    it("should create a client with valid config", () => {
      const config: ClientConfig = {
        workspace_key_id: "test-key-id",
        workspace_key_secret: "test-secret",
      };

      const client = new ManagementClient(config);

      expect(client).toBeInstanceOf(ManagementClient);
      expect(client.projects).toBeDefined();
      expect(client.environments).toBeDefined();
      expect(client.secrets).toBeDefined();
    });

    it("should throw error if workspace_key_id is missing", () => {
      const config = {
        workspace_key_secret: "test-secret",
      } as ClientConfig;

      expect(() => new ManagementClient(config)).toThrow(
        'Missing "workspace_key_id" in config'
      );
    });

    it("should throw error if workspace_key_secret is missing", () => {
      const config = {
        workspace_key_id: "test-key-id",
      } as ClientConfig;

      expect(() => new ManagementClient(config)).toThrow(
        'Missing "workspace_key_secret" in config'
      );
    });

    it("should use default base URL if not provided", () => {
      const config: ClientConfig = {
        workspace_key_id: "test-key-id",
        workspace_key_secret: "test-secret",
      };

      const client = new ManagementClient(config);

      // @ts-expect-error accessing private property for testing
      expect(client.baseURL).toBe("https://management.stytch.com/");
    });

    it("should use custom base URL if provided", () => {
      const config: ClientConfig = {
        workspace_key_id: "test-key-id",
        workspace_key_secret: "test-secret",
        base_url: "https://custom.stytch.com",
      };

      const client = new ManagementClient(config);

      // @ts-expect-error accessing private property for testing
      expect(client.baseURL).toBe("https://custom.stytch.com/");
    });

    it("should throw error if base_url is not HTTPS", () => {
      const config: ClientConfig = {
        workspace_key_id: "test-key-id",
        workspace_key_secret: "test-secret",
        base_url: "http://insecure.com",
      };

      expect(() => new ManagementClient(config)).toThrow(
        "base_url must use HTTPS scheme"
      );
    });
  });
});
