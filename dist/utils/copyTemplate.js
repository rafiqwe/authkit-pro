import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
export async function copyTemplate() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const templatePath = path.resolve(__dirname, "../../templates/app");
    const projectRoot = process.cwd();
    await fs.copy(templatePath, projectRoot, {
        overwrite: false,
        errorOnExist: false
    });
}
