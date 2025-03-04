import Hero from "@/components/Hero";
import FADE_DOWN_ANIMATION_VARIANTS from "../animation/FADE_DOWN_ANIMATION_VARIANTS";
import { About } from "@/components/About";

export default function Home() {
  return (
    <>
      <FADE_DOWN_ANIMATION_VARIANTS>
        <Hero />
        <About />
      </FADE_DOWN_ANIMATION_VARIANTS>
    </>
  );
}
