import { loadProviders } from "../../generators/providers/index.js";
import { AuthCLIConfig } from "../../types/config.js";
import { write } from "../../utils/write.js";
import { injectDynamicRoute } from "../injectDynamicRoute.js";

export const injectAuthConfigAuthjs = (ans: AuthCLIConfig) => {
  const adapter =
    ans.database === "postgres"
      ? "adapter: PrismaAdapter(prisma),"
      : "adapter: MongoDBAdapter(clientPromise),";

  const importAdapter =
    ans.database === "postgres"
      ? 'import { PrismaAdapter } from "@auth/prisma-adapter";'
      : 'import { MongoDBAdapter } from "@auth/mongodb-adapter";\nimport clientPromise from "./mongodb"';

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
${providers.map((p) => p.getImport()).join("\n")}
${importAdapter}
${PrismaImport}
export const { handlers, signIn, signOut, auth } = NextAuth({
  ${adapter}
  providers: [
    ${providers.map((p) => p.getConfig()).join(",")}
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

    `;

  const proxy = `
export { auth as proxy } from "@/lib/auth"`;

  write(process.cwd(), "lib/auth.ts", file);
  write(process.cwd(), "proxy.ts", proxy);
  injectDynamicRoute({ engine: ans.engine });
};
