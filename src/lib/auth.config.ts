import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import argon2 from "argon2"; // 🔄 Remplace bcrypt par argon2
import { prisma } from "./prisma";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Partial<Record<"email" | "password", unknown>>
      ) {
        // 1. Vérifiez si l'utilisateur existe dans la base de données
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) {
          throw new Error("Utilisateur non trouvé.");
        }

        // 2. Vérifiez si le mot de passe est correct avec Argon2
        if (!user.password) {
          throw new Error("Aucun mot de passe défini pour cet utilisateur.");
        }

        const isValidPassword = await argon2.verify(
          user.password, // Hash stocké
          credentials.password as string // Mot de passe fourni
        );

        if (!isValidPassword) {
          throw new Error("Mot de passe incorrect.");
        }

        // 3. Retournez l'utilisateur si tout est valide
        return user;
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub; // Toujours utiliser `token.sub`
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.sub = String(user.id); // S'assurer que `token.sub` est bien défini
      }
      return token;
    },
  },

  session: { strategy: "jwt" }, // Utilisez JWT pour la session
  secret: process.env.AUTH_SECRET, // Clé secrète pour signer les tokens
} satisfies NextAuthConfig;
