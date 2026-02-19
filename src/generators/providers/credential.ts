// auth/providers/credentials.ts
import type { ProviderModule } from "../../types/provider.js";

const SAFE_USER_FIELDS = [
  "id",
  "email",
  "name",
  "image",
  "role",
  "emailVerified",
] as const;

// type SafeUser = Pick<User, typeof SAFE_USER_FIELDS[number]>;

export const CredentialsProvider: ProviderModule = (options) => {
  const database = options;

  const dbImport =
    database === "mongodb"
      ? `import User from "@/models/User"; //! Create a User model in @/models/User.ts`
      : `import { prisma } from "@/lib/prisma";`;

  const dbQuery =
    database === "mongodb"
      ? `
        const user = await User.findOne({ email }) as userType | null;
      `
      : `
       const user = (await prisma.user.findUnique({
          where: { email },
        })) as userType | null;
      `;

  return {
    name: "credentials",

    getImport() {
      return `
${dbImport}
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { userType } from "@/lib/userType";
`.trim();
    },

    getConfig() {
      return `
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const email = credentials.email.toLowerCase().trim();
        ${database === "mongodb" && "//! Connect to mongodb and Create a User model"}
        ${dbQuery}
        if (!user?.password) return null;
        const passwordValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!passwordValid) return null;
        const { password, ...safeUser } = user;
        return safeUser; // TypeScript-safe
      },
    }),`.trim();
    },

    getEnv() {
      return [];
    },

    getDependencies() {
      return ["bcrypt"];
    },
  };
};
