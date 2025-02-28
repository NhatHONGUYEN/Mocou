import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";

export default function NoUserHero() {
  return (
    <section className=" pt-32 pb-32">
      <div className="container">
        <div className="grid grid-cols-1 items-center justify-center gap-12 lg:grid-cols-[minmax(33.75rem,_1fr)_1.5fr] lg:gap-8">
          <div>
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl leading-tight text-foreground md:text-5xl lg:text-[3.5rem]">
                Découvrez les mots en coréen !
              </h1>
              <p className="mb-5 text-lg text-foreground">
                Bienvenue dans Mocou, un jeu amusant pour apprendre le coréen
                avec notre adorable ami, le chien Pochacco ! Explorez et trouvez
                les mots cachés tout en développant vos compétences
                linguistiques. Amusez-vous et progressez à votre rythme !
              </p>
              <div>
                <div className="flex flex-col items-center gap-4 lg:flex-row">
                  <div className="shrink-0">
                    <Button asChild>
                      <Link href="/game">Jouer</Link>
                    </Button>
                  </div>
                  <Button
                    asChild
                    className="group flex h-fit items-center gap-2"
                  >
                    <Link href="/sign-up">
                      <p>Voir plus</p>
                      <ChevronRight className="h-4 w-4 shrink-0 stroke-foreground transition-transform group-hover:translate-x-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end ">
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
