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

export const infosUser: { title: string; href: string; description: string }[] =
  [
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

export const faqItems = [
  {
    question: "🤔 Comment je gagne des points dans le jeu ?",
    answer:
      "C'est super simple ! Chaque fois que vous trouvez la bonne traduction d'un mot, vous gagnez un point. Si vous créez un compte (c'est gratuit et rapide 😉), vos scores sont sauvegardés et vous pouvez voir vos progrès au fil du temps. Vous pourrez même comparer vos résultats avec ceux des autres joueurs et peut-être grimper dans notre classement !",
  },
  {
    question:
      "🌍 Est-ce que je peux apprendre d'autres langues que le coréen ?",
    answer:
      "Pour le moment, on se concentre sur le coréen (안녕하세요!). Mais entre nous, on a plein d'idées pour ajouter d'autres langues bientôt ! Vous avez une langue que vous aimeriez apprendre en particulier ? Dites-le nous, votre suggestion pourrait bien devenir notre prochaine priorité !",
  },
  {
    question: "🐶 Qui est ce petit chien adorable dans l'application ?",
    answer:
      "Ah, vous avez rencontré Pochacco ! C'est notre petit compagnon, un personnage de Sanrio connu comme 'le chiot sportif'. Avec son énergie débordante et sa personnalité enjouée, il est parfait pour vous accompagner dans votre aventure linguistique ! Il sera là pour célébrer vos victoires, vous encourager après une erreur, et rendre votre apprentissage plus amusant. Considérez-le comme votre coach personnel de coréen... mais en plus mignon ! 🎯",
  },
];
