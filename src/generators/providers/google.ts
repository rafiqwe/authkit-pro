import { ProviderModule } from "../../types/provider.js";

export const GoogleProvider: ProviderModule = (options) => {
  return {
    name: "google",

    getImport() {
      return `import Google from "next-auth/providers/google";`;
    },

    getConfig() {
      return `
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
      return ["GOOGLE_CLIENT_ID=", "GOOGLE_CLIENT_SECRET="];
    },

    getDependencies() {
      return [];
    },
  };
};
