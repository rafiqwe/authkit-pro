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

export const CredentialsProvider: ProviderModule = {
  name: "credentials",

  getImport() {
    return `
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
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

        //  Fetch full Prisma User directly
        const user = (await prisma.user.findUnique({
          where: { email },
        })) as userType | null;

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
    return [
      "bcrypt",
    ];
  },
};
