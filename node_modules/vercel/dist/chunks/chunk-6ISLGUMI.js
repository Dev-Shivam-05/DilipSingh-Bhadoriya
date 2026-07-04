import { createRequire as __createRequire } from 'node:module';
import { fileURLToPath as __fileURLToPath } from 'node:url';
import { dirname as __dirname_ } from 'node:path';
const require = __createRequire(import.meta.url);
const __filename = __fileURLToPath(import.meta.url);
const __dirname = __dirname_(__filename);
import {
  AGENT_REASON,
  AGENT_STATUS
} from "./chunk-QH7WYDEP.js";
import {
  getLocalPathConfig
} from "./chunk-YWLVPKNT.js";
import {
  getScope
} from "./chunk-P726GMBL.js";
import {
  table
} from "./chunk-VKBYAWTL.js";
import {
  VERCEL_DIR_PROJECT,
  VERCEL_DIR_README,
  checkExistsAndConnect,
  compileVercelConfig,
  createDetectEntrypoint,
  createProject,
  detectProjects,
  fetchProjectsForRepoUrl,
  findProjectsFromPath,
  findRepoRoot,
  findSourceVercelConfigFile,
  getLinkedProject,
  getProjectByNameOrId,
  getServicesConfigWriteBlocker,
  getTeams,
  getVercelDirectory,
  humanizePath,
  isDirectory,
  linkFolderToProject,
  linkRepoProject,
  parseGitConfig,
  pluckRemoteUrls,
  printAlignedLabel,
  pull,
  readJSONFile,
  require_dist3 as require_dist,
  require_frameworks,
  require_lib,
  require_slugify,
  resolveGitRemote,
  selectAndParseRemoteUrl,
  selectOrg,
  writeServicesConfig
} from "./chunk-RB7WQKNC.js";
import {
  buildCommandWithGlobalFlags,
  outputAgentError,
  shouldEmitNonInteractiveCommandError
} from "./chunk-IZOHLD5D.js";
import {
  printError
} from "./chunk-EJ6GQI6F.js";
import {
  CantParseJSONFile,
  ProjectNotFound,
  isAPIError
} from "./chunk-P6AK7SVK.js";
import {
  output_manager_default
} from "./chunk-OX7KI3LF.js";
import {
  require_source
} from "./chunk-S7KYDPEM.js";
import {
  __toESM
} from "./chunk-TZ2YI2VH.js";

// src/util/validate-paths.ts
var import_fs_extra = __toESM(require_lib(), 1);
var import_chalk = __toESM(require_source(), 1);
import { homedir } from "os";
async function validateRootDirectory(cwd, path2, errorSuffix = "") {
  const pathStat = await (0, import_fs_extra.lstat)(path2).catch(() => null);
  const suffix = errorSuffix ? ` ${errorSuffix}` : "";
  if (!pathStat) {
    output_manager_default.error(
      `The provided path ${import_chalk.default.cyan(
        `\u201C${humanizePath(path2)}\u201D`
      )} does not exist.${suffix}`
    );
    return false;
  }
  if (!pathStat.isDirectory()) {
    output_manager_default.error(
      `The provided path ${import_chalk.default.cyan(
        `\u201C${humanizePath(path2)}\u201D`
      )} is a file, but expected a directory.${suffix}`
    );
    return false;
  }
  if (!path2.startsWith(cwd)) {
    output_manager_default.error(
      `The provided path ${import_chalk.default.cyan(
        `\u201C${humanizePath(path2)}\u201D`
      )} is outside of the project.${suffix}`
    );
    return false;
  }
  return true;
}
async function validatePaths(client, paths) {
  if (paths.length > 1) {
    output_manager_default.error(`Can't deploy more than one path.`);
    return { valid: false, exitCode: 1 };
  }
  const path2 = paths[0];
  const pathStat = await (0, import_fs_extra.lstat)(path2).catch(() => null);
  if (!pathStat) {
    output_manager_default.error(`Could not find ${import_chalk.default.cyan(`\u201C${humanizePath(path2)}\u201D`)}`);
    return { valid: false, exitCode: 1 };
  }
  if (!pathStat.isDirectory()) {
    output_manager_default.prettyError({
      message: "Support for single file deployments has been removed.",
      link: "https://vercel.link/no-single-file-deployments"
    });
    return { valid: false, exitCode: 1 };
  }
  if (path2 === homedir()) {
    const shouldDeployHomeDirectory = await client.input.confirm(
      `You are deploying your home directory. Do you want to continue?`,
      false
    );
    if (!shouldDeployHomeDirectory) {
      output_manager_default.print(`Canceled
`);
      return { valid: false, exitCode: 0 };
    }
  }
  return { valid: true, path: path2 };
}

// src/util/config/read-config.ts
async function readConfig(dir) {
  let pkgFilePath;
  try {
    const compileResult = await compileVercelConfig(dir);
    pkgFilePath = compileResult.configPath || getLocalPathConfig(dir);
  } catch (err) {
    if (err instanceof Error) {
      return err;
    }
    throw err;
  }
  const result = await readJSONFile(pkgFilePath);
  if (result instanceof CantParseJSONFile) {
    return result;
  }
  if (result) {
    return result;
  }
  return null;
}

// src/util/projects/project-not-found-error.ts
async function printProjectNotFoundError(client, projectNameOrId, commandName) {
  let contextName;
  try {
    const scope = await getScope(client);
    contextName = scope.contextName;
  } catch (err) {
    output_manager_default.debug(`getScope failed during error reporting: ${err}`);
  }
  const scopeClause = contextName ? ` (${contextName})` : "";
  const headline = `Project "${projectNameOrId}" was not found in the current scope${scopeClause}.`;
  output_manager_default.error(
    `${headline}

If it lives in a different team or account:
  \u2022 Retry with \`--scope <team-slug|your-username>\`, or
  \u2022 Run \`vercel switch <team-slug|your-username>\` to change scope.

List accessible teams with \`vercel teams ls\`.`
  );
  if (!shouldEmitNonInteractiveCommandError(client)) {
    return;
  }
  const retryWithScope = buildCommandWithGlobalFlags(
    client.argv,
    `${commandName} --project ${projectNameOrId} --scope <team-slug>`
  );
  outputAgentError(
    client,
    {
      status: AGENT_STATUS.ERROR,
      reason: AGENT_REASON.PROJECT_NOT_FOUND,
      message: `${headline} If it lives in a different team or account, retry with --scope <team-slug|your-username> or run \`vercel switch <team-slug|your-username>\` to change scope.`,
      ...contextName ? { scope: contextName } : {},
      next: [
        { command: "vercel teams ls", when: "list accessible teams" },
        { command: retryWithScope, when: "retry with a specific team" },
        {
          command: "vercel switch <team-slug>",
          when: "change the default scope"
        }
      ]
    },
    1
  );
}

