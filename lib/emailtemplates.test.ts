import { ManagementClient } from "./client";
import { ClientConfig } from "./shared/client";

// These are integration tests that require real API credentials.
// They are skipped by default and only run when credentials are provided.
const WORKSPACE_KEY_ID = process.env.STYTCH_WORKSPACE_KEY_ID;
const WORKSPACE_KEY_SECRET = process.env.STYTCH_WORKSPACE_KEY_SECRET;

const shouldRunIntegrationTests = WORKSPACE_KEY_ID && WORKSPACE_KEY_SECRET;

const describeIf = shouldRunIntegrationTests ? describe : describe.skip;

function randomID(): string {
  return `test-template-${Math.floor(Math.random() * 1000000)}`;
}

describeIf("EmailTemplates Integration Tests", () => {
  let client: ManagementClient;
  let projectSlug: string;

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

    // Create live environment
    await client.environments.create({
      project_slug: projectSlug,
      name: "production",
      type: "LIVE",
      environment_slug: "production",
    });
  });

  afterAll(async () => {
    // Cleanup: delete the project
    if (projectSlug) {
      await client.projects.delete({ project_slug: projectSlug });
    }
  });

  describe("Create", () => {
    it("should create prebuilt template", async () => {
      const templateID = randomID();
      const response = await client.emailTemplates.create({
        project_slug: projectSlug,
        template_id: templateID,
        name: "Test Prebuilt Template",
        sender_information: {
          from_local_part: "noreply",
          from_name: "No Reply",
          reply_to_local_part: "support",
          reply_to_name: "Support Team",
        },
        prebuilt_customization: {
          button_border_radius: 5.0,
          button_color: "#007BFF",
          button_text_color: "#FFFFFF",
          font_family: "ARIAL",
          text_alignment: "CENTER",
        },
      });

      expect(response.email_template.template_id).toBe(templateID);
      expect(response.email_template.name).toBe("Test Prebuilt Template");
      expect(response.email_template.sender_information).toBeDefined();
      expect(response.email_template.prebuilt_customization).toBeDefined();
      expect(response.email_template.custom_html_customization).toBeUndefined();
    });
  });

  describe("Get", () => {
    it("should get existing prebuilt template", async () => {
      const templateID = randomID();

      // Create template first
      const createResp = await client.emailTemplates.create({
        project_slug: projectSlug,
        template_id: templateID,
        name: "Test Prebuilt Template",
        sender_information: {
          from_local_part: "noreply",
          from_name: "No Reply",
          reply_to_local_part: "support",
          reply_to_name: "Support Team",
        },
        prebuilt_customization: {
          button_border_radius: 5.0,
          button_color: "#007BFF",
          button_text_color: "#FFFFFF",
          font_family: "ARIAL",
          text_alignment: "CENTER",
        },
      });

      // Get template
      const response = await client.emailTemplates.get({
        project_slug: projectSlug,
        template_id: templateID,
      });

      expect(response.email_template.template_id).toBe(
        createResp.email_template.template_id
      );
      expect(response.email_template.name).toBe(createResp.email_template.name);
      expect(response.email_template.prebuilt_customization).toBeDefined();
      expect(response.email_template.custom_html_customization).toBeUndefined();
    });

    it("should fail to get non-existent template", async () => {
      await expect(
        client.emailTemplates.get({
          project_slug: projectSlug,
          template_id: "non-existent-template",
        })
      ).rejects.toThrow();
    });

    it("should fail with missing template ID", async () => {
      await expect(
        client.emailTemplates.get({
          project_slug: projectSlug,
          template_id: "",
        })
      ).rejects.toThrow();
    });
  });

  describe("GetAll", () => {
    it("should get all templates", async () => {
      const template1ID = randomID();
      const template2ID = randomID();

      // Create multiple templates
      await client.emailTemplates.create({
        project_slug: projectSlug,
        template_id: template1ID,
        name: "Test Prebuilt Template 1",
        sender_information: {
          from_local_part: "noreply",
          from_name: "No Reply",
        },
        prebuilt_customization: {
          button_border_radius: 5.0,
          button_color: "#007BFF",
          button_text_color: "#FFFFFF",
          font_family: "ARIAL",
          text_alignment: "CENTER",
        },
      });

      await client.emailTemplates.create({
        project_slug: projectSlug,
        template_id: template2ID,
        name: "Test Prebuilt Template 2",
        sender_information: {
          from_local_part: "noreply",
          from_name: "No Reply",
        },
        prebuilt_customization: {
          button_border_radius: 5.0,
          button_color: "#007BFF",
          button_text_color: "#FFFFFF",
          font_family: "ARIAL",
          text_alignment: "CENTER",
        },
      });

      const response = await client.emailTemplates.getAll({
        project_slug: projectSlug,
      });

      expect(response.email_templates.length).toBeGreaterThanOrEqual(2);

      const templateIDs = response.email_templates.map((t) => t.template_id);
      expect(templateIDs).toContain(template1ID);
      expect(templateIDs).toContain(template2ID);
    });
  });

  describe("Update", () => {
    it("should update prebuilt template", async () => {
      const templateID = randomID();

      // Create template first
      await client.emailTemplates.create({
        project_slug: projectSlug,
        template_id: templateID,
        name: "Test Prebuilt Template",
        sender_information: {
          from_local_part: "noreply",
          from_name: "No Reply",
        },
        prebuilt_customization: {
          button_border_radius: 5.0,
          button_color: "#007BFF",
          button_text_color: "#FFFFFF",
          font_family: "ARIAL",
          text_alignment: "CENTER",
        },
      });

      // Update template
      const newName = "Updated Prebuilt Template";
      const response = await client.emailTemplates.update({
        project_slug: projectSlug,
        template_id: templateID,
        name: newName,
        prebuilt_customization: {
          button_border_radius: 10.0,
          button_color: "#FF0000",
          button_text_color: "#000000",
          font_family: "HELVETICA",
          text_alignment: "LEFT",
        },
      });

      expect(response.email_template.template_id).toBe(templateID);
      expect(response.email_template.name).toBe(newName);
      expect(response.email_template.prebuilt_customization).toBeDefined();
      expect(
        response.email_template.prebuilt_customization?.button_border_radius
      ).toBe(10.0);
      expect(response.email_template.custom_html_customization).toBeUndefined();
    });

    it("should fail to update non-existent template", async () => {
      await expect(
        client.emailTemplates.update({
          project_slug: projectSlug,
          template_id: "non-existent-template",
          name: "Non-existent Template",
        })
      ).rejects.toThrow();
    });
  });

  describe("Delete", () => {
    it("should delete existing template", async () => {
      const templateID = randomID();

      // Create template first
      await client.emailTemplates.create({
        project_slug: projectSlug,
        template_id: templateID,
        name: "Test Prebuilt Template",
        sender_information: {
          from_local_part: "noreply",
          from_name: "No Reply",
        },
        prebuilt_customization: {
          button_border_radius: 5.0,
          button_color: "#007BFF",
          button_text_color: "#FFFFFF",
          font_family: "ARIAL",
          text_alignment: "CENTER",
        },
      });

      // Delete template
      const response = await client.emailTemplates.delete({
        project_slug: projectSlug,
        template_id: templateID,
      });

      expect(response).toBeDefined();

      // Verify template is deleted
      await expect(
        client.emailTemplates.get({
          project_slug: projectSlug,
          template_id: templateID,
        })
      ).rejects.toThrow();
    });
  });

  describe("SetDefault", () => {
    it("should set default template", async () => {
      const templateID = randomID();

      // Create template first
      await client.emailTemplates.create({
        project_slug: projectSlug,
        template_id: templateID,
        name: "Test Default Template",
        sender_information: {
          from_local_part: "noreply",
          from_name: "No Reply",
        },
        prebuilt_customization: {
          button_border_radius: 5.0,
          button_color: "#007BFF",
          button_text_color: "#FFFFFF",
          font_family: "ARIAL",
          text_alignment: "CENTER",
        },
      });

      // Set as default
      const response = await client.emailTemplates.setDefault({
        project_slug: projectSlug,
        email_template_type: "PREBUILT",
        template_id: templateID,
      });

      expect(response).toBeDefined();
    });

    it("should fail to set default with non-existent template", async () => {
      await expect(
        client.emailTemplates.setDefault({
          project_slug: projectSlug,
          email_template_type: "LOGIN",
          template_id: "non-existent-template",
        })
      ).rejects.toThrow();
    });
  });

  describe("GetDefault", () => {
    it("should get default template", async () => {
      const templateID = randomID();

      // Create template first
      await client.emailTemplates.create({
        project_slug: projectSlug,
        template_id: templateID,
        name: "Test Default Template",
        sender_information: {
          from_local_part: "noreply",
          from_name: "No Reply",
        },
        prebuilt_customization: {
          button_border_radius: 5.0,
          button_color: "#007BFF",
          button_text_color: "#FFFFFF",
          font_family: "ARIAL",
          text_alignment: "CENTER",
        },
      });

      // Set as default
      await client.emailTemplates.setDefault({
        project_slug: projectSlug,
        email_template_type: "PREBUILT",
        template_id: templateID,
      });

      // Get default
      const response = await client.emailTemplates.getDefault({
        project_slug: projectSlug,
        email_template_type: "PREBUILT",
      });

      expect(response.template_id).toBe(templateID);
    });

    it("should fail to get default for type with no default set", async () => {
      await expect(
        client.emailTemplates.getDefault({
          project_slug: projectSlug,
          email_template_type: "SIGNUP",
        })
      ).rejects.toThrow();
    });
  });

  describe("UnsetDefault", () => {
    it("should fail when unsetting prebuilt template", async () => {
      const templateID = randomID();

      // Create template first
      await client.emailTemplates.create({
        project_slug: projectSlug,
        template_id: templateID,
        name: "Test Default Template",
        sender_information: {
          from_local_part: "noreply",
          from_name: "No Reply",
        },
        prebuilt_customization: {
          button_border_radius: 5.0,
          button_color: "#007BFF",
          button_text_color: "#FFFFFF",
          font_family: "ARIAL",
          text_alignment: "CENTER",
        },
      });

      // Unset default should fail
      await expect(
        client.emailTemplates.unsetDefault({
          project_slug: projectSlug,
          email_template_type: "PREBUILT",
        })
      ).rejects.toThrow();
    });

    it("should succeed when unset default for type with no default set", async () => {
      const response = await client.emailTemplates.unsetDefault({
        project_slug: projectSlug,
        email_template_type: "SIGNUP",
      });

      expect(response).toBeDefined();
    });
  });
});
