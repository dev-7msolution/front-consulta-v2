import NextAuth, { type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { api } from "@/lib/api"


export const authOptions: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials.password) {
            return null
          }
          try {
            const response = await api.post("/login", {
              email: credentials.email,
              password: credentials.password,
            })
            const user = response.data
      
            if (user && user.token) {
              return {
                id: user.user.id,
                name: user.user.name,
                email: user.user.email,
                token: user.token,
              }
            }
            return null
          } catch (error) {
            console.error("Erro na autorização:", error)
            return null
          }
        },
      }),
    ],
    pages: {
      signIn: "/login",
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id as string;
          // user object is only available on first sign in
          token.accessToken = user.token
        }
        return token
      },
      async session({ session, token }) {
        if (token.accessToken) {
          session.user.id = token.id as string;
          session.accessToken = token.accessToken as string;
        }
        return session
      },
    },
  }