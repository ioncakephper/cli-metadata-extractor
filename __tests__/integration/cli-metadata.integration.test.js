import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const execPromise = promisify(exec);

// Get __dirname equivalent in ES modules
const mockCliAsyncPath = path.join(process.cwd(), '__tests__', 'integration', 'mock-cli-async', 'index.js');
const mockCliSyncPath = path.join(process.cwd(), '__tests__', 'integration', 'mock-cli-sync', 'index.js');

describe('CLI Metadata Integration', () => {
  const expectedAsyncName = 'mock-async-cli';
  const expectedAsyncVersion = '1.0.0';
  const expectedAsyncDescription = 'A mock asynchronous CLI for testing purposes.';

  const expectedSyncName = 'mock-sync-cli';
  const expectedSyncVersion = '1.0.0';
  const expectedSyncDescription = 'A mock synchronous CLI for testing purposes.';

  // Test async CLI
  describe('Async CLI', () => {
    test('should display version info correctly', async () => {
      const { stdout } = await execPromise(`node "${mockCliAsyncPath}" --version`);
      expect(stdout).toContain(expectedAsyncVersion);
    });

    test('should display help info correctly with name and description', async () => {
      const { stdout } = await execPromise(`node "${mockCliAsyncPath}" -h`);
      expect(stdout).toContain(expectedAsyncName);
      expect(stdout).toContain(expectedAsyncDescription);
    });
  });

  // Test sync CLI
  describe('Sync CLI', () => {
    test('should display version info correctly', async () => {
      const { stdout } = await execPromise(`node "${mockCliSyncPath}" --version`);
      expect(stdout).toContain(expectedSyncVersion);
    });

    test('should display help info correctly with name and description', async () => {
      const { stdout } = await execPromise(`node "${mockCliSyncPath}" -h`);
      expect(stdout).toContain(expectedSyncName);
      expect(stdout).toContain(expectedSyncDescription);
    });
  });
});
