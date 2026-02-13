import fs from "fs";
import path from "path";

export const write = (targetDir: string, file: string, content: string) => {
  const full = path.join(targetDir, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
};
