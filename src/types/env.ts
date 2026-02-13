export interface ProjectEnv {
  isNext: boolean;
  usesTS: boolean;
  hasAppRouter: boolean;
  hasTailwind: boolean;
  packageManager: "npm" | "yarn" | "pnpm";
}
