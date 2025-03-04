import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/lib/data";
import Link from "next/link";

export default function Faq() {
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
