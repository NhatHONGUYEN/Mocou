import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";

export default function UserHero() {
  return (
    <section className=" py-32">
      <div className="container">
        <div className="grid grid-cols-1 items-center justify-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div>
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl md:text-4xl leading-tight text-foreground">
                🎉 Content de vous revoir sur Mocou !
              </h1>
              <p className="mb-5 md:text-lg text-foreground">
                Votre aventure linguistique continue ! Pochacco 🐶 a gardé votre
                place et est impatient de vous aider à progresser. Prêt à
                améliorer votre score aujourd&apos;hui ? Choisissez une
                catégorie et commencez à jouer !
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
                    <Link href="/leaderboard">
                      <p>🏆 Classement</p>
                      <ChevronRight className="h-4 w-4 shrink-0 stroke-foreground transition-transform group-hover:translate-x-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:mx-auto lg:justify-end">
            <Card>
              <CardContent className="p-0">
                <Image
                  src="/images/pochacco.gif"
                  alt="Pochacco"
                  width={450}
                  height={450}
                  className="overflow-hidden rounded-full object-cover"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
