import fs from "fs";
import crypto from "crypto";
import chalk from "chalk";

export function generateEnv() {
  const secret = crypto.randomBytes(32).toString("hex");

  const content = `
NEXTAUTH_SECRET=${secret}
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
`;

  fs.writeFileSync(".env.local", content);

  console.log(chalk.green(".env.local created"));
}
