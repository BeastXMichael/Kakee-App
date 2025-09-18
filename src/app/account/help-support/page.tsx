
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        q: "How do I earn Koins?",
        a: "You can earn Koins by watching videos, listening to music, playing mini-games, and participating in special events. The more you engage, the more you earn!"
    },
    {
        q: "How do I redeem rewards?",
        a: "Navigate to the 'Rewards' tab to see all available 'Lobangs' and vouchers. If you have enough Koins, you can tap 'Redeem' on any reward you like."
    },
    {
        q: "What is my rank?",
        a: "Your rank is determined by your activity and Koins earned. Higher ranks unlock special benefits and exclusive rewards. Keep engaging to climb the ladder!"
    },
    {
        q: "Is my data safe?",
        a: "Yes, we take your privacy and security very seriously. All your data is encrypted and handled with the utmost care."
    }
]

export default function HelpSupportPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-0 sm:p-4 font-body">
      <div className="max-w-md w-full h-screen sm:h-[812px] bg-background shadow-2xl sm:rounded-[32px] flex flex-col relative overflow-hidden border-4 border-black">
        <header className="p-4 flex items-center justify-between flex-shrink-0">
          <Link href="/account">
            <ChevronLeft className="w-8 h-8 text-gray-700" />
          </Link>
          <h1 className="text-lg font-bold text-gray-800">Help & Support</h1>
          <div className="w-8"></div>
        </header>

        <main className="flex-grow overflow-y-auto no-scrollbar px-4 py-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full bg-white/40 backdrop-blur-sm rounded-lg px-4">
                {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                        <AccordionTrigger>{faq.q}</AccordionTrigger>
                        <AccordionContent>{faq.a}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            <div className="mt-8 text-center">
                <p className="text-muted-foreground">Can't find your answer?</p>
                <Link href="#" className="text-primary font-bold">Contact Support</Link>
            </div>
        </main>
      </div>
    </div>
  );
}
