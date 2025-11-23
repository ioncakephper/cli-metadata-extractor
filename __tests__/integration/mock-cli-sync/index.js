#!/usr/bin/env node

import { Command } from 'commander';
import { getCliMetadataSync } from '../../../src/cli-metadata.js'; // Adjust path as necessary
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJsonPath = path.join(__dirname, 'package.json');

function main() {
  const metadata = getCliMetadataSync(packageJsonPath, {
    name: 'default-sync-cli',
    version: '0.0.0',
    description: 'Default description for sync CLI',
  });

  const program = new Command();

  program
    .name(metadata.name)
    .description(metadata.description)
    .version(metadata.version);

  program.command('hello')
    .description('Say hello synchronously')
    .action(() => {
      console.log('Hello from sync CLI!');
    });

  program.parse(process.argv);
}

main();
