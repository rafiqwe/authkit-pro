import { ProviderModule } from "../../types/provider.js";
import { GoogleProvider } from "./google.js";
import { GitHubProvider } from "./github.js";
import { FacebookProvider } from "./facebook.js";
import { Provider, Database } from "../../types/config.js";
import { CredentialsProvider } from "./credential.js";

const registry: Record<Provider, ProviderModule> = {
  google: (options?: Database) => GoogleProvider(options),
  github: (options?: Database) => GitHubProvider(options),
  facebook: (options?: Database) => FacebookProvider(options),
  credentials: (options?: Database) => CredentialsProvider(options),
};

export function loadProviders(selected: Provider[], options?: Database) {
  return selected.map((p) => registry[p](options));
}
