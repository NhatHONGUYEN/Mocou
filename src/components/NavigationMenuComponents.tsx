"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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

export default function NavigationMenuComponents() {
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
    </NavigationMenu>
  );
}
