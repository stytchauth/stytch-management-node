import { ManagementClient } from "./client";
import { ClientConfig } from "./shared/client";
import { ClientError } from "./shared/errors";

describe("Path Parameter Validation", () => {
  let client: ManagementClient;

  beforeAll(() => {
    const config: ClientConfig = {
      workspace_key_id: "test-key-id",
      workspace_key_secret: "test-secret",
    };
    client = new ManagementClient(config);
  });

  describe("Projects", () => {
    it("should throw error when project_slug is empty in get()", async () => {
      await expect(client.projects.get({ project_slug: "" })).rejects.toThrow(
        ClientError
      );

      await expect(client.projects.get({ project_slug: "" })).rejects.toThrow(
        "project_slug cannot be empty"
      );
    });

    it("should throw error when project_slug is empty in delete()", async () => {
      await expect(
        client.projects.delete({ project_slug: "" })
      ).rejects.toThrow(ClientError);

      await expect(
        client.projects.delete({ project_slug: "" })
      ).rejects.toThrow("project_slug cannot be empty");
    });

    it("should throw error when project_slug is empty in update()", async () => {
      await expect(
        client.projects.update({ project_slug: "", name: "Test" })
      ).rejects.toThrow(ClientError);

      await expect(
        client.projects.update({ project_slug: "", name: "Test" })
      ).rejects.toThrow("project_slug cannot be empty");
    });
  });

  describe("Secrets", () => {
    it("should throw error when project_slug is empty in create()", async () => {
      await expect(
        client.secrets.create({
          project_slug: "",
          environment_slug: "test-env",
        })
      ).rejects.toThrow(ClientError);

      await expect(
        client.secrets.create({
          project_slug: "",
          environment_slug: "test-env",
        })
      ).rejects.toThrow("project_slug cannot be empty");
    });

    it("should throw error when environment_slug is empty in create()", async () => {
      await expect(
        client.secrets.create({
          project_slug: "test-project",
          environment_slug: "",
        })
      ).rejects.toThrow(ClientError);

      await expect(
        client.secrets.create({
          project_slug: "test-project",
          environment_slug: "",
        })
      ).rejects.toThrow("environment_slug cannot be empty");
    });
  });

  describe("Environments", () => {
    it("should throw error when project_slug is empty in getAll()", async () => {
      await expect(
        client.environments.getAll({ project_slug: "" })
      ).rejects.toThrow(ClientError);

      await expect(
        client.environments.getAll({ project_slug: "" })
      ).rejects.toThrow("project_slug cannot be empty");
    });

    it("should throw error when both path params are empty in get()", async () => {
      await expect(
        client.environments.get({
          project_slug: "",
          environment_slug: "test",
        })
      ).rejects.toThrow(ClientError);

      await expect(
        client.environments.get({
          project_slug: "test",
          environment_slug: "",
        })
      ).rejects.toThrow(ClientError);
    });
  });
});
