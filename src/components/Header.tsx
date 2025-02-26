import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <section className="py-4">
      <div className="container">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              src="https://www.shadcnblocks.com/images/block/block-1.svg"
              className="w-8"
              alt="logo"
              width={32}
              height={32}
            />
            <span className="text-lg font-semibold">Mocou</span>
          </Link>

          {/* Boutons de connexion et d'inscription */}
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={"/sign-in"}>Log In</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={"/sign-up"}>Sign Up</Link>
            </Button>
          </div>
        </nav>
      </div>
    </section>
  );
}
