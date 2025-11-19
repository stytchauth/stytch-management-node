import { ManagementClient } from "./client";
import { ClientConfig } from "./shared/client";

// These are integration tests that require real API credentials.
// They are skipped by default and only run when credentials are provided.
const WORKSPACE_KEY_ID = process.env.STYTCH_WORKSPACE_KEY_ID;
const WORKSPACE_KEY_SECRET = process.env.STYTCH_WORKSPACE_KEY_SECRET;

const shouldRunIntegrationTests = WORKSPACE_KEY_ID && WORKSPACE_KEY_SECRET;

const describeIf = shouldRunIntegrationTests ? describe : describe.skip;

describeIf("Projects Integration Tests", () => {
  let client: ManagementClient;

  beforeAll(() => {
    const config: ClientConfig = {
      workspace_key_id: WORKSPACE_KEY_ID!,
      workspace_key_secret: WORKSPACE_KEY_SECRET!,
    };
    client = new ManagementClient(config);
  });

  it("should list all projects", async () => {
    const response = await client.projects.getAll();

    expect(response).toHaveProperty("request_id");
    expect(response).toHaveProperty("projects");
    expect(Array.isArray(response.projects)).toBe(true);
  });

  it("should create, get, update, and delete a project", async () => {
    // Create
    const createResponse = await client.projects.create({
      name: `Test Project ${Date.now()}`,
      vertical: "B2B",
    });

    expect(createResponse.project).toBeDefined();
    const project_slug = createResponse.project.project_slug;
    expect(project_slug).toBeDefined();

    try {
      // Get
      const getResponse = await client.projects.get({ project_slug });
      expect(getResponse.project.project_slug).toBe(project_slug);
      expect(getResponse.project.name).toBe(createResponse.project.name);

      // Update
      const updatedName = `Updated Test Project ${Date.now()}`;
      const updateResponse = await client.projects.update({
        project_slug,
        name: updatedName,
      });
      expect(updateResponse.project.name).toBe(updatedName);
    } finally {
      // Delete
      await client.projects.delete({ project_slug });

      // Verify deletion
      await expect(client.projects.get({ project_slug })).rejects.toThrow();
    }
  });
});
