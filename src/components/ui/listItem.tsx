import React from "react";
import { NavigationMenuLink } from "./navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Créez une interface spécifique pour les props de ListItem
interface ListItemProps
  extends Omit<React.ComponentPropsWithoutRef<"a">, "href"> {
  title: string;
  href: string; // href est requis et doit être une chaîne
}

// Composant ListItem pour afficher les éléments du menu
const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            href={href} // Passez explicitement href au composant Link
            className={cn(
              "hover:bg-accent block text-mtext select-none space-y-1 rounded-base border-2 border-transparent p-3 leading-none no-underline outline-none transition-colors hover:border-border dark:hover:border-darkBorder",
              className
            )}
            {...props}
          >
            <div className="text-base font-heading leading-none">{title}</div>
            <p className="text-muted-foreground font-base line-clamp-2 text-sm leading-snug">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default ListItem;
