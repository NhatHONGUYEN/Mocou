import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Extraire la catégorie des query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    if (!category) {
      return NextResponse.json(
        { message: 'Le paramètre "category" est requis' },
        { status: 400 }
      );
    }

    // Récupérer les mots de la catégorie spécifiée
    const wordList = await prisma.wordList.findUnique({
      where: {
        category: category,
      },
      include: {
        words: true, // Inclure les mots associés
      },
    });

    if (!wordList) {
      return NextResponse.json(
        { message: "Catégorie non trouvée" },
        { status: 404 }
      );
    }

    // Retourner les mots de la catégorie
    return NextResponse.json(wordList.words, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des mots:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
