import { ManagementClient } from "./client";
import { ClientConfig } from "./shared/client";

const WORKSPACE_KEY_ID = process.env.STYTCH_WORKSPACE_KEY_ID;
const WORKSPACE_KEY_SECRET = process.env.STYTCH_WORKSPACE_KEY_SECRET;

const shouldRunIntegrationTests = WORKSPACE_KEY_ID && WORKSPACE_KEY_SECRET;
const describeIf = shouldRunIntegrationTests ? describe : describe.skip;

const testRedirectURL1 = "https://localhost:3000/callback";
const testRedirectURL2 = "https://localhost:3001/auth/callback";
const testRedirectURL3 = "https://localhost:3002/login";

describeIf("RedirectURLs Integration Tests", () => {
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
      name: "Disposable B2B Project",
      vertical: "B2B",
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
    it("should create redirect URL with single type", async () => {
      const response = await client.redirectURLs.create({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        url: testRedirectURL1,
        valid_types: [
          {
            type: "LOGIN",
            is_default: true,
          },
        ],
        do_not_promote_defaults: false,
      });

      expect(response.redirect_url.url).toBe(testRedirectURL1);
      expect(response.redirect_url.valid_types.length).toBe(1);
      expect(response.redirect_url.valid_types[0].type).toBe("LOGIN");
      expect(response.redirect_url.valid_types[0].is_default).toBe(true);
    });

    it("should create redirect URL with multiple types", async () => {
      const response = await client.redirectURLs.create({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        url: testRedirectURL2,
        valid_types: [
          { type: "LOGIN", is_default: true },
          { type: "SIGNUP", is_default: false },
          { type: "INVITE", is_default: true },
        ],
        do_not_promote_defaults: false,
      });

      expect(response.redirect_url.url).toBe(testRedirectURL2);
      expect(response.redirect_url.valid_types.length).toBe(3);

      const typeMap = new Map(
        response.redirect_url.valid_types.map((t) => [t.type, t.is_default])
      );
      expect(typeMap.has("LOGIN")).toBe(true);
      expect(typeMap.has("SIGNUP")).toBe(true);
      expect(typeMap.has("INVITE")).toBe(true);
    });

    it("should create redirect URL with do not promote defaults", async () => {
      const response = await client.redirectURLs.create({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        url: testRedirectURL3,
        valid_types: [{ type: "RESET_PASSWORD", is_default: false }],
        do_not_promote_defaults: true,
      });

      expect(response.redirect_url.url).toBe(testRedirectURL3);
      expect(response.redirect_url.valid_types.length).toBe(1);
      expect(response.redirect_url.valid_types[0].type).toBe("RESET_PASSWORD");
    });

    it("should handle duplicate redirect URL", async () => {
      const duplicateURL = "https://duplicate.example.com/callback";

      // Create first redirect URL
      await client.redirectURLs.create({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        url: duplicateURL,
        valid_types: [{ type: "LOGIN", is_default: true }],
      });

      // Create the same URL again - should update
      await client.redirectURLs.create({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        url: duplicateURL,
        valid_types: [{ type: "SIGNUP", is_default: true }],
      });

      const getResp = await client.redirectURLs.get({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        url: duplicateURL,
      });

      expect(getResp.redirect_url.valid_types.length).toBe(2);
    });
  });

  describe("GetAll", () => {
    it("should get all redirect URLs", async () => {
      const url1 = "https://getall1.example.com/callback";
      const url2 = "https://getall2.example.com/callback";

      await client.redirectURLs.create({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        url: url1,
        valid_types: [{ type: "LOGIN", is_default: true }],
      });

      await client.redirectURLs.create({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        url: url2,
        valid_types: [{ type: "SIGNUP", is_default: true }],
      });

      const response = await client.redirectURLs.getAll({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
      });

      expect(response.redirect_urls.length).toBeGreaterThanOrEqual(2);

      const urlMap = new Map(response.redirect_urls.map((r) => [r.url, true]));
      expect(urlMap.has(url1)).toBe(true);
      expect(urlMap.has(url2)).toBe(true);
    });

    it("should get all redirect URLs", async () => {
      const response = await client.redirectURLs.getAll({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
      });

      expect(response.redirect_urls).toBeDefined();
      expect(Array.isArray(response.redirect_urls)).toBe(true);
    });
  });

  describe("Get", () => {
    it("should get existing redirect URL", async () => {
      const getURL = "https://get.example.com/callback";

      const createResp = await client.redirectURLs.create({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        url: getURL,
        valid_types: [{ type: "LOGIN", is_default: true }],
      });

      const response = await client.redirectURLs.get({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        url: getURL,
      });

      expect(response.redirect_url.url).toBe(createResp.redirect_url.url);
      expect(response.redirect_url.valid_types.length).toBe(1);

      const typeMap = new Map(
        response.redirect_url.valid_types.map((t) => [t.type, t.is_default])
      );
      expect(typeMap.has("LOGIN")).toBe(true);
      expect(typeMap.get("LOGIN")).toBe(true);
    });

    it("should get existing redirect URL using query params", async () => {
      const urlWithQueryParams = "https://localhost:3002/login?expires_at={}";

      await client.redirectURLs.create({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        url: urlWithQueryParams,
        valid_types: [{ type: "INVITE", is_default: false }],
      });

      const response = await client.redirectURLs.get({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        url: urlWithQueryParams,
      });

      expect(response.redirect_url.url).toBe(urlWithQueryParams);
      expect(response.redirect_url.valid_types.length).toBe(1);
    });

    it("should fail to get non-existent redirect URL", async () => {
      await expect(
        client.redirectURLs.get({
          project_slug: projectSlug,
          environment_slug: environmentSlug,
          url: "https://nonexistent.example.com/callback",
        })
      ).rejects.toThrow();
    });
  });

  describe("Update", () => {
    it("should update redirect URL valid types", async () => {
      const updateURL = "https://update.example.com/callback";

      await client.redirectURLs.create({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        url: updateURL,
        valid_types: [{ type: "LOGIN", is_default: true }],
      });

      const response = await client.redirectURLs.update({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        url: updateURL,
        valid_types: [
          { type: "LOGIN", is_default: true },
          { type: "SIGNUP", is_default: true },
          { type: "RESET_PASSWORD", is_default: false },
        ],
        do_not_promote_defaults: false,
      });

      expect(response.redirect_url.url).toBe(updateURL);
      expect(response.redirect_url.valid_types.length).toBe(3);

      const typeMap = new Map(
        response.redirect_url.valid_types.map((t) => [t.type, t.is_default])
      );
      expect(typeMap.has("LOGIN")).toBe(true);
      expect(typeMap.has("SIGNUP")).toBe(true);
      expect(typeMap.has("RESET_PASSWORD")).toBe(true);
    });

    it("should fail to update non-existent redirect URL", async () => {
      await expect(
        client.redirectURLs.update({
          project_slug: projectSlug,
          environment_slug: environmentSlug,
          url: "https://nonexistent-update.example.com/callback",
          valid_types: [{ type: "LOGIN", is_default: true }],
        })
      ).rejects.toThrow();
    });
  });

  describe("Delete", () => {
    it("should delete existing redirect URL", async () => {
      const deleteURL = "https://delete.example.com/callback";

      await client.redirectURLs.create({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        url: deleteURL,
        valid_types: [{ type: "LOGIN", is_default: true }],
      });

      const response = await client.redirectURLs.delete({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        url: deleteURL,
        do_not_promote_defaults: false,
      });

      expect(response).toBeDefined();

      // Verify deletion
      await expect(
        client.redirectURLs.get({
          project_slug: projectSlug,
          environment_slug: environmentSlug,
          url: deleteURL,
        })
      ).rejects.toThrow();
    });

    it("should fail to delete non-existent redirect URL", async () => {
      await expect(
        client.redirectURLs.delete({
          project_slug: projectSlug,
          environment_slug: environmentSlug,
          url: "https://nonexistent-delete.example.com/callback",
        })
      ).rejects.toThrow();
    });
  });
});
