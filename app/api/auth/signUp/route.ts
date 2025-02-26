// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  try {
    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Un utilisateur avec cet email existe déjà." },
        { status: 400 }
      );
    }

    // Créez un nouvel utilisateur
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return NextResponse.json(
      { message: "Utilisateur créé avec succès.", user },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Une erreur s'est produite lors de l'inscription." },
      { status: 500 }
    );
  }
}
