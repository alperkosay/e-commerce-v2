import { Role } from "@/services/api/user/types";
import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      role: Role;
      id: string | number;
      profilePicture?: string;
    } & DefaultSession["user"];
  }
  export interface User extends DefaultUser {
    role: Role;
    id: string | number;
    profilePicture?: string;
  }
}

declare module "next-auth/jwt" {
  export interface JWT extends DefaultJWT {
    role: Role;
    id: string | number;
    profilePicture?: string;
  }
}
