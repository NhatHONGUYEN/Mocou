// validations/auth.ts
import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Adresse email invalide."),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères."),
});
