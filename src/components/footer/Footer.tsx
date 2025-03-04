// Footer.js
"use client";

import { FooterContent } from "./FooterContent";
import InfiniteSliderContent from "./InfiniteSliderContent";

export default function Footer() {
  return (
    <section className="md:py-32">
      <div className="container mx-auto">
        <footer>
          <InfiniteSliderContent />
          <FooterContent />
        </footer>
      </div>
    </section>
  );
}
