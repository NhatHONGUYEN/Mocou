import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

export default function UserHero() {
  return (
    <div>
      {" "}
      <Button
        asChild
        className="block h-fit w-fit rounded-full px-6 py-3.5 font-mono text-[0.8125rem] font-medium uppercase leading-4 tracking-widest"
      >
        <Link href="/game">Play</Link>
      </Button>
      <Button
        variant="ghost"
        asChild
        className="group flex h-fit items-center gap-2"
      >
        <Link href="/leaderboard">
          <p className="font-mono text-sm font-medium uppercase text-foreground">
            Voir les scores
          </p>
          <ChevronRight className="h-4 w-4 shrink-0 stroke-foreground transition-transform group-hover:translate-x-2" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        asChild
        className="group flex h-fit items-center gap-2"
      >
        <Link href="/history">
          <p className="font-mono text-sm font-medium uppercase text-foreground">
            Voir l(historique)
          </p>
          <ChevronRight className="h-4 w-4 shrink-0 stroke-foreground transition-transform group-hover:translate-x-2" />
        </Link>
      </Button>
    </div>
  );
}
