# Development Guide

This document provides information for developers working on the Stytch Management Node.js SDK.

## Prerequisites

- Node.js 18 or later
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Building

The SDK is written in TypeScript and transpiled to CommonJS JavaScript.

```bash
npm run build
```

This will:
1. Remove previous build artifacts (`dist/` and `types/`)
2. Transpile TypeScript to JavaScript using Babel (`dist/`)
3. Generate TypeScript type definitions (`types/`)

## Code Generation

This SDK is partially code-generated from protocol buffer definitions. The core HTTP client code in `lib/shared/` is hand-written, while resource clients and types are generated.

To regenerate the SDK from the latest proto definitions:

```bash
# From the sdk-codegen repository
make gen-pwa-node
```

**Warning:** This will overwrite generated files. Manual changes should only be made within `MANUAL()` sections.

## Testing

### Unit Tests

```bash
npm test
```

### Integration Tests

Integration tests require valid Management API credentials:

```bash
export STYTCH_WORKSPACE_KEY_ID=your_key_id
export STYTCH_WORKSPACE_KEY_SECRET=your_key_secret
npm test
```

**Warning:** Integration tests will create and delete real resources in your Stytch workspace.

## Linting and Formatting

### Check formatting:

```bash
npm run check-format
```

### Auto-fix formatting:

```bash
npm run format
```

### Lint code:

```bash
npm run lint
```

## Project Structure

```
stytch-management-node/
├── lib/                          # Source code
│   ├── shared/                   # Hand-written core client code
│   │   ├── client.ts            # Base management client
│   │   ├── errors.ts            # Error types
│   │   ├── index.ts             # HTTP request utilities
│   │   └── base64.ts            # Base64 encoding utility
│   ├── client.ts                # Generated: Main ManagementClient class
│   ├── index.ts                 # Generated: Main entrypoint with exports
│   ├── projects.ts              # Generated: Projects resource client
│   ├── environments.ts          # Generated: Environments resource client
│   └── ...                      # Generated: Other resource clients
├── dist/                        # Transpiled JavaScript (gitignored)
├── types/                       # TypeScript declarations (gitignored)
├── package.json                 # Package configuration
├── tsconfig.json                # TypeScript configuration
├── babel.config.json            # Babel configuration
└── jest.config.js               # Jest test configuration
```

## Publishing

Publishing is handled by CI/CD. To publish a new version:

1. Update the version in `package.json`
2. Create a git tag matching the version
3. Push the tag to trigger the publish workflow

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linters
4. Submit a pull request

## Notes

- The SDK uses Basic Authentication with workspace key ID and secret
- All API calls return Promises
- TypeScript types are exported as namespaces to avoid naming conflicts
- Error responses are thrown as `ManagementStytchError` instances
