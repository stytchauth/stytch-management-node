import { ManagementClient } from "./client";
import { ClientConfig } from "./shared/client";

const WORKSPACE_KEY_ID = process.env.STYTCH_WORKSPACE_KEY_ID;
const WORKSPACE_KEY_SECRET = process.env.STYTCH_WORKSPACE_KEY_SECRET;

const shouldRunIntegrationTests = WORKSPACE_KEY_ID && WORKSPACE_KEY_SECRET;
const describeIf = shouldRunIntegrationTests ? describe : describe.skip;

describeIf("JWTTemplates Integration Tests", () => {
  let client: ManagementClient;
  let consumerProjectSlug: string;
  let b2bProjectSlug: string;

  beforeAll(async () => {
    const config: ClientConfig = {
      workspace_key_id: WORKSPACE_KEY_ID!,
      workspace_key_secret: WORKSPACE_KEY_SECRET!,
    };
    client = new ManagementClient(config);

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

    await client.environments.create({
      project_slug: consumerProjectSlug,
      name: "test",
      type: "TEST",
      environment_slug: "test",
    });

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

    await client.environments.create({
      project_slug: b2bProjectSlug,
      name: "test",
      type: "TEST",
      environment_slug: "test",
    });
  });

  afterAll(async () => {
    if (consumerProjectSlug) {
      await client.projects.delete({ project_slug: consumerProjectSlug });
    }
    if (b2bProjectSlug) {
      await client.projects.delete({ project_slug: b2bProjectSlug });
    }
  });

  describe("Get Session Template", () => {
    it("should get session template after setting it", async () => {
      const envsResp = await client.environments.getAll({
        project_slug: consumerProjectSlug,
      });
      const testEnv = envsResp.environments.find((e) => e.type === "TEST");
      const environmentSlug = testEnv!.environment_slug;

      const templateContent =
        '{"custom_user_id": "user-123", "custom_email": "test@example.com"}';
      const customAudience = "my-custom-audience";

      // Set template
      await client.jwtTemplates.set({
        project_slug: consumerProjectSlug,
        environment_slug: environmentSlug,
        jwt_template_type: "SESSION",
        template_content: templateContent,
        custom_audience: customAudience,
      });

      // Get template
      const response = await client.jwtTemplates.get({
        project_slug: consumerProjectSlug,
        environment_slug: environmentSlug,
        jwt_template_type: "SESSION",
      });

      expect(response.jwt_template.template_content).toBe(templateContent);
      expect(response.jwt_template.custom_audience).toBe(customAudience);
      expect(response.jwt_template.jwt_template_type).toBe("SESSION");
    });
  });

  describe("Get M2M Template", () => {
    it("should get m2m template after setting it", async () => {
      const envsResp = await client.environments.getAll({
        project_slug: b2bProjectSlug,
      });
      const testEnv = envsResp.environments.find((e) => e.type === "TEST");
      const environmentSlug = testEnv!.environment_slug;

      const templateContent =
        '{"custom_org_id": "org-456", "custom_name": "Test Organization"}';
      const customAudience = "m2m-audience";

      // Set template
      await client.jwtTemplates.set({
        project_slug: b2bProjectSlug,
        environment_slug: environmentSlug,
        jwt_template_type: "M2M",
        template_content: templateContent,
        custom_audience: customAudience,
      });

      // Get template
      const response = await client.jwtTemplates.get({
        project_slug: b2bProjectSlug,
        environment_slug: environmentSlug,
        jwt_template_type: "M2M",
      });

      expect(response.jwt_template.template_content).toBe(templateContent);
      expect(response.jwt_template.custom_audience).toBe(customAudience);
      expect(response.jwt_template.jwt_template_type).toBe("M2M");
    });
  });

  describe("Set Session Template", () => {
    it("should set session template", async () => {
      const envsResp = await client.environments.getAll({
        project_slug: consumerProjectSlug,
      });
      const testEnv = envsResp.environments.find((e) => e.type === "TEST");
      const environmentSlug = testEnv!.environment_slug;

      const templateContent =
        '{"custom_user_id": "user-123", "custom_email": "test@example.com"}';
      const customAudience = "my-custom-audience";

      const response = await client.jwtTemplates.set({
        project_slug: consumerProjectSlug,
        environment_slug: environmentSlug,
        jwt_template_type: "SESSION",
        template_content: templateContent,
        custom_audience: customAudience,
      });

      expect(response.jwt_template.template_content).toBe(templateContent);
      expect(response.jwt_template.custom_audience).toBe(customAudience);
      expect(response.jwt_template.jwt_template_type).toBe("SESSION");
    });
  });

  describe("Set M2M Template", () => {
    it("should set m2m template", async () => {
      const envsResp = await client.environments.getAll({
        project_slug: b2bProjectSlug,
      });
      const testEnv = envsResp.environments.find((e) => e.type === "TEST");
      const environmentSlug = testEnv!.environment_slug;

      const templateContent =
        '{"custom_org_id": "org-456", "custom_name": "Test Organization"}';
      const customAudience = "m2m-audience";

      const response = await client.jwtTemplates.set({
        project_slug: b2bProjectSlug,
        environment_slug: environmentSlug,
        jwt_template_type: "M2M",
        template_content: templateContent,
        custom_audience: customAudience,
      });

      expect(response.jwt_template.template_content).toBe(templateContent);
      expect(response.jwt_template.custom_audience).toBe(customAudience);
      expect(response.jwt_template.jwt_template_type).toBe("M2M");
    });
  });
});
