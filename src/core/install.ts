import { execa } from "execa";
import chalk from "chalk";
import { AuthCLIConfig } from "../types/config.js";

export async function installDeps({
  deps,
  ans,
}: {
  deps: string[];
  ans: AuthCLIConfig["database"];
}) {
  const devDeps = ["next-auth", ...deps];
  console.log(chalk.green("\nInstalling devDependencies:"));
  devDeps.forEach((dep) => console.log(chalk.cyan("- " + dep)));

  await execa("npm", ["install", "next-auth", ...deps], {
    stdio: "inherit",
  });
  await execa("npm", ["install", "--save-dev", "@types/bcrypt"]);

  console.log(chalk.green.bold("\n✅ Dependencies installed successfully!\n"));

 
}
