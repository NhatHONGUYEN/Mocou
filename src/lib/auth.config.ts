import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

export const authConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          if (!user) {
            throw new Error("Utilisateur non trouvé.");
          }

          if (!user.password) {
            throw new Error("Aucun mot de passe défini pour cet utilisateur.");
          }

          console.log("Hash stocké :", user.password);
          console.log("Mot de passe fourni :", credentials.password);

          const isValidPassword = await argon2.verify(
            user.password,
            credentials.password as string
          );

          if (!isValidPassword) {
            throw new Error("Mot de passe incorrect.");
          }

          return {
            id: String(user.id),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Erreur lors de l'authentification :", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.sub = String(user.id);
      }
      return token;
    },
  },

  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
