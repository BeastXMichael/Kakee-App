
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
        <div className="p-8 text-center flex flex-col items-center">
            <p className="font-bold text-sm text-muted-foreground">SPECIAL PARTNERSHIP</p>
            <h2 className="text-2xl font-extrabold text-primary-foreground my-2">Kakee x NTU: Welcome!</h2>
            
            <Image 
                src="https://seeklogo.com/images/N/nanyang-technological-university-logo-99C7E42213-seeklogo.com.png" 
                alt="NTU Logo"
                width={80}
                height={80}
                className="my-4"
            />

            <p className="text-sm text-muted-foreground">Kakee is proud to partner with NTU! Here's a special gift for all NTU students to kickstart your journey.</p>
            
            <div className="bg-primary/20 border border-primary/30 rounded-lg px-6 py-2 mt-6">
                <p className="text-3xl font-extrabold text-primary-foreground">500</p>
                <p className="text-sm text-primary-foreground/80">kakee Koins</p>
            </div>
            
            <Button onClick={handleClaim} size="lg" className="mt-6 w-full font-bold text-lg bg-primary hover:bg-primary/90 transition-opacity">
                <KoinIcon className="w-5 h-5 mr-2" />
                Claim Your NTU Welcome Gift
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
