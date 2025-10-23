import { ManagementClient } from "./client";
import { ClientConfig } from "./shared/client";

// These are integration tests that require real API credentials.
const WORKSPACE_KEY_ID = process.env.STYTCH_WORKSPACE_KEY_ID;
const WORKSPACE_KEY_SECRET = process.env.STYTCH_WORKSPACE_KEY_SECRET;

const shouldRunIntegrationTests = WORKSPACE_KEY_ID && WORKSPACE_KEY_SECRET;
const describeIf = shouldRunIntegrationTests ? describe : describe.skip;

describeIf("Secrets Integration Tests", () => {
  let client: ManagementClient;
  let projectSlug: string;
  let environmentSlug: string;

  beforeAll(async () => {
    const config: ClientConfig = {
      workspace_key_id: WORKSPACE_KEY_ID!,
      workspace_key_secret: WORKSPACE_KEY_SECRET!,
    };
    client = new ManagementClient(config);

    // Create a disposable Consumer project
    const createProjectResp = await client.projects.create({
      name: "Disposable Project",
      vertical: "CONSUMER",
    });
    projectSlug = createProjectResp.project.project_slug;

    // Create live environment first (required by API)
    await client.environments.create({
      project_slug: projectSlug,
      name: "production",
      type: "LIVE",
      environment_slug: "production",
    });

    // Create test environment
    await client.environments.create({
      project_slug: projectSlug,
      name: "test",
      type: "TEST",
      environment_slug: "test",
    });

    // Get test environment slug
    const envsResp = await client.environments.getAll({
      project_slug: projectSlug,
    });
    const testEnv = envsResp.environments.find((e) => e.type === "TEST");
    environmentSlug = testEnv!.environment_slug;
  });

  afterAll(async () => {
    if (projectSlug) {
      await client.projects.delete({ project_slug: projectSlug });
    }
  });

  describe("Create", () => {
    it("should create secret", async () => {
      const response = await client.secrets.create({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
      });

      expect(response.secret.secret_id).toBeDefined();
      expect(response.secret.secret).toBeDefined();
      expect(response.secret.secret.length).toBeGreaterThan(10);
      expect(response.secret.created_at).toBeDefined();
    });
  });

  describe("Get", () => {
    it("should get existing secret", async () => {
      // Create a secret first
      const createResp = await client.secrets.create({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
      });

      // Get secret
      const response = await client.secrets.get({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        secret_id: createResp.secret.secret_id,
      });

      expect(response.secret.secret_id).toBe(createResp.secret.secret_id);
      expect(response.secret.last_four).toBeDefined();
      expect(response.secret.created_at).toBeDefined();
      expect(response.secret.last_four).toBe(
        createResp.secret.secret.slice(-4)
      );
      expect(response.secret.created_at).toEqual(createResp.secret.created_at);
    });

    it("should fail when secret does not exist", async () => {
      await expect(
        client.secrets.get({
          project_slug: projectSlug,
          environment_slug: environmentSlug,
          secret_id: "secret-does-not-exist",
        })
      ).rejects.toThrow();
    });

    it("should fail with missing secret ID", async () => {
      await expect(
        client.secrets.get({
          project_slug: projectSlug,
          environment_slug: environmentSlug,
          secret_id: "",
        })
      ).rejects.toThrow();
    });
  });

  describe("GetAll", () => {
    it("should get all secrets", async () => {
      // Create a few secrets first
      const createdSecrets = [];
      for (let i = 0; i < 3; i++) {
        const createResp = await client.secrets.create({
          project_slug: projectSlug,
          environment_slug: environmentSlug,
        });
        createdSecrets.push(createResp.secret);
      }

      // Get all secrets
      const response = await client.secrets.getAll({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
      });

      expect(response.secrets.length).toBeGreaterThanOrEqual(3);

      // Verify all created secrets are returned
      const secretIDs = response.secrets.map((s) => s.secret_id);
      for (const secret of createdSecrets) {
        expect(secretIDs).toContain(secret.secret_id);
        const foundSecret = response.secrets.find(
          (s) => s.secret_id === secret.secret_id
        );
        expect(foundSecret?.last_four).toBeDefined();
        expect(foundSecret?.created_at).toBeDefined();
      }
    });
  });

  describe("Delete", () => {
    it("should delete existing secret", async () => {
      // Create a secret first
      const createResp = await client.secrets.create({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
      });

      // Delete secret
      const response = await client.secrets.delete({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        secret_id: createResp.secret.secret_id,
      });

      expect(response.request_id).toBeDefined();

      // Verify secret is deleted
      await expect(
        client.secrets.get({
          project_slug: projectSlug,
          environment_slug: environmentSlug,
          secret_id: createResp.secret.secret_id,
        })
      ).rejects.toThrow();
    });

    it("should fail when secret does not exist", async () => {
      await expect(
        client.secrets.delete({
          project_slug: projectSlug,
          environment_slug: environmentSlug,
          secret_id: "secret-does-not-exist",
        })
      ).rejects.toThrow();
    });
  });
});
