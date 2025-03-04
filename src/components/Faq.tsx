import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function Faq() {
  // Questions que vous vous posez peut-être...
  const faqItems = [
    {
      question: "🤔 Comment je gagne des points dans le jeu ?",
      answer:
        "C'est super simple ! Chaque fois que vous trouvez la bonne traduction d'un mot, vous gagnez un point. Si vous créez un compte (c'est gratuit et rapide 😉), vos scores sont sauvegardés et vous pouvez voir vos progrès au fil du temps. Vous pourrez même comparer vos résultats avec ceux des autres joueurs et peut-être grimper dans notre classement !",
    },
    {
      question:
        "🌍 Est-ce que je peux apprendre d'autres langues que le coréen ?",
      answer:
        "Pour le moment, on se concentre sur le coréen (안녕하세요!). Mais entre nous, on a plein d'idées pour ajouter d'autres langues bientôt ! Vous avez une langue que vous aimeriez apprendre en particulier ? Dites-le nous, votre suggestion pourrait bien devenir notre prochaine priorité !",
    },
    {
      question: "🐶 Qui est ce petit chien adorable dans l'application ?",
      answer:
        "Ah, vous avez rencontré Pochacco ! C'est notre petit compagnon, un personnage de Sanrio connu comme 'le chiot sportif'. Avec son énergie débordante et sa personnalité enjouée, il est parfait pour vous accompagner dans votre aventure linguistique ! Il sera là pour célébrer vos victoires, vous encourager après une erreur, et rendre votre apprentissage plus amusant. Considérez-le comme votre coach personnel de coréen... mais en plus mignon ! 🎯",
    },
  ];

  return (
    <section className="py-32" id="faq">
      <div className="container space-y-16">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
            Questions fréquentes 💬
          </h2>
          <p className="text-muted-foreground lg:text-lg">
            Vous vous posez des questions sur Mocou ? On a sûrement la réponse
            ici ! Et si vous ne trouvez pas ce que vous cherchez, n&apos;hésitez
            pas à nous écrire, on adore discuter avec nos utilisateurs. 📨
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="hover:text-foreground/60 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Vous avez d&apos;autres questions ?{" "}
            <Link
              href="#contact"
              className="font-medium underline underline-offset-4"
            >
              Contactez-moi
            </Link>{" "}
            et je vous répondrai personnellement avec plaisir ! 😊
          </p>
        </div>
      </div>
    </section>
  );
}
