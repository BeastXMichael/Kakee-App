'use client';

import { useState } from 'react';
import { DailySpinWheelIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function DailySpinCard() {
    const [isSpinning, setIsSpinning] = useState(false);
    const { toast } = useToast();

    const handleSpin = () => {
        if (isSpinning) return;
        setIsSpinning(true);
        setTimeout(() => {
            setIsSpinning(false);
            toast({
                title: "Congratulations!",
                description: "You won 50 Koins!",
            });
        }, 2000);
    };

    return (
        <div className="mt-3 bg-white/60 p-3 rounded-2xl shadow-sm border border-white/50 backdrop-blur-sm flex items-center space-x-3">
            <div className="relative w-16 h-16 flex-shrink-0">
                <DailySpinWheelIcon className={cn('w-full h-full', isSpinning && 'animate-wheel-spin')} />
            </div>
            <div className="flex-grow">
                <h2 className="font-bold text-md text-foreground">Daily Spin</h2>
                <p className="text-xs text-muted-foreground">Your free spin is ready. Win big!</p>
                <Button onClick={handleSpin} disabled={isSpinning} size="sm" className="mt-1 text-xs font-bold bg-red-500 text-white px-4 py-1 rounded-full h-auto hover:bg-red-600 transition">
                    {isSpinning ? 'Spinning...' : 'Spin Now'}
                </Button>
            </div>
        </div>
    );
}
