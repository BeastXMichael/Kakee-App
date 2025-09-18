
'use client';

import { Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog';
import { KoinIcon } from '../icons';
import { useToast } from '@/hooks/use-toast';

type WelcomeGiftDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function WelcomeGiftDialog({ open, onOpenChange }: WelcomeGiftDialogProps) {
  const { toast } = useToast();

  const handleClaim = () => {
    onOpenChange(false);
    toast({
        title: 'Gift Claimed!',
        description: '250 Koins have been added to your account.',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background border-none shadow-2xl rounded-2xl p-0 overflow-hidden">
        <div className="p-8 text-center flex flex-col items-center">
            <p className="font-bold text-sm text-red-500">WELCOME TO THE PARTY!</p>
            <h2 className="text-2xl font-extrabold text-primary-foreground my-2">Your First Gift is Here!</h2>

            <div className="relative my-4 w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-pink-500/50 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative bg-white/10 rounded-full p-4 border border-white/20">
                    <Gift className="w-12 h-12 text-pink-300" />
                </div>
            </div>

            <p className="text-sm text-muted-foreground">Here's a little something to start your journey.</p>
            <p className="text-xs text-muted-foreground/80 mt-1">Come back every day for more rewards!</p>

            <div className="bg-primary/20 border border-primary/30 rounded-lg px-6 py-2 mt-6">
                <p className="text-3xl font-extrabold text-primary-foreground">250</p>
                <p className="text-sm text-primary-foreground/80">kakee Koins</p>
            </div>
            
            <Button onClick={handleClaim} size="lg" className="mt-6 w-full font-bold text-lg bg-gradient-to-r from-red-500 to-orange-400 text-white hover:opacity-90 transition-opacity">
                <KoinIcon className="w-5 h-5 mr-2" />
                Claim Your Gift
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
