import { write } from "../utils/write.js";

export function injectUserType() {
  const file = `
export type userType = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
};

   `;

  write(process.cwd(), "lib/userType.ts", file);
}
