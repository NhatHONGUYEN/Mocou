import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Assure-toi d'avoir Prisma configuré

export async function POST(req: Request) {
  try {
    const { userId, score, category } = await req.json();

    if (!userId || score === undefined || !category) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const newScore = await prisma.score.create({
      data: { userId, score, category },
    });

    return NextResponse.json(newScore, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'ajout du score:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId"); // Récupère le paramètre "userId"

    // Si userId est fourni, récupère uniquement les scores de cet utilisateur
    // Sinon, récupère tous les scores
    const category = searchParams.get("category");
    const scores = await prisma.score.findMany({
      where: {
        userId: userId ? userId : undefined, // Filtre par utilisateur si userId est fourni
        category: category ? category : undefined, // Filtre par catégorie si elle est fournie
      },
      orderBy: { score: "desc" },
      include: { user: true },
    });

    return NextResponse.json(scores, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des scores:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
