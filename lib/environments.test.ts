import { ManagementClient } from "./client";
import { ClientConfig } from "./shared/client";

const WORKSPACE_KEY_ID = process.env.STYTCH_WORKSPACE_KEY_ID;
const WORKSPACE_KEY_SECRET = process.env.STYTCH_WORKSPACE_KEY_SECRET;

const shouldRunIntegrationTests = WORKSPACE_KEY_ID && WORKSPACE_KEY_SECRET;
const describeIf = shouldRunIntegrationTests ? describe : describe.skip;

describeIf("Environments Integration Tests", () => {
  let client: ManagementClient;
  let b2bProjectSlug: string;
  let consumerProjectSlug: string;

  beforeAll(async () => {
    const config: ClientConfig = {
      workspace_key_id: WORKSPACE_KEY_ID!,
      workspace_key_secret: WORKSPACE_KEY_SECRET!,
    };
    client = new ManagementClient(config);

    // Create B2B project
    const b2bResp = await client.projects.create({
      name: "Disposable B2B Project",
      vertical: "B2B",
    });
    b2bProjectSlug = b2bResp.project.project_slug;

    // Create live environment first (required by API)
    await client.environments.create({
      project_slug: b2bProjectSlug,
      name: "production",
      type: "LIVE",
      environment_slug: "production",
    });

    // Create Consumer project
    const consumerResp = await client.projects.create({
      name: "Disposable Consumer Project",
      vertical: "CONSUMER",
    });
    consumerProjectSlug = consumerResp.project.project_slug;

    // Create live environment first (required by API)
    await client.environments.create({
      project_slug: consumerProjectSlug,
      name: "production",
      type: "LIVE",
      environment_slug: "production",
    });
  });

  afterAll(async () => {
    if (b2bProjectSlug) {
      await client.projects.delete({ project_slug: b2bProjectSlug });
    }
    if (consumerProjectSlug) {
      await client.projects.delete({ project_slug: consumerProjectSlug });
    }
  });

  describe("Create", () => {
    it("should create environment with base case", async () => {
      const slug = "custom-slug";
      const zeroDowntimeURL = "https://example.com/migration";

      const response = await client.environments.create({
        project_slug: b2bProjectSlug,
        name: "Test Environment",
        type: "TEST",
        environment_slug: slug,
        cross_org_passwords_enabled: true,
        user_impersonation_enabled: true,
        zero_downtime_session_migration_url: zeroDowntimeURL,
      });

      expect(response.environment.name).toBe("Test Environment");
      expect(response.environment.type).toBe("TEST");
      expect(response.environment.environment_slug).toBe(slug);
      expect(response.environment.cross_org_passwords_enabled).toBe(true);
      expect(response.environment.user_impersonation_enabled).toBe(true);
      expect(response.environment.zero_downtime_session_migration_url).toBe(
        zeroDowntimeURL
      );
    });

    it("should create environment with user locking fields", async () => {
      const response = await client.environments.create({
        project_slug: b2bProjectSlug,
        name: "Test Environment",
        type: "TEST",
        user_lock_self_serve_enabled: true,
        user_lock_threshold: 5,
        user_lock_ttl: 600,
      });

      expect(response.environment.name).toBe("Test Environment");
      expect(response.environment.type).toBe("TEST");
      expect(response.environment.user_lock_self_serve_enabled).toBe(true);
      expect(response.environment.user_lock_threshold).toBe(5);
      expect(response.environment.user_lock_ttl).toBe(600);
    });

    it("should create environment with IDP fields", async () => {
      const idpAuthURL = "https://example.com/idp";
      const idpTemplateContent = '{"field": {{ user.user_id }} }';

      const response = await client.environments.create({
        project_slug: consumerProjectSlug,
        name: "Test Environment",
        type: "TEST",
        idp_authorization_url: idpAuthURL,
        idp_dynamic_client_registration_enabled: true,
        idp_dynamic_client_registration_access_token_template_content:
          idpTemplateContent,
      });

      expect(response.environment.name).toBe("Test Environment");
      expect(response.environment.type).toBe("TEST");
      expect(response.environment.idp_authorization_url).toBe(idpAuthURL);
      expect(response.environment.idp_dynamic_client_registration_enabled).toBe(
        true
      );
      expect(
        response.environment
          .idp_dynamic_client_registration_access_token_template_content
      ).toBe(idpTemplateContent);
    });
  });

  describe("Get", () => {
    it("should get existing environment", async () => {
      // Get all environments to find one
      const allResp = await client.environments.getAll({
        project_slug: b2bProjectSlug,
      });
      const env = allResp.environments.find((e) => e.type === "LIVE");

      const response = await client.environments.get({
        project_slug: b2bProjectSlug,
        environment_slug: env!.environment_slug,
      });

      expect(response.environment.environment_slug).toBe(env!.environment_slug);
    });

    it("should fail when environment does not exist", async () => {
      await expect(
        client.environments.get({
          project_slug: b2bProjectSlug,
          environment_slug: "nonexistent-environment",
        })
      ).rejects.toThrow();
    });

    it("should fail with missing environment slug", async () => {
      await expect(
        client.environments.get({
          project_slug: b2bProjectSlug,
          environment_slug: "",
        })
      ).rejects.toThrow();
    });
  });

  describe("GetAll", () => {
    it("should get all environments", async () => {
      const createResp = await client.environments.create({
        project_slug: b2bProjectSlug,
        name: "Another Test Environment",
        type: "TEST",
      });

      const response = await client.environments.getAll({
        project_slug: b2bProjectSlug,
      });

      // Should have at least live + test environment
      expect(response.environments.length).toBeGreaterThanOrEqual(2);

      const envSlugs = response.environments.map((e) => e.environment_slug);
      expect(envSlugs).toContain(createResp.environment.environment_slug);
    });
  });

  describe("Update", () => {
    it("should update environment with base case", async () => {
      // Create test environment
      const createResp = await client.environments.create({
        project_slug: b2bProjectSlug,
        name: "Test Environment",
        type: "TEST",
      });

      const newName = "Updated Environment Name";
      const zeroDowntimeURL = "https://example.com/migration";

      const response = await client.environments.update({
        project_slug: b2bProjectSlug,
        environment_slug: createResp.environment.environment_slug,
        name: newName,
        cross_org_passwords_enabled: true,
        user_impersonation_enabled: true,
        zero_downtime_session_migration_url: zeroDowntimeURL,
      });

      expect(response.environment.name).toBe(newName);
      expect(response.environment.cross_org_passwords_enabled).toBe(true);
      expect(response.environment.user_impersonation_enabled).toBe(true);
      expect(response.environment.zero_downtime_session_migration_url).toBe(
        zeroDowntimeURL
      );
    });

    it("should update environment with user locking fields", async () => {
      const createResp = await client.environments.create({
        project_slug: b2bProjectSlug,
        name: "Test Environment",
        type: "TEST",
      });

      const response = await client.environments.update({
        project_slug: b2bProjectSlug,
        environment_slug: createResp.environment.environment_slug,
        user_lock_self_serve_enabled: true,
        user_lock_threshold: 5,
        user_lock_ttl: 600,
      });

      expect(response.environment.user_lock_self_serve_enabled).toBe(true);
      expect(response.environment.user_lock_threshold).toBe(5);
      expect(response.environment.user_lock_ttl).toBe(600);
    });

    it("should update environment with IDP fields", async () => {
      const createResp = await client.environments.create({
        project_slug: consumerProjectSlug,
        name: "Test Environment",
        type: "TEST",
      });

      const idpAuthURL = "https://example.com/idp";
      const idpTemplateContent = '{"field": {{ user.user_id }} }';

      const response = await client.environments.update({
        project_slug: consumerProjectSlug,
        environment_slug: createResp.environment.environment_slug,
        idp_authorization_url: idpAuthURL,
        idp_dynamic_client_registration_enabled: true,
        idp_dynamic_client_registration_access_token_template_content:
          idpTemplateContent,
      });

      expect(response.environment.idp_authorization_url).toBe(idpAuthURL);
      expect(response.environment.idp_dynamic_client_registration_enabled).toBe(
        true
      );
      expect(
        response.environment
          .idp_dynamic_client_registration_access_token_template_content
      ).toBe(idpTemplateContent);
    });

    it("should not overwrite existing values", async () => {
      const createResp = await client.environments.create({
        project_slug: b2bProjectSlug,
        name: "Test Environment",
        type: "TEST",
      });

      // First update
      await client.environments.update({
        project_slug: b2bProjectSlug,
        environment_slug: createResp.environment.environment_slug,
        cross_org_passwords_enabled: true,
        user_impersonation_enabled: true,
      });

      // Second update with only name
      const newName = "Updated Environment Name";
      const response = await client.environments.update({
        project_slug: b2bProjectSlug,
        environment_slug: createResp.environment.environment_slug,
        name: newName,
      });

      // Other values should remain
      expect(response.environment.name).toBe(newName);
      expect(response.environment.cross_org_passwords_enabled).toBe(true);
      expect(response.environment.user_impersonation_enabled).toBe(true);
    });
  });

  describe("Delete", () => {
    it("should delete environment", async () => {
      const createResp = await client.environments.create({
        project_slug: b2bProjectSlug,
        name: "Test Environment",
        type: "TEST",
      });

      await client.environments.delete({
        project_slug: b2bProjectSlug,
        environment_slug: createResp.environment.environment_slug,
      });

      // Verify deletion
      await expect(
        client.environments.get({
          project_slug: b2bProjectSlug,
          environment_slug: createResp.environment.environment_slug,
        })
      ).rejects.toThrow();
    });
  });
});