// src/util/input/display-services.ts
var import_frameworks = __toESM(require_frameworks(), 1);
import {
  getServiceQueueTopics,
  isExperimentalServiceV2,
  isQueueTriggeredService,
  isScheduleTriggeredService,
  isWorkflowTriggeredService
} from "@vercel/build-utils";
var chalk2 = require_source();
var frameworksBySlug = new Map(import_frameworks.frameworkList.map((f) => [f.slug, f]));
var frameworkColors = {
  // JavaScript/TypeScript frameworks
  nextjs: chalk2.white,
  vite: chalk2.magenta,
  nuxtjs: chalk2.green,
  remix: chalk2.cyan,
  astro: chalk2.magenta,
  gatsby: chalk2.magenta,
  svelte: chalk2.red,
  sveltekit: chalk2.red,
  solidstart: chalk2.blue,
  angular: chalk2.red,
  vue: chalk2.green,
  ember: chalk2.red,
  preact: chalk2.magenta,
  // Python frameworks
  fastapi: chalk2.green,
  flask: chalk2.cyan,
  // Node frameworks
  express: chalk2.yellow,
  nest: chalk2.red,
  hono: chalk2.yellowBright
};
var runtimeColors = {
  node: chalk2.green,
  python: chalk2.blue,
  go: chalk2.cyan,
  ruby: chalk2.red,
  rust: chalk2.yellowBright
};
function getFrameworkName(slug) {
  if (!slug)
    return void 0;
  return frameworksBySlug.get(slug)?.name;
}
function formatRoutePrefix(routePrefix) {
  if (routePrefix === "/") {
    return "/";
  }
  const normalized = routePrefix.startsWith("/") ? routePrefix : `/${routePrefix}`;
  return `${normalized}/*`;
}
var jobTriggerLabels = {
  queue: "Job/Queue",
  schedule: "Job/Schedule",
  workflow: "Job/Workflow"
};
function getServiceDescriptionInfo(service) {
  if (service.type === "worker" || service.type === "job" || service.type === "cron") {
    const typeLabel = service.type === "worker" ? "Worker" : jobTriggerLabels[service.trigger ?? ""] ?? "Job";
    const typeColorFn = service.type === "worker" ? chalk2.magenta : chalk2.cyan;
    if (service.runtime) {
      const runtimeName = service.runtime.charAt(0).toUpperCase() + service.runtime.slice(1);
      const runtimeColorFn = runtimeColors[service.runtime] || chalk2.yellow;
      const label = `${typeLabel}${chalk2.white("/")}${runtimeColorFn(runtimeName)}`;
      return { label, colorFn: typeColorFn };
    }
    return { label: typeLabel, colorFn: typeColorFn };
  }
  return getFrameworkRuntimeBuilderInfo(service);
}
function getFrameworkRuntimeBuilderInfo(service) {
  const frameworkName = getFrameworkName(service.framework);
  if (frameworkName && service.framework) {
    const colorFn = frameworkColors[service.framework] || chalk2.cyan;
    return { label: frameworkName, colorFn };
  } else if (service.runtime) {
    const normalizedRuntime = service.runtime.toLowerCase().replace(/@.*$/, "");
    const colorFn = runtimeColors[normalizedRuntime] || chalk2.yellow;
    return { label: service.runtime, colorFn };
  } else if (service.builder?.use) {
    return { label: service.builder.use, colorFn: chalk2.magenta };
  }
  return { label: "unknown", colorFn: chalk2.dim };
}
function getServiceTarget(service) {
  if (isScheduleTriggeredService(service)) {
    return `schedule: ${service.schedule ?? "none"}`;
  }
  if (isQueueTriggeredService(service)) {
    const topics = getServiceQueueTopics(service);
    return `topics: ${topics.join(", ")}`;
  }
  if (isWorkflowTriggeredService(service)) {
    return "workflow";
  }
  return service.routePrefix ? formatRoutePrefix(service.routePrefix) : "no route";
}
function displayDetectedServices(services) {
  output_manager_default.print(`Detected services:
`);
  const rows = services.some(isExperimentalServiceV2) ? buildServiceRowsV2(services.filter(isExperimentalServiceV2)) : buildServiceRowsV1(services);
  const tableOutput = table(rows, { align: ["l", "l", "l", "l"], hsep: 2 });
  output_manager_default.print(`${tableOutput}
`);
}
function buildServiceRowsV1(services) {
  const outputOrder = {
    web: 0,
    cron: 1,
    job: 1,
    worker: 2
  };
  const sorted = [...services].sort(
    (a, b) => (outputOrder[a.type] ?? 3) - (outputOrder[b.type] ?? 3)
  );
  return sorted.map((service) => {
    const descInfo = getServiceDescriptionInfo(service);
    const target = getServiceTarget(service);
    return [
      `\u2022 ${service.name}`,
      descInfo.colorFn(`[${descInfo.label}]`),
      chalk2.dim("\u2192"),
      target
    ];
  });
}
function buildServiceRowsV2(services) {
  return services.map((service) => {
    const descInfo = getFrameworkRuntimeBuilderInfo(service);
    return [`\u2022 ${service.name}`, descInfo.colorFn(`[${descInfo.label}]`)];
  });
}
function displayServicesConfigNote(configFileName = "vercel.json") {
  output_manager_default.print(
    `
${chalk2.dim(`Services are configured via ${configFileName}.`)}
`
  );
}
function displayServiceErrors(errors) {
  for (const error of errors) {
    output_manager_default.warn(error.message);
  }
}

// src/util/link/setup-and-link.ts
var import_chalk6 = __toESM(require_source(), 1);
var import_fs_extra2 = __toESM(require_lib(), 1);
var import_fs_detectors2 = __toESM(require_dist(), 1);
import { join as join2, basename } from "path";

