import GameCategory from "@/components/GameCategory";
import FADE_DOWN_ANIMATION_VARIANTS from "../../../animation/FADE_DOWN_ANIMATION_VARIANTS";

export default async function GameCategoryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const category = await props.params;

  return (
    <>
      <FADE_DOWN_ANIMATION_VARIANTS>
        <GameCategory category={category.slug} />
      </FADE_DOWN_ANIMATION_VARIANTS>
    </>
  );
}
