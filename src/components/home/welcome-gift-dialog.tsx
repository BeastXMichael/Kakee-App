
'use client';

import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { KoinIcon } from '../icons';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type WelcomeGiftDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function WelcomeGiftDialog({ open, onOpenChange }: WelcomeGiftDialogProps) {
  const { toast } = useToast();

  const handleClaim = () => {
    onOpenChange(false);
    toast({
        title: 'NTU Gift Claimed!',
        description: '500 Koins have been added to your account. Welcome!',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background border-none shadow-2xl rounded-2xl p-0 overflow-hidden">
        <div className="p-8 text-center flex flex-col items-center relative overflow-hidden">
            <div className="absolute inset-0 confetti-bg z-0"></div>
            <div className="relative z-10">
                <p className="font-bold text-sm text-blue-500">CELEBRATING OUR PARTNERSHIP!</p>
                <h2 className="text-2xl font-extrabold text-primary-foreground my-2">Kakee x NTU: Welcome!</h2>

                <div className="relative my-4 w-24 h-24 flex items-center justify-center">
                    <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-2xl animate-pulse"></div>
                    <div className="relative bg-white/10 rounded-full p-4 border border-white/20">
                        <Sparkles className="w-12 h-12 text-blue-300" />
                    </div>
                </div>

                <p className="text-sm text-muted-foreground">Kakee is proud to partner with NTU! Here's a special gift for all NTU students to kickstart your journey.</p>
                
                <div className="bg-primary/20 border border-primary/30 rounded-lg px-6 py-2 mt-6">
                    <p className="text-3xl font-extrabold text-primary-foreground">500</p>
                    <p className="text-sm text-primary-foreground/80">kakee Koins</p>
                </div>
                
                <Button onClick={handleClaim} size="lg" className="mt-6 w-full font-bold text-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:opacity-90 transition-opacity">
                    <KoinIcon className="w-5 h-5 mr-2" />
                    Claim Your NTU Welcome Gift
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