// src/util/input/input-project.ts
var import_chalk2 = __toESM(require_source(), 1);
var import_slugify = __toESM(require_slugify(), 1);
async function inputProjectDecision(client, defaultDecision) {
  const createChoice = {
    name: "Create new project",
    value: "create"
  };
  const existingChoice = {
    name: "Link existing project",
    value: "existing"
  };
  return await client.input.select({
    message: "Project?",
    choices: defaultDecision === "existing" ? [existingChoice, createChoice] : [createChoice, existingChoice]
  });
}
async function inputProject(client, org, detectedProjectName, autoConfirm = false, skipAutoDetect = false) {
  const slugifiedName = (0, import_slugify.default)(detectedProjectName);
  let detectedProject = null;
  if (!skipAutoDetect) {
    output_manager_default.spinner("Searching for existing projects\u2026", 1e3);
    const [project, slugifiedProject] = await Promise.all([
      getProjectByNameOrId(client, detectedProjectName, org.id),
      slugifiedName !== detectedProjectName ? getProjectByNameOrId(client, slugifiedName, org.id) : null
    ]);
    detectedProject = !(project instanceof ProjectNotFound) ? project : !(slugifiedProject instanceof ProjectNotFound) ? slugifiedProject : null;
    if (detectedProject && !detectedProject.id) {
      throw new Error(`Detected linked project does not have "id".`);
    }
    output_manager_default.stopSpinner();
  }
  if (autoConfirm) {
    return detectedProject || detectedProjectName;
  }
  if (client.nonInteractive) {
    if (detectedProject) {
      return detectedProject;
    }
    const err = new Error("Confirmation required");
    err.code = "HEADLESS";
    throw err;
  }
  let shouldLinkProject;
  if (!detectedProject) {
    const decision = await inputProjectDecision(
      client,
      skipAutoDetect ? "existing" : "create"
    );
    shouldLinkProject = decision === "existing";
  } else {
    output_manager_default.print(`  ${import_chalk2.default.bold("Found existing project")}
`);
    printAlignedLabel("Project", `${org.slug}/${detectedProject.name}`);
    if (await client.input.confirm(`Link directory to project?`, true)) {
      return detectedProject;
    }
    const decision = await inputProjectDecision(client, "existing");
    shouldLinkProject = decision === "existing";
  }
  if (shouldLinkProject) {
    const firstPage = await client.fetch(`/v9/projects?limit=100`, { accountId: org.id });
    const projects = firstPage.projects;
    const hasMoreProjects = firstPage.pagination.next !== null;
    if (projects.length === 0) {
      output_manager_default.log(
        `No existing projects found under ${import_chalk2.default.bold(org.slug)}. Creating new project.`
      );
    } else if (hasMoreProjects) {
      let toLink;
      await client.input.text({
        message: "Existing project name?",
        validate: async (val) => {
          if (!val) {
            return "Project name cannot be empty";
          }
          const project = await getProjectByNameOrId(client, val, org.id);
          if (project instanceof ProjectNotFound) {
            return "Project not found";
          }
          toLink = project;
          return true;
        }
      });
      return toLink;
    } else {
      const choices = projects.sort((a, b) => b.updatedAt - a.updatedAt).map((project) => ({
        name: project.name,
        value: project
      }));
      const toLink = await client.input.select({
        message: "Which project?",
        choices
      });
      return toLink;
    }
  }
  return await client.input.text({
    message: `Name?`,
    default: !detectedProject ? slugifiedName : void 0,
    validate: async (val) => {
      if (!val) {
        return "Project name cannot be empty";
      }
      const project = await getProjectByNameOrId(client, val, org.id);
      if (!(project instanceof ProjectNotFound)) {
        return "Project already exists";
      }
      return true;
    }
  });
}

// src/util/input/input-root-directory.ts
var import_chalk3 = __toESM(require_source(), 1);
import { normalizePath } from "@vercel/build-utils";
import path from "path";
async function inputRootDirectory(client, cwd, autoConfirm = false) {
  if (autoConfirm) {
    return null;
  }
  while (true) {
    const rootDirectory = await client.input.text({
      message: `Code directory?`,
      transformer: (input) => {
        return `${import_chalk3.default.dim(`./`)}${input}`;
      }
    });
    if (!rootDirectory) {
      return null;
    }
    const normal = path.normalize(rootDirectory);
    if (normal === "." || normal === "./") {
      return null;
    }
    const fullPath = path.join(cwd, normal);
    if (await validateRootDirectory(
      cwd,
      fullPath,
      "Please choose a different one."
    ) === false) {
      continue;
    }
    return normalizePath(normal);
  }
}

// src/util/input/edit-project-settings.ts
var import_chalk4 = __toESM(require_source(), 1);
var import_frameworks2 = __toESM(require_frameworks(), 1);

// src/util/is-setting-value.ts
function isSettingValue(setting) {
  return setting && typeof setting.value === "string";
}

