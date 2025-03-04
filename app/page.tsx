import Hero from "@/components/Hero";
import FADE_DOWN_ANIMATION_VARIANTS from "../animation/FADE_DOWN_ANIMATION_VARIANTS";
import { About } from "@/components/About";
import Faq from "@/components/Faq";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <FADE_DOWN_ANIMATION_VARIANTS>
        <Hero />
        <About />
        <Faq />
        <Footer />
      </FADE_DOWN_ANIMATION_VARIANTS>
    </>
  );
}
