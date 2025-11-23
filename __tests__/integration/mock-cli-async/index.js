#!/usr/bin/env node

import { Command } from 'commander';
import getCliMetadata from '../../../src/cli-metadata.js'; // Adjust path as necessary
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJsonPath = path.join(__dirname, 'package.json');

async function main() {
  const asyncFallbackValues = {
    name: 'default-async-cli',
    version: '0.0.0',
    description: 'Default description for async CLI',
  };
  const metadata = await getCliMetadata(packageJsonPath, asyncFallbackValues);


  const program = new Command();

  program
    .name(metadata.name)
    .description(metadata.description)
    .version(metadata.version);

  program.command('hello')
    .description('Say hello asynchronously')
    .action(() => {
      console.log('Hello from async CLI!');
    });

  program.parse(process.argv);
}

main();