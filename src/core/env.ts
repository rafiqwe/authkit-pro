import fs from "fs";
import crypto from "crypto";
import chalk from "chalk";

export function generateEnv({ variables }: { variables: string[] }) {
  const secret = crypto.randomBytes(32).toString("hex");

  const content = `
NEXTAUTH_SECRET=${secret}
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/db"
${variables.map((v) => `${v}=`).join("\n")}
`;

  fs.writeFileSync(".env", content);
}
