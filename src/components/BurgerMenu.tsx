"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { lessons, scores } from "@/lib/data";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { SignOut } from "./signout-button";

export default function BurgerMenu() {
  const { data: session } = useSession();

  return (
    <>
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
                  <ul className="grid xs:w-96 gap-3 p-4">
                    {lessons.map((lesson) => (
                      <li key={lesson.title}>
                        <Link
                          href={lesson.href}
                          className="text-muted hover:underline"
                        >
                          <strong>{lesson.title}:</strong> {lesson.description}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {session && (
              <Accordion type="single" collapsible className="mt-4">
                <AccordionItem value="scores">
                  <AccordionTrigger>Scores</AccordionTrigger>
                  <AccordionContent>
                    <ul className="grid xs:w-96 gap-3 p-4">
                      {scores.map((score) => (
                        <li key={score.title}>
                          <Link
                            href={score.href}
                            className="text-muted hover:underline"
                          >
                            <strong>{score.title}:</strong> {score.description}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {session ? (
              <div className="flex flex-col gap-4 mt-6">
                <SignOut />
              </div>
            ) : (
              <div className="flex flex-col gap-4 mt-6">
                <Button asChild size="sm">
                  <Link href="/sign-in">Se Connecter</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/sign-up">S&apos;inscrire</Link>
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
