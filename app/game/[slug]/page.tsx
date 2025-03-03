import GameCategory from "@/components/GameCategory";

export default async function GameCategoryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const category = await props.params;

  return (
    <div>
      <GameCategory category={category.slug} />
    </div>
  );
}
