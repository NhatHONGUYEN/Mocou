"use client";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

import Link from "next/link";

import FADE_DOWN_ANIMATION_VARIANTS from "../../../animation/FADE_DOWN_ANIMATION_VARIANTS";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const FooterContent = () => {
  return (
    <section className="py-16">
      <FADE_DOWN_ANIMATION_VARIANTS>
        <div className="container">
          <footer>
            <div className="flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
              <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
                <div>
                  <span className="flex items-center justify-center gap-4 lg:justify-start">
                    <Avatar>
                      <AvatarImage src="/logo.jpg" alt="Logo" />
                      <AvatarFallback>M</AvatarFallback>{" "}
                    </Avatar>
                    <span className="text-lg font-semibold">Mocou</span>
                  </span>
                  <p className="mt-6 text-center md:text-left">
                    Rejoignez Mocou dès maintenant et plongez dans
                    l'apprentissage du coréen ! 🇰🇷 Avec notre compagnon
                    Pochacco, mémorisez du vocabulaire tout en vous amusant. Une
                    aventure linguistique ludique vous attend - prêt à relever
                    le défi ?
                  </p>
                </div>
                <ul className="flex items-center space-x-6 ">
                  {sections[1].links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {}
                        {"icon" in link && <link.icon className="size-6" />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-6 lg:gap-10 lg:ml-40">
                {sections.map((section, sectionIdx) => (
                  <div key={sectionIdx}>
                    <h3 className="mb-6 font-bold">{section.title}</h3>
                    <ul className="space-y-4">
                      {section.links.map((link, linkIdx) => (
                        <li key={linkIdx} className="hover:text-primary">
                          {section.title === "Social" ? (
                            <Link
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.name}
                            </Link>
                          ) : (
                            <Link href={link.href}>{link.name}</Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-20 flex flex-col justify-between gap-4  text-center text-sm font-medium  lg:flex-row lg:items-center lg:text-left">
              <p>© 2024 Nhat.deV. All rights reserved.</p>
              <div className="flex justify-center gap-4 lg:justify-start">
                <p> Terms and Conditions</p>

                <p> Privacy Policy</p>
              </div>
            </div>
          </footer>
        </div>
      </FADE_DOWN_ANIMATION_VARIANTS>
    </section>
  );
};

export const sections = [
  {
    title: "Leçons",
    links: [
      { name: "Animaux", href: "/lessons/Animaux" },
      { name: "Aliments", href: "/lessons/Aliments" },
      { name: "Objets-du-quotidien", href: "/lessons/Objets-du-quotidien" },
    ],
  },
  {
    title: "Social",
    links: [
      {
        name: "Instagram",
        href: "https://www.instagram.com/hnnq.dev/",
        icon: Instagram,
      },
      { name: "Github", href: "https://github.com/NhatHONGUYEN", icon: Github },
      { name: "Twitter", href: "https://x.com/Nhatflix_", icon: Twitter },
      {
        name: "Linkedin",
        href: "https://www.linkedin.com/in/nhat-quan-ho-nguyen/",
        icon: Linkedin,
      },
    ],
  },
];
