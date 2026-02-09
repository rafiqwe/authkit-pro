import fs from "fs";
import path from "path";

export function injectAuthConfig(ans) {
    let providers = "";
    if (ans.google) {
        providers += `
import GoogleProvider from "next-auth/providers/google";
`;
    }
    if (ans.credentials) {
        providers += `
import CredentialsProvider from "next-auth/providers/credentials";
`;
    }
    let providerConfig = "";
    if (ans.google) {
        providerConfig += `
GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!
}),
`;
    }
    if (ans.credentials) {
        providerConfig += `
CredentialsProvider({
  name: "Credentials",
  credentials: {},
  async authorize() {
    return { id: "1", name: "User" };
  }
}),
`;
    }
    const file = `
import NextAuth from "next-auth";
${providers}

export const authOptions = {
  providers: [
    ${providerConfig}
  ]
};

export default NextAuth(authOptions);
`;
    const dest = path.join(process.cwd(), "lib/auth.ts");
    fs.mkdirSync("lib", { recursive: true });
    fs.writeFileSync(dest, file);
}
