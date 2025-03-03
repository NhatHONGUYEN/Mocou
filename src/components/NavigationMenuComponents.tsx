"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useSession } from "next-auth/react"; // Ajout de l'import useSession
import ListItem from "./ui/listItem";

// Liste des leçons par catégorie
const lessons: { title: string; href: string; description: string }[] = [
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

const scores: { title: string; href: string; description: string }[] = [
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

export default function NavigationMenuComponents() {
  // Récupération de l'état de la session
  const { data: session } = useSession();

  return (
    <NavigationMenu className="z-[5]">
      <NavigationMenuList>
        {/* Élément : Leçons */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="m750:max-w-[80px] m750:text-xs">
            Leçons
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {lessons.map((lesson) => (
                <ListItem
                  key={lesson.title}
                  title={lesson.title}
                  href={lesson.href}
                >
                  {lesson.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        {/* Élément : About */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="m750:max-w-[80px] m750:text-xs">
            About
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {lessons.map((lesson) => (
                <ListItem
                  key={lesson.title}
                  title={lesson.title}
                  href={lesson.href}
                >
                  {lesson.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      {/* Afficher le menu Scores uniquement si l'utilisateur est connecté */}
      {session && (
        <NavigationMenuList>
          {/* Élément : Score */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="m750:max-w-[80px] m750:text-xs">
              Scores
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {scores.map((score) => (
                  <ListItem
                    key={score.title}
                    title={score.title}
                    href={score.href}
                  >
                    {score.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      )}
    </NavigationMenu>
  );
}
