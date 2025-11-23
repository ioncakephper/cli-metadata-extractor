import getCliMetadata, { getCliMetadataSync } from "../../src/cli-metadata";
import { readFileSync, promises as fsPromises } from 'fs';

jest.mock('fs', () => ({
  ...jest.requireActual('fs'), // import and retain all actual 'fs' methods
  promises: {
    ...jest.requireActual('fs').promises,
    readFile: jest.fn(),
  },
  readFileSync: jest.fn(),
}));

// --- Mocks for fsPromises.readFile (Async Tests) ---
const mockAsyncPackageJsons = {
  "path/to/package.json": JSON.stringify({
    name: "mock-cli",
    version: "1.0.0",
    description: "A mock CLI for testing.",
  }),
  "path/to/package-with-slug-name.json": JSON.stringify({
    name: "My CLI App",
    version: "1.0.0",
  }),
  "path/to/package-with-bin-name.json": JSON.stringify({
    name: "my-app",
    version: "1.0.0",
    bin: { "my-cli-from-bin": "./index.js" }
  }),
  "path/to/package-with-invalid-version.json": JSON.stringify({
    name: "mock-cli",
    version: "invalid",
  }),
  "path/to/package-with-empty-description.json": JSON.stringify({
    name: "mock-cli",
    version: "1.0.0",
    description: "   ",
  }),
};

// --- Mocks for fs.readFileSync (Sync Tests) ---
const mockSyncPackageJsons = {
    "path/to/sync-package.json": JSON.stringify({
        name: "mock-cli-sync",
        version: "1.0.0",
        description: "A mock CLI for sync testing.",
    }),
    "path/to/sync-slug.json": JSON.stringify({ name: "My Sync App" }),
    "path/to/sync-bin.json": JSON.stringify({ name: "my-app", bin: { "my-sync-cli": "./index.js" } }),
    "path/to/sync-version.json": JSON.stringify({ name: "my-app", version: "not-semver" }),
    "path/to/sync-desc.json": JSON.stringify({ name: "my-app", version: "1.0.0", description: " " }),
};


// --- Main Test Suite ---

describe("getCliMetadata", () => {
  beforeEach(() => {
    fsPromises.readFile.mockImplementation(async (path) => {
      if (mockAsyncPackageJsons[path]) {
        return mockAsyncPackageJsons[path];
      }
      throw new Error(`ENOENT: no such file or directory, open '${path}'`);
    });
  });

  afterEach(() => {
    fsPromises.readFile.mockClear();
  });

  test("should return metadata from package.json", async () => {
    const metadata = await getCliMetadata("path/to/package.json");
    expect(fsPromises.readFile).toHaveBeenCalledWith("path/to/package.json", 'utf8');
    expect(metadata).toEqual({
      name: "mock-cli",
      version: "1.0.0",
      description: "A mock CLI for testing.",
    });
  });

  test("should use fallbacks if package.json cannot be loaded", async () => {
    const metadata = await getCliMetadata("non-existent-path", {
      name: "fallback-cli",
    });
    expect(metadata).toEqual({
      name: "fallback-cli",
      version: "0.0.0",
      description: "No description available.",
    });
  });

  test("should correctly slugify the name", async () => {
    const metadata = await getCliMetadata("path/to/package-with-slug-name.json");
    expect(metadata.name).toBe("my-cli-app");
  });

  test("should prioritize the bin field for the name", async () => {
    const metadata = await getCliMetadata("path/to/package-with-bin-name.json");
    expect(metadata.name).toBe("my-cli-from-bin");
  });

  test("should fall back to default version if version is invalid", async () => {
    const metadata = await getCliMetadata("path/to/package-with-invalid-version.json");
    expect(metadata.version).toBe("0.0.0");
  });

  test("should fall back to default description if description is empty", async () => {
    const metadata = await getCliMetadata("path/to/package-with-empty-description.json");
    expect(metadata.description).toBe("No description available.");
  });
});

describe("getCliMetadataSync", () => {
    beforeEach(() => {
        readFileSync.mockImplementation((path) => {
            if (mockSyncPackageJsons[path]) {
                return mockSyncPackageJsons[path];
            }
            throw new Error(`ENOENT: no such file or directory, open '${path}'`);
        });
    });

    afterEach(() => {
        readFileSync.mockClear();
    });

  test("should return metadata from package.json", () => {
    const metadata = getCliMetadataSync("path/to/sync-package.json");
    expect(readFileSync).toHaveBeenCalledWith("path/to/sync-package.json", 'utf8');
    expect(metadata).toEqual({
      name: "mock-cli-sync",
      version: "1.0.0",
      description: "A mock CLI for sync testing.",
    });
  });

  test("should use fallbacks if file read fails", () => {
    const metadata = getCliMetadataSync("non-existent-path.json", {
      name: "fallback-name",
    });
    expect(metadata).toEqual({
      name: "fallback-name",
      version: "0.0.0",
      description: "No description available.",
    });
  });

  test("should correctly slugify the name", () => {
    const metadata = getCliMetadataSync("path/to/sync-slug.json");
    expect(metadata.name).toBe("my-sync-app");
  });

  test("should prioritize the bin field for the name", () => {
    const metadata = getCliMetadataSync("path/to/sync-bin.json");
    expect(metadata.name).toBe("my-sync-cli");
  });

  test("should fall back to default version if version is invalid", () => {
    const metadata = getCliMetadataSync("path/to/sync-version.json");
    expect(metadata.version).toBe("0.0.0");
  });

  test("should fall back to default description if description is empty", () => {
    const metadata = getCliMetadataSync("path/to/sync-desc.json");
    expect(metadata.description).toBe("No description available.");
  });
});
