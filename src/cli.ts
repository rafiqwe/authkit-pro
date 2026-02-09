#!/usr/bin/env node
import chalk from "chalk";
import { askSetup } from "./core/prompts.js";
import { installDeps } from "./core/install.js";
import { generateEnv } from "./core/env.js";
import { injectAuthConfig } from "./core/injectConfig.js";
import { copyTemplate } from "./utils/copyTemplate.js";
async function run() {
  console.log(chalk.cyan("\nAuth Starter Setup\n"));
  const answers = await askSetup();
  await copyTemplate();
  await installDeps();
  generateEnv();
  injectAuthConfig(answers);
  console.log(chalk.green("\nSetup Complete 🚀\n"));
}

run();
