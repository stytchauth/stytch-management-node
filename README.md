# Stytch Management Node.js Library

The Stytch Management Node.js library makes it easy to use Stytch's Programmatic Workspace Actions API in Node.js applications.

This library requires Node.js 18 or later.

> [!WARNING]
> This SDK is currently in alpha with potential breaking changes. Use with caution in production environments.

## Install

```bash
npm install stytch-management-node
```

## Pre-requisites

You need your Stytch Management API credentials from the workspace management section of your
[Stytch Dashboard](https://stytch.com/dashboard/settings/management-api).

**Note:** These credentials allow you to perform read and write actions on your workspace,
potentially modifying or deleting important Stytch resources like projects, environments, or secrets.

## Usage

This library supports project- and environment-level actions on the following resources:

- [x] Projects
- [x] Environments
- [x] Country Code Allowlists
- [x] Email Templates
  - [x] Default Email Templates
- [x] Environment Metrics
- [x] Event Log Streaming
- [x] JWT Templates
- [x] Password Strength Configuration
- [x] Public Tokens
- [x] RBAC Policies (B2B & Consumer)
- [x] Redirect URLs
- [x] SDK Configuration (B2B & Consumer)
- [x] Secrets
- [x] Trusted Token Profiles
  - [x] PEM Files

## Examples

### Create a new API client:

```typescript
import { ManagementClient, ClientConfig } from 'stytch-management-node';

// Set your Stytch Management API credentials.
const config: ClientConfig = {
  workspace_key_id: process.env.STYTCH_WORKSPACE_KEY_ID!,
  workspace_key_secret: process.env.STYTCH_WORKSPACE_KEY_SECRET!,
};

const client = new ManagementClient(config);
```

### Create a new B2B project:

```typescript
import { projects } from 'stytch-management-node';

const response = await client.projects.create({
  name: "My new project",
  vertical: "B2B" as projects.Vertical,
});

const newProject = response.project;
console.log(`Created project: ${newProject.projectSlug}`);
```

### Get the live environment in the new project:

```typescript
import { environments } from 'stytch-management-node';

const response = await client.environments.getAll({
  projectSlug: newProject.projectSlug,
});

const liveEnv = response.environments.find(
  (env) => env.type === "LIVE" as environments.EnvironmentType
);
console.log(`Live environment: ${liveEnv?.environmentSlug}`);
```

### Alternatively, create a new custom environment:

```typescript
const response = await client.environments.create({
  projectSlug: newProject.projectSlug,
  name: "My custom environment",
  type: "TEST" as environments.EnvironmentType,
});

const customEnv = response.environment;
console.log(`Created environment: ${customEnv.environmentSlug}`);
```

### Create a new secret in the live environment:

```typescript
const response = await client.secrets.create({
  projectSlug: newProject.projectSlug,
  environmentSlug: liveEnv.environmentSlug,
});

const secret = response.secret;
console.log(`Created secret: ${secret.secretID}`);
```

### Get SDK configuration:

```typescript
const response = await client.sdk.getConsumerConfig({
  projectSlug: newProject.projectSlug,
  environmentSlug: liveEnv.environmentSlug,
});

console.log('Consumer SDK config:', response.config);
```

## Type Safety

All request and response types are fully typed. Import them from the specific resource namespaces:

```typescript
import { projects, environments, secrets } from 'stytch-management-node';

// Use typed requests
const createRequest: projects.CreateRequest = {
  name: "My project",
  vertical: "B2B",
};

// Responses are also typed
const response: projects.CreateResponse = await client.projects.create(createRequest);
```

## Error Handling

```typescript
import { ManagementStytchError } from 'stytch-management-node';

try {
  await client.projects.get({ projectSlug: "invalid-slug" });
} catch (error) {
  if (error instanceof ManagementStytchError) {
    console.error(`Stytch error: ${error.error_type}`);
    console.error(`Message: ${error.error_message}`);
    console.error(`Request ID: ${error.request_id}`);
  }
  throw error;
}
```

## Running Tests

This library includes comprehensive integration tests that verify functionality against the Stytch API. These tests create and clean up disposable projects and resources.

### Prerequisites

To run the tests, you need valid Stytch Management API credentials:

```bash
export STYTCH_WORKSPACE_KEY_ID="your-workspace-key-id"
export STYTCH_WORKSPACE_KEY_SECRET="your-workspace-key-secret"
```

**Important:** Tests will be skipped if these environment variables are not set. The tests create real resources in your workspace but clean them up automatically.

### Running All Tests

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests with verbose output
npm test -- --verbose
```

### Running Specific Test Files

```bash
# Run a specific test file
npm test -- lib/projects.test.ts

# Run tests matching a pattern
npm test -- --testNamePattern="Secrets"
```

### Test Coverage

The test suite includes integration tests for:

- **Email Templates** - Create, get, update, delete, and default management
- **Environments** - Environment lifecycle with user locking and IDP configurations
- **Secrets** - Secret creation, retrieval, and deletion
- **Public Tokens** - Public token management
- **JWT Templates** - Session and M2M JWT template configuration
- **Redirect URLs** - URL validation and type management
- **Password Strength Config** - LUDS and ZXCVBN policy configuration
- **Country Code Allowlist** - SMS and WhatsApp country code management

Each test suite:
- ✓ Creates disposable projects/environments
- ✓ Tests all CRUD operations
- ✓ Validates error handling
- ✓ Cleans up all resources automatically
- ✓ Runs independently without side effects

### Test Output

Tests use Jest and provide detailed output:

```
PASS lib/secrets.test.ts
  Secrets Integration Tests
    Create
      ✓ should create secret (234ms)
    Get
      ✓ should get existing secret (156ms)
      ✓ should fail when secret does not exist (89ms)
    GetAll
      ✓ should get all secrets (445ms)
    Delete
      ✓ should delete existing secret (178ms)
```

### Continuous Integration

Tests are designed to run in CI environments. Set the environment variables in your CI configuration:

```yaml
# Example GitHub Actions
env:
  STYTCH_WORKSPACE_KEY_ID: ${{ secrets.STYTCH_WORKSPACE_KEY_ID }}
  STYTCH_WORKSPACE_KEY_SECRET: ${{ secrets.STYTCH_WORKSPACE_KEY_SECRET }}
```

## Development

See [DEVELOPMENT.md](./DEVELOPMENT.md) for information on building and testing the SDK.

## Support

If you have questions or need help, please contact [support@stytch.com](mailto:support@stytch.com).

## License

MIT
