export type Provider = "google" | "github" | "facebook" | "credentials";

export type Database = "mongodb" | "postgres" | "none";

export type Engine = "authjs" | "nextauth";

export interface AuthCLIConfig {
  engine: Engine;
  providers: Provider[];
  middleware: boolean;
  database: Database;
  ui: boolean;
}
