import { ManagementClient } from "./client";
import { ClientConfig } from "./shared/client";

const WORKSPACE_KEY_ID = process.env.STYTCH_WORKSPACE_KEY_ID;
const WORKSPACE_KEY_SECRET = process.env.STYTCH_WORKSPACE_KEY_SECRET;

const shouldRunIntegrationTests = WORKSPACE_KEY_ID && WORKSPACE_KEY_SECRET;
const describeIf = shouldRunIntegrationTests ? describe : describe.skip;

describeIf("PublicTokens Integration Tests", () => {
  let client: ManagementClient;
  let projectSlug: string;
  let environmentSlug: string;

  beforeAll(async () => {
    const config: ClientConfig = {
      workspace_key_id: WORKSPACE_KEY_ID!,
      workspace_key_secret: WORKSPACE_KEY_SECRET!,
    };
    client = new ManagementClient(config);

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

    await client.environments.create({
      project_slug: projectSlug,
      name: "test",
      type: "TEST",
      environment_slug: "test",
    });

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
    it("should create public token", async () => {
      const response = await client.publicTokens.create({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
      });

      expect(response.public_token.public_token).toBeDefined();
      expect(response.public_token.public_token.length).toBeGreaterThan(10);
      expect(response.public_token.created_at).toBeDefined();
    });
  });

  describe("Get", () => {
    it("should get existing public token", async () => {
      const createResp = await client.publicTokens.create({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
      });

      const response = await client.publicTokens.get({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        public_token: createResp.public_token.public_token,
      });

      expect(response.public_token).toEqual(createResp.public_token);
    });

    it("should fail with missing public token", async () => {
      await expect(
        client.publicTokens.get({
          project_slug: projectSlug,
          environment_slug: environmentSlug,
          public_token: "",
        })
      ).rejects.toThrow();
    });
  });

  describe("GetAll", () => {
    it("should get all public tokens", async () => {
      const createdTokens = [];
      for (let i = 0; i < 3; i++) {
        const createResp = await client.publicTokens.create({
          project_slug: projectSlug,
          environment_slug: environmentSlug,
        });
        createdTokens.push(createResp.public_token);
      }

      const response = await client.publicTokens.getAll({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
      });

      expect(response.public_tokens.length).toBeGreaterThanOrEqual(3);

      const tokenValues = response.public_tokens.map((t) => t.public_token);
      for (const token of createdTokens) {
        expect(tokenValues).toContain(token.public_token);
        const foundToken = response.public_tokens.find(
          (t) => t.public_token === token.public_token
        );
        expect(foundToken?.created_at).toBeDefined();
      }
    });
  });

  describe("Delete", () => {
    it("should delete existing public token", async () => {
      // Create 2 public tokens first (can't delete all tokens)
      const createResp = await client.publicTokens.create({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
      });
      await client.publicTokens.create({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
      });

      const response = await client.publicTokens.delete({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        public_token: createResp.public_token.public_token,
      });

      expect(response.request_id).toBeDefined();

      // Verify token is deleted
      const getAllResp = await client.publicTokens.getAll({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
      });

      const tokenValues = getAllResp.public_tokens.map((t) => t.public_token);
      expect(tokenValues).not.toContain(createResp.public_token.public_token);
    });

    it("should fail when public token does not exist", async () => {
      await expect(
        client.publicTokens.delete({
          project_slug: projectSlug,
          environment_slug: environmentSlug,
          public_token: "public-token-does-not-exist",
        })
      ).rejects.toThrow();
    });
  });
});
