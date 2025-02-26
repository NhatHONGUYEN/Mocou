import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

export default function NoUserHero() {
  return (
    <section className="dark bg-background bg-[url(/images/block/noise.png)] py-12 font-sans md:py-20">
      <div className="container">
        <div className="grid grid-cols-1 items-center justify-center gap-12 lg:grid-cols-[minmax(33.75rem,_1fr)_1.5fr] lg:gap-8">
          <div>
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl leading-tight text-foreground md:text-5xl lg:text-[3.5rem]">
                Anticipate greater value from your billing
              </h1>
              <p className="mb-5 text-lg text-foreground">
                Our service is a usage-based billing platform designed to
                accelerate your product launches. Effortlessly shape your
                pricing today and refine it with confidence tomorrow.
              </p>
              <div>
                <div className="flex flex-col items-center gap-4 lg:flex-row">
                  <div className="shrink-0">
                    <Button
                      asChild
                      className="block h-fit w-fit rounded-full px-6 py-3.5 font-mono text-[0.8125rem] font-medium uppercase leading-4 tracking-widest"
                    >
                      <a href="#">Get a Demo</a>
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    asChild
                    className="group flex h-fit items-center gap-2"
                  >
                    <a href="#">
                      <p className="font-mono text-sm font-medium uppercase text-foreground">
                        GUIDE TO EMBRACING USAGE-BASED PRICING
                      </p>
                      <ChevronRight className="h-4 w-4 shrink-0 stroke-foreground transition-transform group-hover:translate-x-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="relative ml-auto mr-auto aspect-[1.28581291_/_1] w-full max-w-[37.25rem] lg:ml-auto lg:mr-0">
              <div className="relative mx-auto aspect-[1.020365896_/_1] h-full w-[79.35%] max-w-[29.5625rem] overflow-hidden rounded-3xl">
                <Image
                  src="https://shadcnblocks.com/images/block/placeholder-1.svg"
                  alt=""
                  className="relative z-10 w-full object-cover"
                  width={1185}
                  height={1160}
                />
              </div>
              <div className="absolute -left-[-2%] top-[19.84%] z-30 aspect-[1.765043789_/_1] w-[30.49%] max-w-[11.875rem] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="https://shadcnblocks.com/images/block/placeholder-2.svg"
                  alt=""
                  className="size-full object-cover"
                  width={400}
                  height={225}
                />
              </div>
              <div className="absolute left-[0%] top-[55%] z-30 aspect-[1.776555024_/_1] w-[43.6%] max-w-[16.375rem] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="https://shadcnblocks.com/images/block/placeholder-3.svg"
                  alt=""
                  className="size-full object-cover"
                  width={400}
                  height={225}
                />
              </div>
              <div className="absolute right-[0%] top-[40%] z-30 aspect-[1.170212766_/_1] w-[26.48%] max-w-[10.3125rem] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="https://shadcnblocks.com/images/block/placeholder-4.svg"
                  alt=""
                  className="size-full object-cover"
                  width={400}
                  height={342}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
