import ListWord from "@/components/ListWord";

export default async function GameCategoryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const category = await props.params;

  return (
    <div>
      <ListWord category={category.slug} />
    </div>
  );
}
