import { ProviderModule } from "../../types/provider.js";

export const FacebookProvider: ProviderModule = (options) => {
  return {
    name: "facebook",

    getImport() {
      return `import Facebook from "next-auth/providers/facebook";`;
    },

    getConfig() {
      return `
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,

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
      return ["FACEBOOK_CLIENT_ID=", "FACEBOOK_CLIENT_SECRET="];
    },

    getDependencies() {
      return [];
    },
  };
};
