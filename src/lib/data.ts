// Liste des leçons par catégorie
export const lessons: { title: string; href: string; description: string }[] = [
  {
    title: "Animaux",
    href: "/lessons/Animaux",
    description:
      "Apprenez le vocabulaire des animaux communs pour enrichir votre communication quotidienne.",
  },
  {
    title: "Aliments",
    href: "/lessons/Aliments",
    description:
      "Découvrez comment nommer les aliments et les plats dans différentes langues.",
  },
  {
    title: "Objets-du-quotidien",
    href: "/lessons/Objets-du-quotidien",
    description:
      "Familiarisez-vous avec le vocabulaire des objets que nous utilisons tous les jours.",
  },
];

export const scores: { title: string; href: string; description: string }[] = [
  {
    title: "Historique des scores",
    href: "/history",
    description: "Consultez vos scores précédents et suivez votre progression.",
  },
  {
    title: "Tout les scores",
    href: "/leaderboard",
    description:
      "Découvrez comment vous vous situez par rapport aux autres joueurs.",
  },
];

export const infos: { title: string; href: string; description: string }[] = [
  {
    title: "A propos",
    href: "#about",
    description:
      "Découvrez notre mission et apprenez-en plus sur notre plateforme d'apprentissage des langues.",
  },
  {
    title: "Faq",
    href: "#faq",
    description:
      "Des questions sur Mocou ? Consultez nos réponses aux interrogations les plus courantes.",
  },

  {
    title: "Contact",
    href: "#contact",
    description:
      "Besoin d'aide ou vous avez des suggestions? N'hésitez pas à nous contacter.",
  },
];

// Titres des leçons pour l'affichage
export const lessonTitles: Record<string, string> = {
  animaux: "Animaux",
  aliments: "Aliments",
  "objets-du-quotidien": "Objets du quotidien",
};
