#!/usr/bin/env node

import chalk from "chalk";
import { copyTemplate } from "./utils/copyTemplate.js";
import fs from "fs";

const args = process.argv.slice(2);
const command = args[0];

function validateProject() {
  if (!fs.existsSync("package.json")) {
    console.log(chalk.red("❌ Not inside a project"));
    process.exit(1);
  }
}

async function init() {
  console.log(chalk.cyan("⚡ Setting up Auth Starter...\n"));

  validateProject();

  await copyTemplate();

  console.log(chalk.green("✅ Templates copied"));
}

if (command === "init") {
  init();
} else {
  console.log(`
Usage:

auth-starter init
`);
}
