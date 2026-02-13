import fs from "fs";
import path from "path";
import { authSchema } from "./schema.js";

export function generatePrisma(target: string, db: "postgres") {
  const prismaDir = path.join(target, "prisma");
  fs.mkdirSync(prismaDir, { recursive: true });
  fs.writeFileSync(path.join(prismaDir, "schema.prisma"), authSchema(db));
}
