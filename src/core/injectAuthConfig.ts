import { AuthCLIConfig, Database } from "../types/config.js";
import { loadProviders } from "../generators/providers/index.js";
import { injectDynamicRoute } from "./injectDynamicRoute.js";
import { write } from "../utils/write.js";

export function injectAuthConfig(ans: AuthCLIConfig) {
  const adapter =
    ans.database === "postgres"
      ? "adapter: PrismaAdapter(prisma),"
      : "adapter: MongoDBAdapter(clientPromise),";

  const importAdapter =
    ans.database === "postgres"
      ? 'import { PrismaAdapter } from "@auth/prisma-adapter";'
      : 'import { MongoDBAdapter } from "@next-auth/mongodb-adapter"\nimport clientPromise from "./mongodb"';

  const prismaImportLogic =
    ans.providers.includes("credentials") ||
    ans.database === "mongodb" ||
    ans.database === "none";

  const PrismaImport = prismaImportLogic
    ? ""
    : 'import { prisma } from "@/lib/prisma";';

  const providers = loadProviders(ans.providers, ans.database);

  const file = `
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
${providers.map((p) => p.getImport()).join("\n")}
${importAdapter}
${PrismaImport}

export const authOptions: NextAuthOptions = {
  ${adapter}
  providers: [
    ${providers.map((p) => p.getConfig()).join(",\n")}
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signin" },
};

export default NextAuth(authOptions);
`;

  write(process.cwd(), "lib/auth.ts", file);
  injectDynamicRoute({ engine: ans.engine });
}
