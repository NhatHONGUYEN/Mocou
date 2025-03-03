import Hero from "@/components/Hero";
import FADE_DOWN_ANIMATION_VARIANTS from "../animation/FADE_DOWN_ANIMATION_VARIANTS";

export default function Home() {
  return (
    <>
      <FADE_DOWN_ANIMATION_VARIANTS>
        <Hero />
      </FADE_DOWN_ANIMATION_VARIANTS>
    </>
  );
}
