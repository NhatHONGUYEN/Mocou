import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function NoUserHero() {
  return (
    <section className=" pt-52 pb-32">
      <div className="container">
        <div className="grid grid-cols-1 items-center justify-center gap-12 lg:grid-cols-[minmax(33.75rem,_1fr)_1.5fr] lg:gap-8">
          <div>
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl leading-tight text-foreground md:text-5xl lg:text-[3.5rem]">
                Trouvez les mots cachés
              </h1>
              <p className="mb-5 text-lg text-foreground">
                Ce jeu est conçu pour tester votre capacité à trouver des mots
                cachés. Amusez-vous à découvrir tous les mots et améliorez vos
                compétences linguistiques.
              </p>
              <div>
                <div className="flex flex-col items-center gap-4 lg:flex-row">
                  <div className="shrink-0">
                    <Button
                      asChild
                      className="block h-fit w-fit rounded-full px-6 py-3.5 font-mono text-[0.8125rem] font-medium uppercase leading-4 tracking-widest"
                    >
                      <Link href="/game">Play</Link>
                    </Button>
                  </div>
                  <Button
                    asChild
                    className="group flex h-fit items-center gap-2"
                  >
                    <Link href="#">
                      <p className="font-mono text-sm font-medium uppercase text-foreground">
                        Wants More?
                      </p>
                      <ChevronRight className="h-4 w-4 shrink-0 stroke-foreground transition-transform group-hover:translate-x-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Image
              src="/1348441.png"
              alt=""
              className="w-full border-8 border-white rounded-md object-cover"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