// src/util/input/edit-project-settings.ts
var settingMap = {
  buildCommand: "Build Command",
  devCommand: "Development Command",
  commandForIgnoringBuildStep: "Ignore Command",
  installCommand: "Install Command",
  outputDirectory: "Output Directory",
  framework: "Framework"
};
var settingKeys = Object.keys(settingMap).sort();
async function editProjectSettings(client, projectSettings, framework, autoConfirm, localConfigurationOverrides, configFileName = "vercel.json") {
  const settings = Object.assign(
    {
      buildCommand: null,
      devCommand: null,
      framework: null,
      commandForIgnoringBuildStep: null,
      installCommand: null,
      outputDirectory: null
    },
    projectSettings
  );
  const hasLocalConfigurationOverrides = localConfigurationOverrides && Object.values(localConfigurationOverrides ?? {}).some(Boolean);
  if (hasLocalConfigurationOverrides) {
    for (const setting of settingKeys) {
      const localConfigValue = localConfigurationOverrides[setting];
      if (localConfigValue)
        settings[setting] = localConfigValue;
    }
    output_manager_default.print(`  Local settings detected in ${configFileName}:
`);
    for (const setting of settingKeys) {
      const override = localConfigurationOverrides[setting];
      if (override) {
        output_manager_default.print(
          `  ${import_chalk4.default.dim(
            `${import_chalk4.default.bold(`${settingMap[setting]}:`)} ${override}`
          )}
`
        );
      }
    }
    if (localConfigurationOverrides.framework) {
      const overrideFramework = import_frameworks2.frameworkList.find(
        (f) => f.slug === localConfigurationOverrides.framework
      );
      if (overrideFramework) {
        framework = overrideFramework;
        output_manager_default.print(
          `  Merging default Project Settings for ${framework.name}. Previously listed overrides are prioritized.
`
        );
      }
    }
  }
  if (!framework) {
    settings.framework = null;
    return settings;
  }
  output_manager_default.print("\n");
  if (!framework.slug) {
    output_manager_default.print(`  No framework detected. Default Project Settings:
`);
  } else {
    const buildCmd = framework.settings.buildCommand?.value ?? null;
    const outputSetting = framework.settings.outputDirectory;
    const outputDir = outputSetting ? isSettingValue(outputSetting) ? outputSetting.value : outputSetting.placeholder : null;
    const inline = [
      buildCmd ? `${settingMap.buildCommand}: ${buildCmd}` : null,
      outputDir ? `${settingMap.outputDirectory}: ${outputDir}` : null
    ].filter(Boolean);
    const detail = inline.length ? import_chalk4.default.dim(` (${inline.join(", ")})`) : "";
    output_manager_default.print(`  ${import_chalk4.default.bold("Detected")} ${framework.name}${detail}
`);
  }
  settings.framework = framework.slug;
  if (!framework.slug) {
    for (const setting of settingKeys) {
      if (setting === "framework" || setting === "commandForIgnoringBuildStep") {
        continue;
      }
      const defaultSetting = framework.settings[setting];
      const override = localConfigurationOverrides?.[setting];
      if (!override && defaultSetting) {
        output_manager_default.print(
          `  ${import_chalk4.default.dim(
            `${import_chalk4.default.bold(`${settingMap[setting]}:`)} ${isSettingValue(defaultSetting) ? defaultSetting.value : import_chalk4.default.italic(`${defaultSetting.placeholder}`)}`
          )}
`
        );
      }
    }
  }
  if (autoConfirm || !await client.input.confirm("Customize settings?", false)) {
    return settings;
  }
  const choices = settingKeys.reduce(
    (acc, setting) => {
      const skip = setting === "framework" || setting === "commandForIgnoringBuildStep" || setting === "installCommand" || localConfigurationOverrides?.[setting];
      if (skip)
        return acc;
      return [...acc, { name: settingMap[setting], value: setting }];
    },
    []
  );
  const settingFields = await client.input.checkbox({
    message: "Which settings would you like to overwrite (select multiple)?",
    choices
  });
  for (const setting of settingFields) {
    const field = settingMap[setting];
    settings[setting] = await client.input.text({
      message: `${import_chalk4.default.bold(field)}?`
    });
  }
  return settings;
}

// src/util/link/setup-and-link.ts
var import_frameworks3 = __toESM(require_frameworks(), 1);

// src/util/input/vercel-auth.ts
var import_chalk5 = __toESM(require_source(), 1);
var DEFAULT_VERCEL_AUTH_SETTING = "standard";
var OPTIONS = {
  message: `What setting do you want to use for Vercel Authentication?`,
  default: DEFAULT_VERCEL_AUTH_SETTING,
  choices: [
    {
      description: "Standard Protection (recommended)",
      name: "standard",
      value: "standard"
    },
    {
      description: "No Protection (all deployments will be public)",
      name: "none",
      value: "none"
    }
  ]
};
async function vercelAuth(client, {
  autoConfirm = false
}) {
  if (autoConfirm || await client.input.confirm(
    `Want to use the default Deployment Protection settings? ${import_chalk5.default.dim(`(Vercel Authentication: Standard Protection)`)}`,
    true
  )) {
    return DEFAULT_VERCEL_AUTH_SETTING;
  }
  const vercelAuth2 = await client.input.select(OPTIONS);
  return vercelAuth2;
}

// src/util/link/services-setup.ts
var import_fs_detectors = __toESM(require_dist(), 1);
import { normalizePath as normalizePath2 } from "@vercel/build-utils";
import { join, relative } from "path";
var SERVICES_DOCS_URL = "https://vercel.com/docs/services";
var INFERRED_SERVICES_PROMPT = "Multiple services were detected. How would you like to set up this project?";
async function getServicesSetupState(workPath) {
  const detectServicesResult = await (0, import_fs_detectors.detectServices)({
    fs: new import_fs_detectors.LocalFileSystemDetector(workPath),
    detectEntrypoint: createDetectEntrypoint(workPath)
  });
  const hasConfiguredServices = detectServicesResult.resolved?.source === "configured";
  const inferredServices = hasConfiguredServices ? null : detectServicesResult.inferred;
  const inferredServicesWriteBlocker = inferredServices ? await getServicesConfigWriteBlocker(workPath, inferredServices.config) : null;
  return {
    detectServicesResult,
    hasConfiguredServices,
    inferredServices,
    inferredServicesWriteBlocker
  };
}
function displayConfiguredServicesSetup(detectServicesResult, configFileName = "vercel.json") {
  const v1Services = detectServicesResult.services.filter(
    import_fs_detectors.isExperimentalService
  );
  if (v1Services.length > 0) {
    displayDetectedServices(v1Services);
  }
  if (detectServicesResult.errors.length > 0) {
    displayServiceErrors(detectServicesResult.errors);
  }
  displayServicesConfigNote(configFileName);
}
function formatDetectedServicesSummary(services) {
  if (services.length === 0) {
    return "";
  }
  if (services.length === 1) {
    return `"${services[0].name}"`;
  }
  if (services.length === 2) {
    return `"${services[0].name}" + "${services[1].name}"`;
  }
  const othersCount = services.length - 2;
  return `"${services[0].name}" + "${services[1].name}" + ${othersCount} ${othersCount === 1 ? "other" : "others"}`;
}
function toProjectRootDirectory(projectPath, selectedPath) {
  const rootDirectory = normalizePath2(relative(projectPath, selectedPath));
  return rootDirectory === "" ? null : rootDirectory;
}
async function promptForInferredServicesSetup({
  client,
  autoConfirm,
  nonInteractive,
  workPath,
  inferred,
  inferredWriteBlocker,
  allowChooseDifferentProjectDirectory = false
}) {
  if (!inferred) {
    return null;
  }
  if (inferredWriteBlocker) {
    output_manager_default.warn(
      `Multiple services were detected, but your existing project config uses \`${inferredWriteBlocker}\`. To deploy multiple services in one project, see ${output_manager_default.link("Services", SERVICES_DOCS_URL)}.`
    );
    return null;
  }
  displayDetectedServices(inferred.services);
  let choice = null;
  if (autoConfirm) {
    choice = { type: "services" };
  } else if (!nonInteractive) {
    const webServices = inferred.services.filter(
      (service) => (0, import_fs_detectors.isExperimentalService)(service) ? service.type === "web" : true
    );
    const choices = [
      {
        name: `Set up project with all detected services: ${formatDetectedServicesSummary(
          inferred.services
        )}`,
        value: "services"
      },
      ...webServices.map((service, index) => ({
        name: `Set up project with "${service.name}"`,
        value: `single-app:${index}`
      })),
      ...allowChooseDifferentProjectDirectory ? [
        {
          name: "Choose a different root directory",
          value: "project-directory"
        }
      ] : []
    ];
    const selected = await client.input.select({
      message: INFERRED_SERVICES_PROMPT,
      choices
    });
    if (selected === "services") {
      choice = { type: "services" };
    } else if (selected === "project-directory") {
      choice = { type: "project-directory" };
    } else if (typeof selected === "string" && selected.startsWith("single-app:")) {
      const index = Number.parseInt(selected.slice("single-app:".length), 10);
      const service = webServices[index];
      if (service) {
        const serviceRoot = (0, import_fs_detectors.isExperimentalServiceV2)(service) ? service.root : service.workspace;
        choice = {
          type: "single-app",
          selectedPath: serviceRoot === "." ? workPath : join(workPath, serviceRoot)
        };
      }
    }
  }
  if (choice?.type !== "services") {
    return choice;
  }
  const { configFileName } = await writeServicesConfig(
    workPath,
    inferred.config
  );
  output_manager_default.print(`  Added services configuration to ${configFileName}.
`);
  return { type: "services" };
}

