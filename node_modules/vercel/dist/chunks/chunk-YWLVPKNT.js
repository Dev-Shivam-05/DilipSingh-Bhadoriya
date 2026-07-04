import { createRequire as __createRequire } from 'node:module';
import { fileURLToPath as __fileURLToPath } from 'node:url';
import { dirname as __dirname_ } from 'node:path';
const require = __createRequire(import.meta.url);
const __filename = __fileURLToPath(import.meta.url);
const __dirname = __dirname_(__filename);
import {
  VERCEL_DIR,
  isVercelTomlEnabled
} from "./chunk-RB7WQKNC.js";
import {
  parseArguments
} from "./chunk-EJ6GQI6F.js";
import {
  ConflictingConfigFiles,
  DeprecatedNowJson,
  InvalidLocalConfig
} from "./chunk-P6AK7SVK.js";

// src/util/config/local-path.ts
import path from "path";
import { existsSync } from "fs";
function getLocalPathConfig(prefix) {
  const argv = parseArguments(process.argv.slice(2), {}, { permissive: true });
  const customPath = argv.flags["--local-config"];
  if (customPath) {
    if (typeof customPath !== "string") {
      throw new InvalidLocalConfig(customPath);
    }
    return path.resolve(process.cwd(), customPath);
  }
  const vercelConfigPath = path.join(prefix, "vercel.json");
  const vercelTomlPath = path.join(prefix, "vercel.toml");
  const nowConfigPath = path.join(prefix, "now.json");
  const vercelConfigExists = existsSync(vercelConfigPath);
  const vercelTomlExists = isVercelTomlEnabled() && existsSync(vercelTomlPath);
  const nowConfigExists = existsSync(nowConfigPath);
  const foundConfigs = [];
  if (vercelConfigExists)
    foundConfigs.push(vercelConfigPath);
  if (vercelTomlExists)
    foundConfigs.push(vercelTomlPath);
  if (nowConfigExists) {
    throw new DeprecatedNowJson(nowConfigPath);
  }
  if (foundConfigs.length > 1) {
    throw new ConflictingConfigFiles(foundConfigs);
  }
  const compiledConfigPath = path.join(prefix, VERCEL_DIR, "vercel.json");
  const compiledConfigExists = existsSync(compiledConfigPath);
  if (compiledConfigExists) {
    return compiledConfigPath;
  }
  return vercelConfigPath;
}

export {
  getLocalPathConfig
};
