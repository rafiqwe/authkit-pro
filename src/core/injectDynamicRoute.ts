import fs from "fs";
import path from "path";
import { write } from "../utils/write.js";
import { Engine } from "../types/config.js";

export function injectDynamicRoute({ engine }: { engine: Engine }) {
  // auth route
  let fileContent = "";
  if (engine === "nextauth") {
    fileContent = `
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
  `;
  } else {
    fileContent = `
//app/api/auth/[...authjs]/route.ts
import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;

    `;
  }

  // check route
  const checkRouteFile = `
// app/api/auth/check/route.ts
import { NextResponse } from "next/server";
${
  engine === "nextauth"
    ? `import { getServerSession } from "next-auth";\nimport { authOptions } from "@/lib/auth";`
    : `import { auth } from "@/lib/auth";`
}

export async function GET(req: Request) {
  ${engine === "nextauth" ? "const session = await getServerSession(authOptions);" : "const session = await auth();"}

  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json({ user: session.user });
}

`;

  write(process.cwd(), "app/api/auth/check/route.ts", checkRouteFile);
  write(
    process.cwd(),
    `app/api/auth/[...${engine === "nextauth" ? "nextauth" : "authjs"}]/route.ts`,
    fileContent,
  );
}
