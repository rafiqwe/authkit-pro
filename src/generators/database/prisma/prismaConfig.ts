import { write } from "../../../utils/write.js";

export function prismaConfig() {
  const prismaConfigFile = `
// prisma.config.ts
import "dotenv/config"
import { defineConfig } from "prisma/config"

export default defineConfig({
  schema: "prisma/schema.prisma",

  datasource: {
    url: process.env.DATABASE_URL!,
  },

  migrations: {
    path: "prisma/migrations",
  },
})


`;

  const prismaTs = `
// lib/prisma.ts
import { PrismaClient } from "@/generated/prisma";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
`;

  write(process.cwd(), "prisma.config.ts", prismaConfigFile);
  write(process.cwd(), "lib/prisma.ts", prismaTs);
}
