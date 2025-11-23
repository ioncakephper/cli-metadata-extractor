# CLI Metadata Extractor

[![npm version](https://img.shields.io/npm/v/cli-metadata-extractor.svg)](https://www.npmjs.com/package/cli-metadata-extractor)
[![Build Status](https://img.shields.io/travis/com/your-username/cli-metadata-extractor.svg)](https://travis-ci.com/your-username/cli-metadata-extractor)
[![License: MIT](https://opensource.org/licenses/MIT)

A robust, zero-dependency utility to extract essential metadata (name, version, description) from a `package.json` file, with smart fallbacks for missing or invalid data. Ideal for scaffolding command-line tools that need to display their own package information.

## Key Features

- **Dual API**: Asynchronously or synchronously extracts metadata to suit your needs.
- **Smart Name Resolution**: Resolves the CLI name from `bin` fields or the `name` field.
- **Resilient Fallbacks**: Gracefully handles missing or invalid `package.json` files, with support for custom fallback values.
- **Name Slugification**: Automatically converts package names with spaces or invalid characters into a valid, kebab-case CLI name.
- **Lightweight & Zero-Dependency**: No external dependencies, keeping your project lean.

## Installation

```bash
npm install cli-metadata-extractor
```

## Usage

The module provides both asynchronous (`getCliMetadata`) and synchronous (`getCliMetadataSync`) functions to retrieve metadata.

### Asynchronous Usage (Recommended)

The async function is recommended for non-blocking I/O.

#### Basic Example
```javascript
import getCliMetadata from 'cli-metadata-extractor';

// Note: Using a relative path like './package.json' can be fragile.
// It's safer to construct an absolute path, as shown in the advanced example below.
const metadata = await getCliMetadata('./package.json', {
  name: 'my-default-cli',
  version: '1.0.0',
});

console.log(`
  Name: ${metadata.name}
  Version: ${metadata.version}
  Description: ${metadata.description}
`);
```

#### Advanced Example with `commander`

A common use case is to initialize a CLI program using a library like [commander](https://www.npmjs.com/package/commander). This module makes it easy to keep your `package.json` as the single source of truth. The following example shows how to robustly locate your `package.json` from within your script, regardless of where it's run from.

> **Note**: You'll need to install `commander`: `npm install commander`

```javascript
#!/usr/bin/env node

import { Command } from 'commander';
import getCliMetadata from 'cli-metadata-extractor';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module-safe way to get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define an async main function to use await
async function main() {
  // 1. Robustly locate and get the metadata from package.json
  const packageJsonPath = path.join(__dirname, '../package.json');
  const metadata = await getCliMetadata(packageJsonPath);

  // 2. Create and configure your CLI program
  const program = new Command();
  
  program
    .name(metadata.name)
    .description(metadata.description)
    .version(metadata.version);
    
  // 3. Define your commands
  program.command('hello')
    .description('Say hello')
    .action(() => {
      console.log('Hello, world!');
    });

  // 4. Parse arguments
  await program.parseAsync(process.argv);
}

main();
```

### Synchronous Usage

A sync version is available for cases where async operations are not suitable, such as at the top level of a CommonJS module.

```javascript
// In a CommonJS file (e.g., index.js)
const path = require('path');
const { getCliMetadataSync } = require('cli-metadata-extractor');

// In CommonJS, __dirname is available by default.
const packageJsonPath = path.join(__dirname, 'package.json');
const metadata = getCliMetadataSync(packageJsonPath);

console.log(`The CLI name is: ${metadata.name}`);
```

## TypeScript Usage

This library is fully compatible with TypeScript, with type definitions for static type checking, autocompletion, and enhanced developer experience.

To leverage TypeScript support, ensure you have `typescript` installed in your project.

### Understanding `CliMetadata` Type

The library exports a `CliMetadata` type, generated from JSDoc comments, which defines the structure of the `CliMetadata` object returned by `getCliMetadata` and `getCliMetadataSync`. It includes `name`, `version`, and `description` properties (all strings).

Explicitly importing and using this type (e.g., `metadata: CliMetadata`) enables strong type checking, compile-time error detection, and intelligent autocompletion in your IDE.

```typescript
import { CliMetadata } from 'cli-metadata-extractor';

// Declare a variable with the CliMetadata type
const myCliInfo: CliMetadata = {
  name: "my-app",
  version: "1.0.0",
  description: "My awesome app",
};

// TypeScript will now ensure 'myCliInfo' conforms to CliMetadata
console.log(myCliInfo.name); // 'name' property is known to exist
// console.log(myCliInfo.nonExistent); // This would be a TypeScript error
```

### Asynchronous Example (TypeScript)

```typescript
import getCliMetadata, { CliMetadata } from 'cli-metadata-extractor';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTsCli() {
  try {
    const packageJsonPath = path.join(__dirname, '../package.json');
    // metadata is inferred as CliMetadata type
    const metadata = await getCliMetadata(packageJsonPath);

    const name: string = metadata.name; // Type-checked property access
    const version: string = metadata.version;
    const description: string = metadata.description;

    console.log(`TypeScript Async - Name: ${name}, Version: ${version}, Description: ${description}`);
  } catch (error) {
    console.error('Error in TypeScript Async Example:', error);
  }
}

runTsCli();
```

### Synchronous Example (TypeScript)

```typescript
import { getCliMetadataSync, CliMetadata } from 'cli-metadata-extractor';
import path from 'path';
import { fileURLToPath } from 'url'; // For ES Modules context

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runTsCliSync() {
  try {
    const packageJsonPath = path.join(__dirname, '../package.json');
    // metadata is inferred as CliMetadata type
    const metadata: CliMetadata = getCliMetadataSync(packageJsonPath);

    console.log(`TypeScript Sync - Name: ${metadata.name}, Version: ${metadata.version}`);
    // Example of compile-time error if you try to access a non-existent property:
    // const nonExistent = metadata.nonExistentProperty; // TypeScript will flag this as an error
  } catch (error) {
    console.error('Error in TypeScript Sync Example:', error);
  }
}

runTsCliSync();
```

## API Reference

### `getCliMetadata(packagePath, [fallbackValues])`

Asynchronously retrieves CLI metadata from a `package.json` file.

- **`packagePath`** (string, required): The path to the `package.json` file.
- **`fallbackValues`** (object, optional): An object containing fallback values for `name`, `version`, and `description`.
- **Returns**: `Promise<object>` - An object containing the `name`, `version`, and `description`.

### `getCliMetadataSync(packagePath, [fallbackValues])`

Synchronously retrieves CLI metadata from a `package.json` file.

- **`packagePath`** (string, required): The path to the `package.json` file.
- **`fallbackValues`** (object, optional): An object containing fallback values for `name`, `version`, and `description`.
- **Returns**: `object` - An object containing the `name`, `version`, and `description`.



## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to get started.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.