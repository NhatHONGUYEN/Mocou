// auth.config.ts
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
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

        // 2. Vérifiez si le mot de passe est correct
        if (!user.password) {
          throw new Error("Aucun mot de passe défini pour cet utilisateur.");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Mot de passe incorrect.");
        }

        // 3. Retournez l'utilisateur si tout est valide
        return user;
      },
    }),
  ],
  session: { strategy: "jwt" }, // Utilisez JWT pour la session
  secret: process.env.AUTH_SECRET, // Clé secrète pour signer les tokens
} satisfies NextAuthConfig;
