import { comparePassword } from "@/lib/bcrypt";
import { signInSchema } from "@/lib/validations/auth";
import api from "@/services/api";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        signInSchema.parse(credentials);

        // Get user & check if exists
        const user = await api.user.findUserByName(credentials?.username!);
        if (!user) {
          return null;
        }

        //Check if password match
        const passwordMatch = comparePassword(
          credentials?.password!,
          user.attributes.password
        );
        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id.toString(),
          name: user.attributes.username,
          role: user.attributes.Role!,
          email: user.attributes.email,
          image: user.attributes.profilePicture?.data.attributes.url,
          profilePicture: user.attributes.profilePicture?.data.attributes.url,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.profilePicture = user.profilePicture;
      }
      if (trigger === "update" && session?.profilePicture) {
        token.profilePicture = session.profilePicture;
      }

      return token;
    },
    async session({ session, token }) {
      // session.user.role = token.role
      // session.user.id = token.id
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
