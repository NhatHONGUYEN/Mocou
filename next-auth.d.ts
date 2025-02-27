import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Ajoute la propriété `id`
      name?: string;
      email?: string;
      image?: string;
    };
  }
}
