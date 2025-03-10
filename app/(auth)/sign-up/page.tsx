"use client"; // Ce composant utilise des hooks, donc il doit être un Client Component

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { signUpSchema } from "@/lib/validations/auth";
import FADE_DOWN_ANIMATION_VARIANTS from "../../../animation/FADE_DOWN_ANIMATION_VARIANTS";

export default function SignUpPage() {
  const router = useRouter();

  // Initialisation de useForm avec Zod
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      const response = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.message || "Une erreur s'est produite lors de l'inscription."
        );
      }
      toast({
        title: "Inscription réussie!",
        description: "Vous êtes maintenant inscrit.",
      });

      router.push("/sign-in"); // Redirigez l'utilisateur vers la page de connexion après l'inscription
    } catch (err) {
      if (err instanceof Error) {
        form.setError("root", { message: err.message });
      } else {
        form.setError("root", {
          message: "Une erreur inconnue s'est produite.",
        });
      }
    }
  };

  return (
    <FADE_DOWN_ANIMATION_VARIANTS>
      <div className="flex  py-32 items-center justify-center ">
        <Card className=" p-8  w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Inscription</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Champ Nom */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre nom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                S&apos;inscrire
              </Button>
            </form>
          </Form>
          <p className="mt-4 text-center text-sm ">
            Déjà un compte ?{" "}
            <Link href="/sign-in" className="text-mute hover:underline">
              Se connecter
            </Link>
          </p>
        </Card>
      </div>
    </FADE_DOWN_ANIMATION_VARIANTS>
  );
}
