import { multiselect, confirm, select } from "@clack/prompts";
import {
  AuthCLIConfig,
  Database,
  Engine,
  Provider,
} from "../../types/config.js";

export async function runSetup(): Promise<AuthCLIConfig> {
  const engine = await select({
    message: "Choose auth engine",
    options: [
      { value: "authjs", label: "Auth.js" },
      { value: "nextauth", label: "NextAuth" },
      // { value: "betterauth", label: "Better Auth" },
    ],
  });

  const providers = await multiselect({
    message: "Select authentication providers",
    options: [
      { value: "google", label: "Google Provider" },
      { value: "github", label: "GitHub Provider" },
      { value: "facebook", label: "Facebook Provider" },
      { value: "credentials", label: "Credentials Provider" },
    ],
    required: true,
  });

  let middleware;
  if (engine === "nextauth") {
    // Middleware
    middleware = await confirm({
      message: "Enable route protection middleware?",
    });
  }

  // Database
  const database = await select({
    message: "Database integration",
    options: [
      { value: "postgres", label: "PostgreSQL" },
      { value: "mongodb", label: "MongoDB" },
      { value: "none", label: "None" },
    ],
  });

  // UI
  const ui = await confirm({
    message: "Generate login UI components?",
  });

  return {
    engine: engine as Engine,
    providers: providers as Provider[],
    middleware: middleware as boolean,
    database: database as Database,
    ui: ui as boolean,
  };
}
