import { ProviderModule } from "../../types/provider.js";

export const GitHubProvider: ProviderModule = (options) => {
  return {
    name: "github",

    getImport() {
      return `import GitHub from "next-auth/providers/github";`;
    },

    getConfig() {
      return `
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    })`;
    },

    getEnv() {
      return ["GITHUB_CLIENT_ID=", "GITHUB_CLIENT_SECRET="];
    },

    getDependencies() {
      return [];
    },
  };
};