// src/util/projects/search-project-across-teams.ts
var import_slugify2 = __toESM(require_slugify(), 1);
import { relative as relative2 } from "path";
async function searchProjectAcrossTeams(client, projectName, cwd, {
  autoConfirm = false,
  nonInteractive = false,
  teams,
  skipLimited,
  gitProjectName
} = {}) {
  const teamsToSearch = teams ?? await getTeams(client);
  const shouldSkipLimited = skipLimited ?? true;
  const accessibleTeams = [];
  const skippedTeams = [];
  const skippedSlugs = [];
  for (const t of teamsToSearch) {
    if (shouldSkipLimited && t.limited) {
      skippedTeams.push(t);
      skippedSlugs.push(t.slug);
    } else {
      accessibleTeams.push(t);
    }
  }
  if (skippedSlugs.length > 0) {
    output_manager_default.debug(
      `Skipping limited teams during cross-team project search: ${skippedSlugs.join(", ")}`
    );
  }
  const searchedTeamSlugs = accessibleTeams.map((team) => team.slug);
  const orgs = accessibleTeams.map((t) => ({
    type: "team",
    id: t.id,
    slug: t.slug
  }));
  const repoMatchesPromise = searchProjectsByRepoRoot({
    client,
    cwd,
    gitProjectName,
    orgs,
    autoConfirm,
    nonInteractive
  });
  const slugifiedName = (0, import_slugify2.default)(projectName);
  const searchNames = [projectName];
  if (slugifiedName !== projectName) {
    searchNames.push(slugifiedName);
  }
  const folderNameSearchPromises = orgs.flatMap(
    (org) => searchNames.map(
      (name) => getProjectByNameOrId(client, name, org.id).then(
        (result) => result instanceof ProjectNotFound ? null : { project: result, org, reason: "folder-name" }
      ).catch(() => null)
    )
  );
  const [repoMatches, folderNameMatches] = await Promise.all([
    repoMatchesPromise,
    Promise.all(folderNameSearchPromises)
  ]);
  const results = [...repoMatches, ...folderNameMatches];
  const seen = /* @__PURE__ */ new Set();
  const matches = [];
  for (const r of results) {
    if (r && r.project.id && !seen.has(r.project.id)) {
      seen.add(r.project.id);
      matches.push(r);
    }
  }
  return {
    matches,
    searchedTeamSlugs,
    skippedLimitedTeamSlugs: skippedSlugs,
    skippedLimitedTeams: skippedTeams
  };
}
async function searchProjectsByRepoRoot({
  client,
  cwd,
  gitProjectName,
  orgs,
  autoConfirm,
  nonInteractive
}) {
  const rootPath = await findRepoRoot(cwd);
  if (!rootPath) {
    return [];
  }
  let remote;
  try {
    remote = await resolveGitRemote(client, rootPath, {
      yes: autoConfirm || nonInteractive
    });
  } catch (error) {
    output_manager_default.debug(
      `Failed to resolve Git remote for cross-team search: ${error}`
    );
    return [];
  }
  if (!remote) {
    return [];
  }
  const relativePath = relative2(rootPath, cwd);
  const results = await Promise.all(
    orgs.map(async (org) => {
      try {
        const projects = await fetchProjectsForRepoUrl(
          client,
          remote.repoUrl,
          org.id
        );
        const repoProjectConfigs = projects.filter(
          (project) => !gitProjectName || project.id === gitProjectName || project.name === gitProjectName
        ).map((project) => ({
          id: project.id,
          name: project.name,
          directory: project.rootDirectory || ".",
          orgId: org.id
        }));
        const matchingProjects = findProjectsFromPath(
          repoProjectConfigs,
          relativePath
        );
        return matchingProjects.map((match) => {
          const project = projects.find((p) => p.id === match.id);
          if (!project) {
            return null;
          }
          return {
            project,
            org,
            reason: "repo-root",
            repo: {
              ...remote,
              directory: match.directory
            }
          };
        }).filter(Boolean);
      } catch (error) {
        output_manager_default.debug(
          `Failed to search Git-linked projects under ${org.slug}: ${error}`
        );
        return [];
      }
    })
  );
  return results.flat();
}

