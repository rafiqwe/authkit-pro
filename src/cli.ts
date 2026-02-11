#!/usr/bin/env node

import { injectAuthConfig } from "./core/injectAuthConfig.js";
import { runSetup } from "./engine/prompts/setup.js";
import { injectMiddleware } from "./core/injectMiddleware.js";
import { generateEnv } from "./core/env.js";
import { generateUI } from "./generators/ui/index.js";
import { intro, outro } from "@clack/prompts";
import { installDeps } from "./core/install.js";
import { loadProviders } from "./generators/providers/index.js";
import { generatePrisma } from "./generators/database/prisma/index.js";
import { prismaDeps } from "./generators/database/prisma/deps.js";
import { prismaConfig } from "./generators/database/prisma/prismaConfig.js";
import { injectUserType } from "./core/injectUserType.js";
import chalk from "chalk";
// import { detectEnv } from "./engine/detect/env.js";

async function main() {
  intro("Welcome to Auth Starter");
  // const env = await detectEnv();
  const config = await runSetup();
  const targetDir = process.cwd();
  const ifCredential = config.providers.filter((p) => p !== "credentials");
  const ifCredentialProvider = config.providers.filter(
    (p) => p === "credentials",
  );

  // inject auth config
  injectAuthConfig(config);
  if (ifCredentialProvider) {
    injectUserType();
  }

  // if middleware is selected then inject middleware
  if (config.middleware) {
    injectMiddleware();
  }

  // generate env variables

  const envs = ifCredential.flatMap((p) => [
    `${p.toUpperCase()}_CLIENT_ID`,
    `${p.toUpperCase()}_CLIENT_SECRET`,
  ]);

  if (config.ui) {
    generateUI(targetDir, config.providers);
  }

  const deps = loadProviders(config.providers).flatMap((p) =>
    p.getDependencies(),
  );

  // if database is postgres or mongodb then generate prisma
  if (config.database === "postgres" || config.database === "mongodb") {
    generatePrisma(targetDir, config.database);
    // if database is postgres then generate prisma config
    if (config.database === "postgres") prismaConfig();
  }

  // generate env variables
  generateEnv({ variables: envs });

  // install dependencies
  await installDeps({ deps: [...deps, ...prismaDeps()], ans: config.database });
  console.log(chalk.green(".env created"));
  outro("Auth Starter completed");
}

main();
