import Image from "next/image";
import Link from "next/link";
import HeaderUserButton from "./HeaderUserButton";

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
          <HeaderUserButton />
        </nav>
      </div>
    </section>
  );
}
