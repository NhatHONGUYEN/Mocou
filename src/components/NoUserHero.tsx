import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";

export default function NoUserHero() {
  return (
    <section className=" py-16  sm:py-48">
      <div className="container">
        <div className="grid grid-cols-1 items-center justify-center gap-12 lg:grid-cols-[minmax(33.75rem,_1fr)_1.5fr] lg:gap-8">
          <div>
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl md:text-4xl leading-tight  text-foreground ">
                🇰🇷 Prêt à apprendre le coréen avec Pochacco ?
              </h1>
              <p className="mb-5 md:text-lg text-foreground">
                Annyeong haseyo ! Bienvenue chez Mocou ! Notre Pochacco 🐶 vous
                guidera parmi les mots coréens. Pas de stress - juste du plaisir
                à votre rythme. Prêt pour l&apos;aventure ?
              </p>
              <div>
                <div className="flex flex-col items-center gap-4 md:flex-row">
                  <div className="shrink-0 w-full md:w-auto">
                    <Button asChild className="w-full md:w-auto">
                      <Link href="/game">🎮 C&apos;est parti !</Link>
                    </Button>
                  </div>
                  <Button
                    asChild
                    className="group flex h-fit items-center gap-2 w-full md:w-auto"
                  >
                    <Link href="/sign-up">
                      <p>📝 Créer un compte</p>
                      <ChevronRight className="h-4 w-4 shrink-0 stroke-foreground transition-transform group-hover:translate-x-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:mx-auto lg:justify-end ">
            <Card>
              <CardContent className="p-0">
                <Image
                  src="/pochacco (2).gif"
                  alt="Pochacco"
                  width={400}
                  height={400}
                  className="overflow-hidden rounded-2xl object-cover"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
