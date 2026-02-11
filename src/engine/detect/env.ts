import fs from "fs";
import path from "path";
import { ProjectEnv } from "../../types/env.js";


function detectPackageManager(): "npm" | "yarn" | "pnpm" {
  if (fs.existsSync("pnpm-lock.yaml")) return "pnpm";
  if (fs.existsSync("yarn.lock")) return "yarn";
  return "npm";
}

function detectNext(): boolean {
  if (!fs.existsSync("package.json")) return false;

  const pkg = JSON.parse(
    fs.readFileSync("package.json", "utf-8")
  );

  return !!pkg.dependencies?.next || !!pkg.devDependencies?.next;
}

function detectTS(): boolean {
  return fs.existsSync("tsconfig.json");
}

function detectAppRouter(): boolean {
  return fs.existsSync(path.join(process.cwd(), "app"));
}

function detectTailwind(): boolean {
  return fs.existsSync("tailwind.config.js") ||
         fs.existsSync("tailwind.config.ts");
}

export function detectEnv(): ProjectEnv {
  return {
    isNext: detectNext(),
    usesTS: detectTS(),
    hasAppRouter: detectAppRouter(),
    hasTailwind: detectTailwind(),
    packageManager: detectPackageManager()
  };
}
