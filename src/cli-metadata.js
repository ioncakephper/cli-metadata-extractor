import { readFileSync, promises as fsPromises } from 'fs';

export default getCliMetadata;

/**
 * @typedef {object} CliMetadata
 * @property {string} name - The name of the CLI.
 * @property {string} version - The version of the CLI.
 * @property {string} description - The description of the CLI.
 */

/**
 * Populates a metadata object from a parsed package.json object and fallbacks.
 * @param {object} packageJson - The parsed package.json object.
 * @param {object} fallbacks - An object containing fallback values.
 * @returns {CliMetadata} An object containing the CLI's name, version, and description.
 * @private
 */
function _getMetadataFromPackage(packageJson, fallbacks) {
  return {
    name: _getCliName(packageJson) || fallbacks.name || "unknown-cli",
    version: _getCliVersion(packageJson) || fallbacks.version || "0.0.0",
    description:
      _getCliDescription(packageJson) ||
      fallbacks.description ||
      "No description available.",
  };
}

/**
 * Asynchronously retrieves CLI metadata (name, version, description) from a package.json file.
 * If the package.json cannot be loaded or specific fields are missing/invalid,
 * it falls back to provided default values or generic placeholders.
 *
 * @param {string} packagePath - The path to the package.json file to be imported.
 * @param {object} [fallbackValues={}] - An object containing fallback values for name, version, and description.
 * @returns {Promise<CliMetadata>} An object containing the CLI's name, version, and description.
 */
async function getCliMetadata(packagePath, fallbackValues = {}) {
  const fallbacks = fallbackValues || {};
  try {
    const packageJsonString = await fsPromises.readFile(packagePath, 'utf8');
    const packageJson = JSON.parse(packageJsonString);
    return _getMetadataFromPackage(packageJson, fallbacks);
  } catch (error) {
    return {
      name: fallbacks.name || "unknown-cli",
      version: fallbacks.version || "0.0.0",
      description: fallbacks.description || "No description available.",
    };
  }
}

/**
 * Synchronously retrieves CLI metadata (name, version, description) from a package.json file.
 * If the package.json cannot be read or specific fields are missing/invalid,
 * it falls back to provided default values or generic placeholders.
 *
 * @param {string} packagePath - The path to the package.json file.
 * @param {object} [fallbackValues={}] - An object containing fallback values for name, version, and description.
 * @returns {CliMetadata} An object containing the CLI's name, version, and description.
 * @example
 * // Basic synchronous usage
 * const metadata = getCliMetadataSync('./package.json');
 * console.log(metadata.name); // e.g., "my-cli"
 */
export function getCliMetadataSync(packagePath, fallbackValues = {}) {
  const fallbacks = fallbackValues || {};
  try {
    const packageJsonString = readFileSync(packagePath, 'utf8');
    const packageJson = JSON.parse(packageJsonString);
    return _getMetadataFromPackage(packageJson, fallbacks);
  } catch (error) {
    return {
      name: fallbacks.name || "unknown-cli",
      version: fallbacks.version || "0.0.0",
      description: fallbacks.description || "No description available.",
    };
  }
}

function _getCliName(packageJson) {
  const isCliNameValid = (name) => {
    return /^[a-z0-9-_]+$/.test(name);
  };
  const slugify = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-_]/g, "");
  };
  const { name, bin } = packageJson;

  // Prioritize 'bin' object keys
  if (typeof bin === "object" && bin !== null) {
    const firstKey = Object.keys(bin)[0];
    if (firstKey) { // Check if a key exists
      const slugifiedKey = slugify(firstKey);
      if (isCliNameValid(slugifiedKey)) {
        return slugifiedKey;
      }
    }
  }
  // Then 'bin' string
  if (typeof bin === "string") {
    const slugifiedBin = slugify(bin);
    if (isCliNameValid(slugifiedBin)) {
      return slugifiedBin;
    }
  }

  // Finally, 'name' field
  if (typeof name === "string") {
    const slugifiedName = slugify(name);
    if (isCliNameValid(slugifiedName)) {
      return slugifiedName;
    }
  }
  return undefined; // If no valid name is found after all checks
}

function _getCliVersion(packageJson) {
  const { version } = packageJson;
  if (typeof version === "string") {
    if (/^\d+\.\d+\.\d+(-[\w\d-.]+)?$/.test(version)) {
      return version;
    }
  }
}

function _getCliDescription(packageJson) {
  const { description } = packageJson;
  if (typeof description === "string" && description.trim().length > 0) {
    return description;
  }
}
