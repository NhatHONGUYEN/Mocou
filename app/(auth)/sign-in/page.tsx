// app/sign-in/page.tsx
"use client"; // Ce composant utilise des hooks, donc il doit être un Client Component

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

// Schéma de validation Zod
const signInSchema = z.object({
  email: z.string().email("Veuillez entrer un email valide."),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});

export default function SignInPage() {
  const router = useRouter();

  // Initialisation de useForm avec Zod
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    console.log("Tentative de connexion avec les valeurs :", values);
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result?.error) {
      console.error("Erreur de connexion :", result.error);
      form.setError("root", { message: result.error });
    } else {
      console.log("Connexion réussie, redirection vers la page d'accueil");
      router.push("/");
      toast({
        title: "Re-Bonjour!",
        description: "Vous êtes maintenant connecté.",
      });
    }
  };
  return (
    <div className="flex py-32 items-center justify-center ">
      <Card className=" p-8  w-96">
        <h1 className="text-3xl  mb-6 text-center">Connexion</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Champ Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Champ Mot de passe */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Votre mot de passe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message d'erreur global */}
            {form.formState.errors.root && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.root.message}
              </p>
            )}

            {/* Bouton de soumission */}
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </form>
        </Form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Pas encore de compte ?{" "}
          <Link href="/sign-up" className="text-blue-500 hover:underline">
            S&apos;inscrire
          </Link>
        </p>
      </Card>
    </div>
  );
}
