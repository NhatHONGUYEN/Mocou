import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar
import HeaderUserButton from "./HeaderUserButton";
import NavigationMenuComponents from "./NavigationMenuComponents";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { Menu } from "lucide-react"; // Importez une icône de menu pour le déclencheur du Sheet
import { Button } from "./ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { infos, scores } from "@/lib/data";

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

export default function Header() {
  return (
    <section className="py-4">
      <div className="container">
        <nav className="flex items-center justify-between">
          <Link href={"/"} className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/logo.jpg" alt="Logo" />
              <AvatarFallback>M</AvatarFallback>{" "}
            </Avatar>
            <span className="text-lg font-semibold">Mocou</span>
          </Link>
          <NavigationMenuComponents />
          <HeaderUserButton />
          {/* Affichage pour les écrans mobiles */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top">
                <SheetHeader>
                  <SheetTitle>Menu Utilisateur</SheetTitle>
                  <SheetDescription>
                    Connectez-vous ou inscrivez-vous pour accéder à plus de
                    fonctionnalités.
                  </SheetDescription>
                </SheetHeader>

                <Accordion type="single" collapsible className="mt-4">
                  <AccordionItem value="lessons">
                    <AccordionTrigger>Leçons</AccordionTrigger>
                    <AccordionContent>
                      <ul className="grid w-96 gap-3 p-4">
                        {lessons.map((lesson) => (
                          <li key={lesson.title}>
                            <Link
                              href={lesson.href}
                              className="text-mute hover:underline"
                            >
                              <strong>{lesson.title}:</strong>{" "}
                              {lesson.description}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible className="mt-4">
                  <AccordionItem value="about">
                    <AccordionTrigger>About</AccordionTrigger>
                    <AccordionContent>
                      <ul className="grid w-96 gap-3 p-4">
                        {infos.map((info) => (
                          <li key={info.title}>
                            <Link
                              href={info.href}
                              className="text-mute hover:underline"
                            >
                              <strong>{info.title}</strong> {info.description}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible className="mt-4">
                  <AccordionItem value="scores">
                    <AccordionTrigger>Scores</AccordionTrigger>
                    <AccordionContent>
                      <ul className="grid w-96 gap-3 p-4">
                        {scores.map((score) => (
                          <li key={score.title}>
                            <Link
                              href={score.href}
                              className="text-mute hover:underline"
                            >
                              <strong>{score.title}:</strong>{" "}
                              {score.description}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex flex-col gap-4 mt-6">
                  <Button asChild size="sm">
                    <Link href="/sign-in">Se Connecter</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/sign-up">S&apos;inscrire</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </section>
  );
}
