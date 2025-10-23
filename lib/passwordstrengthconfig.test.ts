import { ManagementClient } from "./client";
import { ClientConfig } from "./shared/client";

const WORKSPACE_KEY_ID = process.env.STYTCH_WORKSPACE_KEY_ID;
const WORKSPACE_KEY_SECRET = process.env.STYTCH_WORKSPACE_KEY_SECRET;

const shouldRunIntegrationTests = WORKSPACE_KEY_ID && WORKSPACE_KEY_SECRET;
const describeIf = shouldRunIntegrationTests ? describe : describe.skip;

describeIf("PasswordStrengthConfig Integration Tests", () => {
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
      name: "Disposable Consumer Project",
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

  describe("Get", () => {
    it("should get password strength config", async () => {
      const response = await client.passwordStrengthConfig.get({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
      });

      expect(response.request_id).toBeDefined();
      expect(response.password_strength_config.validation_policy).toBeDefined();
    });
  });

  describe("Set", () => {
    it("should set password strength config with LUDS policy", async () => {
      const response = await client.passwordStrengthConfig.set({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        check_breach_on_creation: true,
        check_breach_on_authentication: true,
        validate_on_authentication: true,
        validation_policy: "LUDS",
        luds_min_password_length: 10,
        luds_min_password_complexity: 3,
      });

      expect(response.password_strength_config.check_breach_on_creation).toBe(
        true
      );
      expect(
        response.password_strength_config.check_breach_on_authentication
      ).toBe(true);
      expect(response.password_strength_config.validate_on_authentication).toBe(
        true
      );
      expect(response.password_strength_config.validation_policy).toBe("LUDS");
      expect(response.password_strength_config.luds_min_password_length).toBe(
        10
      );
      expect(
        response.password_strength_config.luds_min_password_complexity
      ).toBe(3);
    });

    it("should set password strength config with ZXCVBN policy", async () => {
      const response = await client.passwordStrengthConfig.set({
        project_slug: projectSlug,
        environment_slug: environmentSlug,
        check_breach_on_creation: false,
        check_breach_on_authentication: false,
        validate_on_authentication: false,
        validation_policy: "ZXCVBN",
      });

      expect(response.password_strength_config.check_breach_on_creation).toBe(
        false
      );
      expect(
        response.password_strength_config.check_breach_on_authentication
      ).toBe(false);
      expect(response.password_strength_config.validate_on_authentication).toBe(
        false
      );
      expect(response.password_strength_config.validation_policy).toBe(
        "ZXCVBN"
      );
    });
  });
});
