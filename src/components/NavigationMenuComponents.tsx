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
import { lessons } from "./Header";
import { infos, scores } from "@/lib/data";

export default function NavigationMenuComponents() {
  // Récupération de l'état de la session
  const { data: session } = useSession();

  return (
    <div className="hidden lg:flex">
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
                {infos.map((info) => (
                  <ListItem
                    key={info.title}
                    title={info.title}
                    href={info.href}
                  >
                    {info.description}
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
    </div>
  );
}
