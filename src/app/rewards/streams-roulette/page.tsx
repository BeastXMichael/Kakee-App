
'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { StreamsRouletteIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useState, useMemo } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// --- Game Configuration ---
const segments = [
    { label: 'Mystery Song', color: 'bg-red-500',textColor: 'text-white' },
    { label: '50 Koins', color: 'bg-yellow-400', textColor: 'text-yellow-900' },
    { label: '80s Rock', color: 'bg-blue-500', textColor: 'text-white' },
    { label: 'K-Pop Hit', color: 'bg-pink-400', textColor: 'text-pink-900' },
    { label: 'Try Again', color: 'bg-gray-500', textColor: 'text-white' },
    { label: '100 Koins', color: 'bg-green-500', textColor: 'text-white' },
    { label: 'Lofi Beats', color: 'bg-purple-500', textColor: 'text-white' },
    { label: '25 Koins', color: 'bg-orange-400', textColor: 'text-orange-900' },
];

const SEGMENT_ANGLE = 360 / segments.length;

export default function StreamsRoulettePage() {
    const [gameState, setGameState] = useState<'idle' | 'spinning' | 'finished'>('idle');
    const [rotation, setRotation] = useState(0);
    const [winningSegment, setWinningSegment] = useState<typeof segments[0] | null>(null);

    const handleSpin = () => {
        if (gameState === 'spinning') return;

        setGameState('spinning');
        const spinCycles = Math.floor(Math.random() * 3) + 3; // 3 to 5 full spins
        const winningIndex = Math.floor(Math.random() * segments.length);
        const targetRotation = (spinCycles * 360) - (winningIndex * SEGMENT_ANGLE) - (SEGMENT_ANGLE / 2);
        
        setRotation(targetRotation);
        
        setTimeout(() => {
            setWinningSegment(segments[winningIndex]);
            setGameState('finished');
        }, 4000); // Corresponds to the transition duration
    };

    const handlePlayAgain = () => {
        setGameState('idle');
        setWinningSegment(null);
        // Reset rotation to a non-zero value to ensure the transition fires on next spin
        setRotation(rotation - 360); 
    };

    return (
        <>
        <div className="flex flex-col h-full bg-slate-900 text-white relative overflow-hidden">
            <header className="p-4 flex items-center justify-between flex-shrink-0 z-20 bg-slate-900/50 backdrop-blur-sm">
                <Link href="/rewards">
                    <Button variant="ghost" size="icon" className="text-white">
                        <ChevronLeft className="w-8 h-8" />
                    </Button>
                </Link>
                <div className="flex items-center gap-2">
                    <StreamsRouletteIcon className="w-6 h-6 text-purple-400" />
                    <h1 className="text-lg font-bold">Streams Roulette</h1>
                </div>
                <div className="w-8"></div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-purple-300">Feeling Lucky?</h2>
                    <p className="text-slate-400">Spin the wheel to win Koins or discover new music!</p>
                </div>

                <div className="relative w-80 h-80 flex items-center justify-center">
                    {/* Pointer */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-yellow-300 z-20 drop-shadow-lg"></div>

                    {/* Wheel */}
                    <div 
                        className="relative w-full h-full rounded-full border-8 border-slate-700 shadow-2xl shadow-purple-500/20 overflow-hidden transition-transform duration-[4000ms] ease-out"
                        style={{ transform: `rotate(${rotation}deg)` }}
                    >
                        {segments.map((segment, index) => (
                            <div
                                key={index}
                                className={cn("absolute w-1/2 h-1/2 origin-bottom-right", segment.color)}
                                style={{
                                    transform: `rotate(${index * SEGMENT_ANGLE}deg)`,
                                    clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 0)`
                                }}
                            >
                                <div 
                                    className={cn("absolute w-[160%] h-[160%] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex items-center justify-center", segment.textColor)}
                                    style={{ transform: `translateX(-50%) translateY(-50%) rotate(${SEGMENT_ANGLE / 2}deg)` }}
                                >
                                    <span className="text-xs font-bold text-shadow-sm -translate-x-4 -translate-y-4 block">{segment.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Spin Button */}
                    <button 
                        onClick={handleSpin}
                        disabled={gameState === 'spinning'}
                        className="absolute w-20 h-20 bg-slate-800 rounded-full border-4 border-slate-600 flex items-center justify-center text-lg font-bold text-white z-10 transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:scale-100"
                    >
                        Spin
                    </button>
                </div>
            </main>
        </div>
        <AlertDialog open={gameState === 'finished'} onOpenChange={(open) => !open && handlePlayAgain()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl text-center text-purple-400">Congratulations!</AlertDialogTitle>
                <AlertDialogDescription className="text-center text-lg">
                    You landed on: <span className="font-bold text-white">{winningSegment?.label}</span>
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogAction onClick={handlePlayAgain} className="w-full">Spin Again</AlertDialogAction>
            </AlertDialogContent>
        </AlertDialog>
        </>
    );
}
