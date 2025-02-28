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
              <h1 className="text-4xl  text-foreground md:text-5xl lg:text-[3.5rem]">
                Trouvez les mots cachés
              </h1>
              <p className="mb-5 text-lg text-foreground">
                Ce jeu est conçu pour tester votre capacité à trouver des mots
                cachés. Amusez-vous à découvrir tous les mots et améliorez vos
                compétences linguistiques.
              </p>
              <div>
                <div className="flex flex-col items-center gap-4 lg:flex-row">
                  <div className="shrink-0 w-full sm:w-auto">
                    <Button asChild className="w-full sm:w-auto">
                      <Link href="/game">Play</Link>
                    </Button>
                  </div>
                  <Button
                    asChild
                    className="group flex h-fit items-center gap-2 w-full sm:w-auto" // Ajoutez w-full pour mobile
                  >
                    <Link href="/leaderboard">
                      <p>Voir les scores</p>
                      <ChevronRight className="h-4 w-4 shrink-0 stroke-foreground transition-transform group-hover:translate-x-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
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