// src/util/link/setup-and-link.ts
function formatMatchReason(match) {
  if (match.reason === "repo-root") {
    return import_chalk6.default.gray("(linked by git)");
  }
  return import_chalk6.default.gray("(folder name)");
}
function formatCrossTeamMatch(match) {
  return `${import_chalk6.default.bold(match.org.slug)}/${match.project.name} ${formatMatchReason(
    match
  )}`;
}
function formatMatchSource(match) {
  return match.reason === "repo-root" ? "Git repository" : "Folder name";
}
var CHECKBOX_INSTRUCTIONS = [
  "\n  ",
  import_chalk6.default.dim("("),
  import_chalk6.default.cyan("<space>"),
  import_chalk6.default.dim(" select, "),
  import_chalk6.default.cyan("<enter>"),
  import_chalk6.default.dim(" confirm, "),
  import_chalk6.default.cyan("<a>"),
  import_chalk6.default.dim(" toggle all, "),
  import_chalk6.default.cyan("<i>"),
  import_chalk6.default.dim(" invert)")
].join("");
function printCrossTeamSearchScope({
  searchedTeamSlugs
}) {
  if (searchedTeamSlugs.length > 0) {
    output_manager_default.print(
      `  ${import_chalk6.default.dim(
        `Searched ${searchedTeamSlugs.length} ${searchedTeamSlugs.length === 1 ? "team" : "teams"}`
      )}
`
    );
  }
}
function isErrnoException(err) {
  return err instanceof Error && typeof err.code === "string";
}
async function hasWorkspaces(cwd) {
  try {
    const fs = new import_fs_detectors2.LocalFileSystemDetector(cwd);
    const workspaces = await (0, import_fs_detectors2.getWorkspaces)({ fs });
    return workspaces.length > 0;
  } catch (err) {
    if (isErrnoException(err) && err.code && ["ENOENT", "EACCES", "ENOTDIR"].includes(err.code)) {
      output_manager_default.debug(`getWorkspaces failed for ${cwd}: ${err}`);
      return false;
    }
    throw err;
  }
}
async function shouldPromptForRootDirectory(opts) {
  if (opts.servicesChoice?.type === "project-directory") {
    return true;
  }
  if (await hasWorkspaces(opts.path)) {
    return true;
  }
  try {
    const detected = await detectProjects(opts.path);
    const frameworksAtRoot = detected.get("") ?? [];
    return frameworksAtRoot.length === 0;
  } catch (err) {
    output_manager_default.debug(`detectProjects failed at root: ${err}`);
    return true;
  }
}
async function maybePullEnvAfterLink(client, path2, autoConfirm, pullEnv) {
  if (!pullEnv || !client.stdin.isTTY || client.nonInteractive) {
    return;
  }
  output_manager_default.print("\n");
  const pullEnvConfirmed = autoConfirm || await client.input.confirm(
    "Pull development environment variables into .env.local?",
    true
  );
  if (!pullEnvConfirmed) {
    return;
  }
  const originalCwd = client.cwd;
  try {
    client.cwd = path2;
    const args = autoConfirm ? ["--yes"] : [];
    const exitCode = await pull(client, args, "vercel-cli:link");
    if (exitCode !== 0) {
      output_manager_default.error(
        "Failed to pull environment variables. You can run `vc env pull` manually."
      );
    }
  } catch (_error) {
    output_manager_default.error(
      "Failed to pull environment variables. You can run `vc env pull` manually."
    );
  } finally {
    client.cwd = originalCwd;
  }
}
async function linkCrossTeamMatch({
  client,
  path: path2,
  match,
  successEmoji,
  autoConfirm,
  pullEnv
}) {
  client.config.currentTeam = match.org.type === "team" ? match.org.id : void 0;
  if (match.reason === "repo-root" && match.repo) {
    await linkRepoProject(client, path2, {
      project: match.project,
      orgId: match.org.id,
      orgSlug: match.org.slug,
      remoteName: match.repo.remoteName,
      successEmoji
    });
    await maybePullEnvAfterLink(client, path2, autoConfirm, pullEnv);
    return {
      status: "linked",
      org: match.org,
      project: match.project,
      repoRoot: match.repo.rootPath
    };
  }
  await linkFolderToProject(
    client,
    path2,
    { projectId: match.project.id, orgId: match.org.id },
    match.project.name,
    match.org.slug,
    successEmoji,
    autoConfirm,
    pullEnv
  );
  return { status: "linked", org: match.org, project: match.project };
}
async function promptForLimitedTeams(client, teams) {
  if (teams.length === 0) {
    return [];
  }
  return await client.input.checkbox({
    message: "Select teams that require SSO",
    instructions: CHECKBOX_INSTRUCTIONS,
    choices: teams.map((team) => ({
      name: team.name ? `${team.name} (${team.slug})` : team.slug,
      value: team
    }))
  });
}
async function searchSelectedLimitedTeams({
  client,
  path: path2,
  projectName,
  gitProjectName,
  teams
}) {
  const selectedTeams = await promptForLimitedTeams(client, teams);
  if (selectedTeams.length === 0) {
    return [];
  }
  output_manager_default.spinner("Searching selected teams that require SSO\u2026", 1e3);
  try {
    const result = await searchProjectAcrossTeams(client, projectName, path2, {
      teams: selectedTeams,
      skipLimited: false,
      gitProjectName
    });
    printCrossTeamSearchScope({
      searchedTeamSlugs: result.searchedTeamSlugs
    });
    return result.matches;
  } catch (err) {
    output_manager_default.debug(`Selected team search requiring SSO failed: ${err}`);
    return [];
  } finally {
    output_manager_default.stopSpinner();
  }
}
async function linkCrossTeamMatches({
  client,
  path: path2,
  matches,
  successEmoji,
  autoConfirm,
  nonInteractive,
  pullEnv
}) {
  if (matches.length === 0) {
    return null;
  }
  if (matches.length === 1) {
    const match = matches[0];
    if (autoConfirm || nonInteractive) {
      return await linkCrossTeamMatch({
        client,
        path: path2,
        match,
        successEmoji,
        autoConfirm,
        pullEnv
      });
    }
    output_manager_default.print("\n");
    output_manager_default.print(`  ${import_chalk6.default.bold("Found existing project")}
`);
    if (match.reason === "repo-root") {
      printAlignedLabel("Project", `${match.org.slug}/${match.project.name}`);
      printAlignedLabel("Source", formatMatchSource(match));
    } else {
      printAlignedLabel("Project", `${match.org.slug}/${match.project.name}`);
    }
    const confirmed = await client.input.confirm(
      match.reason === "repo-root" ? "Link repository to project?" : "Link directory to project?",
      true
    );
    if (confirmed) {
      return await linkCrossTeamMatch({
        client,
        path: path2,
        match,
        successEmoji,
        autoConfirm,
        pullEnv
      });
    }
    return null;
  }
  const currentTeamMatch = matches.find(
    (match) => match.org.id === client.config.currentTeam
  );
  if (autoConfirm && currentTeamMatch) {
    return await linkCrossTeamMatch({
      client,
      path: path2,
      match: currentTeamMatch,
      successEmoji,
      autoConfirm,
      pullEnv
    });
  }
  if (nonInteractive) {
    return null;
  }
  const choices = matches.map((match) => ({
    name: formatCrossTeamMatch(match),
    value: match
  }));
  choices.push({
    name: "Not one of these projects",
    value: null
  });
  output_manager_default.print("\n");
  printAlignedLabel("Projects", `${matches.length} matches across teams`);
  const selected = await client.input.select({
    message: "Which project?",
    choices,
    default: currentTeamMatch ?? void 0
  });
  if (!selected) {
    return null;
  }
  return await linkCrossTeamMatch({
    client,
    path: path2,
    match: selected,
    successEmoji,
    autoConfirm,
    pullEnv
  });
}
async function setupAndLink(client, path2, {
  autoConfirm = false,
  forceDelete = false,
  link,
  successEmoji = "link",
  projectName,
  nonInteractive = false,
  pullEnv = true,
  v0,
  searchAcrossTeams = false
}) {
  const { config } = client;
  const gitProjectName = projectName;
  projectName = projectName ?? basename(path2);
  if (!isDirectory(path2)) {
    output_manager_default.error(`Expected directory but found file: ${path2}`);
    return { status: "error", exitCode: 1, reason: "PATH_IS_FILE" };
  }
  if (!link) {
    link = await getLinkedProject(client, path2);
  }
  const isTTY = client.stdin.isTTY;
  let rootDirectory = null;
  let newProjectName;
  let org;
  if (!forceDelete && link.status === "linked") {
    return link;
  }
  if (forceDelete) {
    const vercelDir = getVercelDirectory(path2);
    (0, import_fs_extra2.remove)(join2(vercelDir, VERCEL_DIR_README));
    (0, import_fs_extra2.remove)(join2(vercelDir, VERCEL_DIR_PROJECT));
  }
  if (!isTTY && !autoConfirm && !nonInteractive) {
    return { status: "error", exitCode: 1, reason: "HEADLESS" };
  }
  output_manager_default.print("\n");
  printAlignedLabel("Directory", humanizePath(path2));
  output_manager_default.print("\n");
  let skipAutoDetect = false;
  if (searchAcrossTeams) {
    let crossTeamMatches = [];
    let searchedTeamSlugs = [];
    let skippedLimitedTeams = [];
    output_manager_default.spinner("Searching for existing projects\u2026", 1e3);
    try {
      const searchResult = await searchProjectAcrossTeams(
        client,
        projectName,
        path2,
        {
          autoConfirm,
          nonInteractive,
          gitProjectName
        }
      );
      crossTeamMatches = searchResult.matches;
      searchedTeamSlugs = searchResult.searchedTeamSlugs;
      skippedLimitedTeams = searchResult.skippedLimitedTeams;
    } catch (err) {
      output_manager_default.debug(`Cross-team search failed: ${err}`);
    } finally {
      output_manager_default.stopSpinner();
    }
    if (crossTeamMatches.length > 0 && searchedTeamSlugs.length > 1 && !autoConfirm && !nonInteractive) {
      printCrossTeamSearchScope({
        searchedTeamSlugs
      });
    }
    const linkedMatch = await linkCrossTeamMatches({
      client,
      path: path2,
      matches: crossTeamMatches,
      successEmoji,
      autoConfirm,
      nonInteractive,
      pullEnv
    });
    if (linkedMatch) {
      return linkedMatch;
    }
    if (!autoConfirm && !nonInteractive && skippedLimitedTeams.length > 0) {
      if (crossTeamMatches.length === 0) {
        printAlignedLabel(
          "Searched",
          `${searchedTeamSlugs.length} ${searchedTeamSlugs.length === 1 ? "team" : "teams"} available without SSO`
        );
        output_manager_default.print("  No matching projects found\n");
      }
      const limitedTeamMatches = await searchSelectedLimitedTeams({
        client,
        path: path2,
        projectName,
        gitProjectName,
        teams: skippedLimitedTeams
      });
      const linkedLimitedMatch = await linkCrossTeamMatches({
        client,
        path: path2,
        matches: limitedTeamMatches,
        successEmoji,
        autoConfirm,
        nonInteractive,
        pullEnv
      });
      if (linkedLimitedMatch) {
        return linkedLimitedMatch;
      }
      if (limitedTeamMatches.length === 0) {
        output_manager_default.print("  No matching projects found in the selected teams.\n");
      }
      skipAutoDetect = skipAutoDetect || crossTeamMatches.length > 0 || limitedTeamMatches.length > 0;
    } else if (crossTeamMatches.length > 0) {
      skipAutoDetect = true;
    }
  }
  try {
    org = await selectOrg(client, "Which team?", autoConfirm);
  } catch (err) {
    if (isAPIError(err)) {
      if (err.code === "NOT_AUTHORIZED") {
        output_manager_default.prettyError(err);
        return { status: "error", exitCode: 1, reason: "NOT_AUTHORIZED" };
      }
      if (err.code === "TEAM_DELETED") {
        output_manager_default.prettyError(err);
        return { status: "error", exitCode: 1, reason: "TEAM_DELETED" };
      }
    }
    throw err;
  }
  let projectOrNewProjectName;
  try {
    projectOrNewProjectName = await inputProject(
      client,
      org,
      projectName,
      autoConfirm,
      skipAutoDetect
    );
  } catch (err) {
    if (err instanceof Error && err.code === "HEADLESS") {
      return { status: "error", exitCode: 1, reason: "HEADLESS" };
    }
    throw err;
  }
  if (typeof projectOrNewProjectName === "string") {
    newProjectName = projectOrNewProjectName;
  } else {
    const project = projectOrNewProjectName;
    await linkFolderToProject(
      client,
      path2,
      {
        projectId: project.id,
        orgId: org.id
      },
      project.name,
      org.slug,
      successEmoji,
      autoConfirm,
      pullEnv
    );
    return { status: "linked", org, project };
  }
  config.currentTeam = org.type === "team" ? org.id : void 0;
  const rootServicesSetup = await getServicesSetupState(path2);
  const configFileName = await findSourceVercelConfigFile(path2) ?? "vercel.json";
  try {
    let settings = {};
    let pathWithRootDirectory = path2;
    let rootInferredServicesChoice = null;
    if (!rootServicesSetup.hasConfiguredServices) {
      rootInferredServicesChoice = await promptForInferredServicesSetup({
        client,
        autoConfirm,
        nonInteractive,
        workPath: path2,
        inferred: rootServicesSetup.inferredServices,
        inferredWriteBlocker: rootServicesSetup.inferredServicesWriteBlocker,
        allowChooseDifferentProjectDirectory: true
      });
    }
    if (rootServicesSetup.hasConfiguredServices) {
      displayConfiguredServicesSetup(
        rootServicesSetup.detectServicesResult,
        configFileName
      );
      settings.framework = "services";
    } else if (rootInferredServicesChoice?.type === "services") {
      settings.framework = "services";
    } else {
      const skipSelectedRootInferredServicesPrompt = rootInferredServicesChoice?.type === "single-app";
      if (rootInferredServicesChoice?.type === "single-app") {
        rootDirectory = toProjectRootDirectory(
          path2,
          rootInferredServicesChoice.selectedPath
        );
      } else {
        const shouldPromptRoot = await shouldPromptForRootDirectory({
          path: path2,
          servicesChoice: rootInferredServicesChoice
        });
        if (shouldPromptRoot) {
          rootDirectory = await inputRootDirectory(client, path2, autoConfirm);
          if (rootDirectory && !await validateRootDirectory(path2, join2(path2, rootDirectory))) {
            return {
              status: "error",
              exitCode: 1,
              reason: "INVALID_ROOT_DIRECTORY"
            };
          }
        }
      }
      pathWithRootDirectory = rootDirectory ? join2(path2, rootDirectory) : path2;
      const selectedRootServicesSetup = pathWithRootDirectory === path2 ? null : await getServicesSetupState(pathWithRootDirectory);
      let selectedRootInferredServicesChoice = null;
      if (!skipSelectedRootInferredServicesPrompt) {
        selectedRootInferredServicesChoice = await promptForInferredServicesSetup({
          client,
          autoConfirm,
          nonInteractive,
          workPath: pathWithRootDirectory,
          inferred: selectedRootServicesSetup?.inferredServices ?? null,
          inferredWriteBlocker: selectedRootServicesSetup?.inferredServicesWriteBlocker ?? null
        });
      }
      if (selectedRootServicesSetup?.hasConfiguredServices) {
        displayConfiguredServicesSetup(
          selectedRootServicesSetup.detectServicesResult,
          configFileName
        );
        settings.framework = "services";
      } else if (selectedRootInferredServicesChoice?.type === "services") {
        settings.framework = "services";
      } else {
        if (selectedRootInferredServicesChoice?.type === "single-app") {
          rootDirectory = toProjectRootDirectory(
            path2,
            selectedRootInferredServicesChoice.selectedPath
          );
          pathWithRootDirectory = rootDirectory ? join2(path2, rootDirectory) : path2;
        }
        const localConfig = await readConfig(pathWithRootDirectory);
        if (localConfig instanceof CantParseJSONFile) {
          output_manager_default.prettyError(localConfig);
          return { status: "error", exitCode: 1 };
        }
        const isZeroConfig = !localConfig || !localConfig.builds || localConfig.builds.length === 0;
        if (isZeroConfig) {
          const localConfigurationOverrides = {
            buildCommand: localConfig?.buildCommand,
            devCommand: localConfig?.devCommand,
            framework: localConfig?.framework,
            commandForIgnoringBuildStep: localConfig?.ignoreCommand,
            installCommand: localConfig?.installCommand,
            outputDirectory: localConfig?.outputDirectory
          };
          const detectedProjectsForWorkspace = await detectProjects(
            pathWithRootDirectory
          );
          const detectedProjects = detectedProjectsForWorkspace.get("") || [];
          const framework = detectedProjects[0] ?? import_frameworks3.frameworkList.find((f) => f.slug === null);
          settings = await editProjectSettings(
            client,
            {},
            framework,
            autoConfirm,
            localConfigurationOverrides,
            configFileName
          );
        }
      }
    }
    let changeAdditionalSettings = false;
    if (!autoConfirm) {
      changeAdditionalSettings = await client.input.confirm(
        "Customize advanced settings?",
        false
      );
    }
    let vercelAuthSetting = DEFAULT_VERCEL_AUTH_SETTING;
    if (changeAdditionalSettings) {
      vercelAuthSetting = await vercelAuth(client, {
        autoConfirm
      });
    }
    if (rootDirectory) {
      settings.rootDirectory = rootDirectory;
    }
    const project = await createProject(client, {
      ...settings,
      name: newProjectName,
      vercelAuth: vercelAuthSetting,
      v0
    });
    await linkFolderToProject(
      client,
      path2,
      {
        projectId: project.id,
        orgId: org.id
      },
      project.name,
      org.slug,
      successEmoji,
      autoConfirm,
      false,
      // don't prompt to pull env for newly created projects
      "Created"
    );
    await connectGitRepository(client, path2, project, autoConfirm, org);
    return { status: "linked", org, project };
  } catch (err) {
    if (isAPIError(err) && err.code === "too_many_projects") {
      output_manager_default.prettyError(err);
      return { status: "error", exitCode: 1, reason: "TOO_MANY_PROJECTS" };
    }
    if (err instanceof Error && err.code === "HEADLESS") {
      return { status: "error", exitCode: 1, reason: "HEADLESS" };
    }
    printError(err);
    return { status: "error", exitCode: 1 };
  }
}
async function connectGitRepository(client, path2, project, autoConfirm, org) {
  try {
    const gitConfig = await parseGitConfig(join2(path2, ".git/config"));
    if (!gitConfig) {
      return;
    }
    const remoteUrls = pluckRemoteUrls(gitConfig);
    if (!remoteUrls || Object.keys(remoteUrls).length === 0) {
      return;
    }
    output_manager_default.print("\n");
    const shouldConnect = autoConfirm || await client.input.confirm(`Connect detected Git repository?`, true);
    if (!shouldConnect) {
      return;
    }
    const repoInfo = await selectAndParseRemoteUrl(client, remoteUrls);
    if (!repoInfo) {
      return;
    }
    await checkExistsAndConnect({
      client,
      confirm: autoConfirm,
      gitProviderLink: project.link,
      org,
      gitOrg: repoInfo.org,
      project,
      // Type assertion since we only need the id
      provider: repoInfo.provider,
      repo: repoInfo.repo,
      repoPath: `${repoInfo.org}/${repoInfo.repo}`
    });
  } catch (error) {
    output_manager_default.debug(`Failed to connect git repository: ${error}`);
  }
}

export {
  validateRootDirectory,
  validatePaths,
  readConfig,
  displayDetectedServices,
  setupAndLink,
  printProjectNotFoundError
};
