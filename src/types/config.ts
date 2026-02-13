export type Provider =
  | "google"
  | "github"
  | "facebook"
  | "credentials";

export type Database = "mongodb" | "postgres" | "none";

export interface AuthCLIConfig {
  providers: Provider[];
  middleware: boolean;
  database: Database;
  ui: boolean;
}
