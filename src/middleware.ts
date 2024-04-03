import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname === "/admin") {
        return token?.role === "admin";
      }

      if (req.nextUrl.pathname === "/sign-in" && token) {
        console.log("token", token);
        NextResponse.redirect(new URL("/account", req.url));
      }

      return Boolean(token);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
});
export const config = {
  matcher: [
    // (account) paths
    "/account",
    "/orders",
    "/admin",
    "/sign-in",
    "/sign-up",
  ],
};
