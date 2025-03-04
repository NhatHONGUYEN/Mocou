import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card } from "./ui/card";
import Link from "next/link";
import FADE_DOWN_ANIMATION_VARIANTS from "../../animation/FADE_DOWN_ANIMATION_VARIANTS";

export const About = () => {
  return (
    <section className="py-32 " id="about">
      <div className="container">
        <FADE_DOWN_ANIMATION_VARIANTS>
          <div className="mx-auto flex max-w-screen-md flex-col items-center gap-6">
            <h2 className="mb-2 text-balance text-center text-3xl font-semibold lg:text-4xl">
              Apprenez le coréen de façon amusante avec Mocou ! 🎯
            </h2>
            <p className="text-center text-muted-foreground lg:text-lg">
              Bienvenue sur Mocou ! 🇰🇷 Notre jeu interactif vous aide à
              mémoriser du vocabulaire coréen tout en vous amusant. Testez vos
              connaissances, suivez votre progression et défiez vos amis pour
              décrocher le meilleur score. 🏆 Prêt à relever le défi ?
            </p>
            <Button className="mt-6">
              Commencer à jouer
              <ChevronRight className="ml-1 h-4" />
            </Button>
          </div>
        </FADE_DOWN_ANIMATION_VARIANTS>
        <FADE_DOWN_ANIMATION_VARIANTS>
          <div className="mx-auto mt-20 flex max-w-screen-lg grid-cols-1 flex-col gap-6 lg:grid lg:grid-cols-7">
            <Link
              href={"/lessons/Animaux"}
              className="col-span-7 grid rounded-lg bg-muted sm:grid-cols-2"
            >
              <div className="flex flex-col justify-between p-8 lg:p-12">
                <div>
                  <div className="mb-4 text-xs text-muted-foreground">
                    PLONGEZ DANS NOS CATÉGORIES ! 🧩
                  </div>
                  <h3 className="mb-2 text-xl font-medium">
                    Des mondes de vocabulaire à explorer
                  </h3>
                  <p className="text-sm text-muted-foreground lg:text-base">
                    Partez à la découverte des animaux, des couleurs et bien
                    plus ! Chaque mot s&apos;anime avec des images colorées et
                    des indices astucieux pour booster votre apprentissage.
                  </p>
                </div>
                <div className="mt-6 sm:mt-8">
                  <Button>
                    Voir les leçons
                    <ChevronRight className="ml-1 h-4" />
                  </Button>
                </div>
              </div>
              <Card>
                <Image
                  src="/Record.gif"
                  alt="placeholder"
                  className="order-first aspect-video h-full max-h-96 w-full   object-cover rounded-2xl sm:order-last sm:aspect-auto lg:max-h-none "
                  width={500}
                  height={500}
                />
              </Card>
            </Link>

            <Link
              href={"/sign-up"}
              className="group relative rounded-lg bg-muted lg:col-span-3"
            >
              <Button
                size="sm"
                className="absolute right-10 top-7 transition-all duration-200 group-hover:opacity-100 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0"
              >
                <ChevronRight className="h-4" />
              </Button>
              <Card>
                <Image
                  src="/about.png"
                  alt="placeholder"
                  className="max-h-72 rounded-2xl w-full object-cover"
                  width={500}
                  height={500}
                />
              </Card>
              <div className="p-8 lg:p-12">
                <div className="mb-4 text-xs text-muted-foreground">
                  SUIVEZ VOS PROGRÈS 📈
                </div>
                <h3 className="mb-2 text-base">
                  Inscrivez-vous pour sauvegarder vos scores
                </h3>
              </div>
            </Link>
            <Link
              href={"/sign-in"}
              className="grid rounded-lg bg-muted sm:grid-cols-2 lg:col-span-4"
            >
              <Card>
                <Image
                  src="/re-bonjour.gif"
                  alt="placeholder"
                  className="aspect-video h-full max-h-96 w-full rounded-2xl  object-cover sm:aspect-auto lg:max-h-none "
                  width={500}
                  height={500}
                />
              </Card>
              <div className="flex flex-col justify-between p-8 lg:p-12">
                <div>
                  <div className="mb-4 text-xs text-muted-foreground">
                    REJOIGNEZ L&apos;AVENTURE 🚀
                  </div>
                  <h3 className="mb-2 text-base  ">
                    Venez rejoindre Pochacco et vous amuser
                  </h3>
                </div>
                <div className="mt-6 sm:mt-8">
                  <Button>
                    Se connecter
                    <ChevronRight className="ml-1 h-4" />
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </FADE_DOWN_ANIMATION_VARIANTS>
      </div>
    </section>
  );
};
