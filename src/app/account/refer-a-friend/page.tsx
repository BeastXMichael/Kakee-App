
import { ChevronLeft, Copy } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function ReferPage() {
  const referralCode = "KAKEE-GENERAL";

  // This would be a client component to use useToast, but for simplicity we keep it server-side.
  // The toast would show on button click.
  const handleCopy = () => {
    // In a real app, you'd use navigator.clipboard.writeText
    console.log("Copied!");
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-0 sm:p-4 font-body">
      <div className="max-w-md w-full h-screen sm:h-[812px] bg-background shadow-2xl sm:rounded-[32px] flex flex-col relative overflow-hidden border-4 border-black">
        <header className="p-4 flex items-center justify-between flex-shrink-0">
          <Link href="/account">
            <ChevronLeft className="w-8 h-8 text-gray-700" />
          </Link>
          <h1 className="text-lg font-bold text-gray-800">Refer a Friend</h1>
          <div className="w-8"></div>
        </header>

        <main className="flex-grow overflow-y-auto no-scrollbar px-4 py-6 text-center">
            <h2 className="text-xl font-bold text-gray-800">Invite Friends, Earn Koins!</h2>
            <p className="text-muted-foreground mt-2">Share your referral code. For every friend that signs up, you both get 500 Koins!</p>

            <div className="my-8">
                <p className="text-sm text-muted-foreground">Your Referral Code</p>
                <div className="mt-2 flex items-center justify-center p-3 border-2 border-dashed border-primary rounded-lg bg-primary/10">
                    <span className="text-2xl font-bold text-primary-foreground tracking-widest">{referralCode}</span>
                    <Button variant="ghost" size="icon" className="ml-4" onClick={handleCopy}>
                        <Copy className="w-6 h-6 text-primary" />
                    </Button>
                </div>
            </div>

            <Button size="lg" className="w-full">Share Now</Button>
        </main>
      </div>
    </div>
  );
}
