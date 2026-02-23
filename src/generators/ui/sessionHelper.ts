import { Engine } from "../../types/config.js";

export function sessionHelper(engine: Engine) {
  const imports =
    engine === "nextauth"
      ? "import { getServerSession } from 'next-auth';\nimport { authOptions } from '@/lib/auth';"
      : "import { auth } from '@/lib/auth';";
  return `
${imports}

export const getSession = () => ${engine === "nextauth" ? "getServerSession(authOptions)" : "auth()"};
`;
}
