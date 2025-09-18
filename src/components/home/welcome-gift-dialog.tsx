
'use client';

import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { KoinIcon } from '../icons';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import Confetti from '../effects/confetti';

type WelcomeGiftDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function WelcomeGiftDialog({ open, onOpenChange }: WelcomeGiftDialogProps) {
  const { toast } = useToast();

  const handleClaim = () => {
    onOpenChange(false);
    toast({
        title: 'Partnership Gift Claimed!',
        description: 'Thank you for being part of this journey. 500 Koins have been added to your account.',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background border-none shadow-2xl rounded-2xl p-0 overflow-hidden">
        {open && <Confetti />}
        <div className="p-8 text-center flex flex-col items-center relative">
            <Sparkles className="w-8 h-8 text-yellow-400 absolute top-4 left-4 animate-pulse" />
            <Sparkles className="w-6 h-6 text-pink-400 absolute top-16 right-8 animate-pulse [animation-delay:0.5s]" />
            <Sparkles className="w-10 h-10 text-cyan-400 absolute bottom-24 left-8 animate-pulse [animation-delay:1s]" />

            <p className="font-bold text-sm text-muted-foreground z-10">A SPECIAL PARTNERSHIP</p>
            <h2 className="text-2xl font-extrabold text-primary-foreground my-2 z-10">NTU x Kakee: Thank You!</h2>
            
            <Image 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAEqgZEkPp9_S629UQkF2Z7bxeINuzqn89pw&s" 
                alt="NTU x Kakee Partnership"
                width={160}
                height={100}
                className="my-4 rounded-lg z-10"
            />

            <p className="text-sm text-muted-foreground z-10">From all of us at NTU, thank you Kakee for this amazing partnership. We're excited for what's to come. Here's a gift for our students!</p>
            
            <div className="bg-primary/20 border border-primary/30 rounded-lg px-6 py-2 mt-6 z-10">
                <p className="text-3xl font-extrabold text-primary-foreground">500</p>
                <p className="text-sm text-primary-foreground/80">kakee Koins</p>
            </div>
            
            <Button onClick={handleClaim} size="lg" className="mt-6 w-full font-bold text-lg bg-primary hover:bg-primary/90 transition-opacity z-10">
                <KoinIcon className="w-5 h-5 mr-2" />
                Claim Your Gift
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
