import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Récupérer toutes les catégories distinctes
    const categories = await prisma.wordList.findMany({
      select: {
        category: true,
      },
      distinct: ["category"], // Assurez-vous que les catégories sont uniques
    });

    // Extraire uniquement les noms des catégories
    const categoryNames = categories.map((wordList) => wordList.category);

    return NextResponse.json(categoryNames, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
