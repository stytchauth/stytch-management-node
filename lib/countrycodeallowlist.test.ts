import { ManagementClient } from "./client";
import { ClientConfig } from "./shared/client";

const WORKSPACE_KEY_ID = process.env.STYTCH_WORKSPACE_KEY_ID;
const WORKSPACE_KEY_SECRET = process.env.STYTCH_WORKSPACE_KEY_SECRET;

const shouldRunIntegrationTests = WORKSPACE_KEY_ID && WORKSPACE_KEY_SECRET;
const describeIf = shouldRunIntegrationTests ? describe : describe.skip;

describeIf("CountryCodeAllowlist Integration Tests", () => {
  let client: ManagementClient;
  let b2bProjectSlug: string;
  let consumerProjectSlug: string;
  let b2bEnvironmentSlug: string;
  let consumerEnvironmentSlug: string;

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

    await client.environments.create({
      project_slug: b2bProjectSlug,
      name: "test",
      type: "TEST",
      environment_slug: "test",
    });

    const b2bEnvsResp = await client.environments.getAll({
      project_slug: b2bProjectSlug,
    });
    const b2bTestEnv = b2bEnvsResp.environments.find((e) => e.type === "TEST");
    b2bEnvironmentSlug = b2bTestEnv!.environment_slug;

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

    const consumerEnvsResp = await client.environments.getAll({
      project_slug: consumerProjectSlug,
    });
    const consumerTestEnv = consumerEnvsResp.environments.find(
      (e) => e.type === "TEST"
    );
    consumerEnvironmentSlug = consumerTestEnv!.environment_slug;
  });

  afterAll(async () => {
    if (b2bProjectSlug) {
      await client.projects.delete({ project_slug: b2bProjectSlug });
    }
    if (consumerProjectSlug) {
      await client.projects.delete({ project_slug: consumerProjectSlug });
    }
  });

  describe("GetAllowedSMSCountryCodes", () => {
    it("should get default country codes", async () => {
      const expected = ["CA", "US"];

      const response =
        await client.countryCodeAllowlist.getAllowedSMSCountryCodes({
          project_slug: b2bProjectSlug,
          environment_slug: b2bEnvironmentSlug,
        });

      expect(response.country_codes).toEqual(expected);
    });

    it("should get country codes after setting", async () => {
      const expected = ["CA", "MX", "US"];

      await client.countryCodeAllowlist.setAllowedSMSCountryCodes({
        project_slug: consumerProjectSlug,
        environment_slug: consumerEnvironmentSlug,
        country_codes: expected,
      });

      const response =
        await client.countryCodeAllowlist.getAllowedSMSCountryCodes({
          project_slug: consumerProjectSlug,
          environment_slug: consumerEnvironmentSlug,
        });

      expect(response.country_codes).toEqual(expected);
    });

    it("should fail when project does not exist", async () => {
      await expect(
        client.countryCodeAllowlist.getAllowedSMSCountryCodes({
          project_slug: "project-does-not-exist",
          environment_slug: "test",
        })
      ).rejects.toThrow();
    });
  });

  describe("GetAllowedWhatsAppCountryCodes", () => {
    it("should get default country codes", async () => {
      const expected = ["CA", "US"];

      const response =
        await client.countryCodeAllowlist.getAllowedWhatsAppCountryCodes({
          project_slug: consumerProjectSlug,
          environment_slug: consumerEnvironmentSlug,
        });

      expect(response.country_codes).toEqual(expected);
    });

    it("should get country codes after setting", async () => {
      const expected = ["CA", "MX", "US"];

      await client.countryCodeAllowlist.setAllowedWhatsAppCountryCodes({
        project_slug: consumerProjectSlug,
        environment_slug: consumerEnvironmentSlug,
        country_codes: expected,
      });

      const response =
        await client.countryCodeAllowlist.getAllowedWhatsAppCountryCodes({
          project_slug: consumerProjectSlug,
          environment_slug: consumerEnvironmentSlug,
        });

      expect(response.country_codes).toEqual(expected);
    });

    it("should fail for B2B WhatsApp not supported", async () => {
      await expect(
        client.countryCodeAllowlist.getAllowedWhatsAppCountryCodes({
          project_slug: b2bProjectSlug,
          environment_slug: b2bEnvironmentSlug,
        })
      ).rejects.toThrow();
    });

    it("should fail when project does not exist", async () => {
      await expect(
        client.countryCodeAllowlist.getAllowedWhatsAppCountryCodes({
          project_slug: "project-does-not-exist",
          environment_slug: "test",
        })
      ).rejects.toThrow();
    });
  });

  describe("SetAllowedSMSCountryCodes", () => {
    it("should set country codes", async () => {
      const expected = ["CA", "MX", "US"];

      const setResp =
        await client.countryCodeAllowlist.setAllowedSMSCountryCodes({
          project_slug: consumerProjectSlug,
          environment_slug: consumerEnvironmentSlug,
          country_codes: expected,
        });

      expect(setResp.country_codes).toEqual(expected);

      const getResp =
        await client.countryCodeAllowlist.getAllowedSMSCountryCodes({
          project_slug: consumerProjectSlug,
          environment_slug: consumerEnvironmentSlug,
        });

      expect(getResp.country_codes).toEqual(expected);
    });

    it("should fail when project does not exist", async () => {
      await expect(
        client.countryCodeAllowlist.setAllowedSMSCountryCodes({
          project_slug: "project-does-not-exist",
          environment_slug: "test",
          country_codes: ["CA", "MX", "US"],
        })
      ).rejects.toThrow();
    });
  });

  describe("SetAllowedWhatsAppCountryCodes", () => {
    it("should set country codes", async () => {
      const expected = ["CA", "MX", "US"];

      const setResp =
        await client.countryCodeAllowlist.setAllowedWhatsAppCountryCodes({
          project_slug: consumerProjectSlug,
          environment_slug: consumerEnvironmentSlug,
          country_codes: expected,
        });

      expect(setResp.country_codes).toEqual(expected);

      const getResp =
        await client.countryCodeAllowlist.getAllowedWhatsAppCountryCodes({
          project_slug: consumerProjectSlug,
          environment_slug: consumerEnvironmentSlug,
        });

      expect(getResp.country_codes).toEqual(expected);
    });

    it("should fail for B2B WhatsApp not supported", async () => {
      await expect(
        client.countryCodeAllowlist.setAllowedWhatsAppCountryCodes({
          project_slug: b2bProjectSlug,
          environment_slug: b2bEnvironmentSlug,
          country_codes: ["CA", "MX", "US"],
        })
      ).rejects.toThrow();
    });

    it("should fail when project does not exist", async () => {
      await expect(
        client.countryCodeAllowlist.setAllowedWhatsAppCountryCodes({
          project_slug: "project-does-not-exist",
          environment_slug: "test",
          country_codes: ["CA", "MX", "US"],
        })
      ).rejects.toThrow();
    });
  });
});
