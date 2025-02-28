import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar
import HeaderUserButton from "./HeaderUserButton";

export default function Header() {
  return (
    <section className="py-4">
      <div className="container">
        <nav className="flex items-center justify-between">
          <Link href={"/"} className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/logo.jpg" alt="Logo" />
              <AvatarFallback>M</AvatarFallback>{" "}
            </Avatar>
            <span className="text-lg font-semibold">Mocou</span>
          </Link>

          <HeaderUserButton />
        </nav>
      </div>
    </section>
  );
}
