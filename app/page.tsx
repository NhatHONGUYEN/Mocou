import Hero from "@/components/Hero";
import FADE_DOWN_ANIMATION_VARIANTS from "../animation/FADE_DOWN_ANIMATION_VARIANTS";
import { About } from "@/components/About";
import Faq from "@/components/Faq";

export default function Home() {
  return (
    <>
      <FADE_DOWN_ANIMATION_VARIANTS>
        <Hero />
        <About />
        <Faq />
      </FADE_DOWN_ANIMATION_VARIANTS>
    </>
  );
}
