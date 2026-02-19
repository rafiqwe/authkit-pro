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
import { mongoDbConfig } from "./generators/database/mongodb/mongoDbConfig.js";
import { mongodbDeps } from "./generators/database/mongodb/deps.js";
import { injectAuthConfigAuthjs } from "./core/authjs-core/injectAuthCofig.js";

// import { detectEnv } from "./engine/detect/env.js";

async function main() {
  intro("Welcome to AuthKit Pro");
  // const env = await detectEnv();
  const config = await runSetup();
  console.log(config);
  const targetDir = process.cwd();
  const ifCredential = config.providers.filter((p) => p !== "credentials");
  const ifCredentialProvider = config.providers.filter(
    (p) => p === "credentials",
  );

  // inject auth config
  if (config.engine === "authjs") {
    injectAuthConfigAuthjs(config);
  } else {
    injectAuthConfig(config);
  }
  if (ifCredentialProvider) {
    injectUserType();
  }

  // if middleware is selected then inject middleware
  if (config.middleware && config.engine !== "authjs") {
    injectMiddleware();
  }

  // generate env variables

  const envs = ifCredential.flatMap((p) => [
    `${p.toUpperCase()}_CLIENT_ID`,
    `${p.toUpperCase()}_CLIENT_SECRET`,
  ]);

  if (config.ui) {
    generateUI(targetDir, config);
  }

  const deps = loadProviders(config.providers).flatMap((p) =>
    p.getDependencies(),
  );

  // if database is postgres or mongodb then generate prisma
  if (config.database === "postgres") {
    generatePrisma(targetDir, config.database);
    // if database is postgres then generate prisma config
    if (config.database === "postgres") prismaConfig();
  }

  if (config.database === "mongodb") {
    mongoDbConfig();
  }

  // generate env variables
  generateEnv({ variables: envs, ans: config.database });

  // install dependencies
  const postgresDeps = config.database === "postgres" ? prismaDeps() : [];
  const mongoDbDep =
    config.database === "mongodb" ? mongodbDeps(config.engine) : [];

  await installDeps({
    deps: [...deps, ...postgresDeps, ...mongoDbDep],
    engine: config.engine,
  });

  console.log(chalk.cyan("Next steps:"));
  console.log(chalk.yellow("1. Add your DATABASE_URL to the .env file"));
  console.log(
    chalk.yellow(
      "2. Add your providers credentials CLIENT_ID and CLIENT_SECRET to the .env file",
    ),
  );

  if (config.database === "postgres") {
    console.log(
      chalk.yellow("3. Run migrations: ") +
        chalk.white.bold("npx prisma migrate dev --name init"),
    );
    console.log(
      chalk.yellow("4. Generate Prisma client: ") +
        chalk.white.bold("npx prisma generate"),
    );
    console.log(
      chalk.yellow("5. Push schema to database: ") +
        chalk.white.bold("npx prisma db push\n"),
    );
  }
  if (config.database !== "none") {
    console.log(
      chalk.green(
        `🎉 Your database and ${
          config.database === "postgres" ? "Prisma" : "MongoDB"
        } are ready! \n`,
      ),
    );
  }
  console.log(chalk.blue("Run npm run dev to start your application \n"));
  console.log(
    chalk.green("Login first then get: ") +
      chalk.white.bold("localhost:3000/api/auth/check\n"),
  );
  console.log(chalk.green(".env created"));
  outro("AuthKit Pro completed");
}

main();
