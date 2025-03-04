import { InfiniteSlider } from "../ui/infinite-slider";
import Image from "next/image";

export default function InfiniteSliderContent() {
  return (
    <InfiniteSlider gap={40} reverse>
      {Array(5)
        .fill("/category.gif") // Remplacez par le chemin de votre image
        .map((imgSrc, idx) => (
          <div key={idx} className=" flex items-center justify-center">
            <Image
              src={imgSrc}
              alt="Mocou mascot"
              width={200}
              height={80}
              className="object-cover"
            />
          </div>
        ))}
    </InfiniteSlider>
  );
}
