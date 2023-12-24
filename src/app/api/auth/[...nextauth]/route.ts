import api from "@/services/api";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.username && !credentials?.password) throw new Error("Eksik");
                const user = await api.auth.findByCredentials({
                    username: credentials?.username,
                    password: credentials?.password
                });
                console.log('user', user)
                if (!user) {
                    return null
                }


                return {
                    id: user.id.toString(),
                    name: user.attributes.username,
                }
            },
        })
    ]
})

export { handler as GET, handler as POST }