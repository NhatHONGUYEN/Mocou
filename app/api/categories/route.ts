import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Récupérer toutes les catégories distinctes avec leurs images
    const categories = await prisma.wordList.findMany({
      select: {
        category: true,
        imageUrl: true, // Ajouter ce champ pour récupérer l'URL de l'image
      },
      distinct: ["category"], // Assurez-vous que les catégories sont uniques
    });

    // Extraire les noms des catégories et les URLs des images
    const categoryData = categories.map((wordList) => ({
      category: wordList.category,
      imageUrl: wordList.imageUrl,
    }));

    return NextResponse.json(categoryData, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
