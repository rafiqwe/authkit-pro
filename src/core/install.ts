import { execa } from "execa";
import chalk from "chalk";

export async function installDeps() {
  console.log(chalk.cyan("Installing dependencies...\n"));

  await execa("npm", ["install", "next-auth"], {
    stdio: "inherit",
  });

  console.log(chalk.green("Dependencies installed\n"));
}
