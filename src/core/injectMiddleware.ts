import { write } from "../utils/write.js";

export function injectMiddleware() {
  const file = `
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
    error: "/login",
  },
});

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/settings/:path*",
    "/profile/:path*",
    // Add other protected routes here
  ],
};

`;

  write(process.cwd(), "middleware.ts", file);
}
