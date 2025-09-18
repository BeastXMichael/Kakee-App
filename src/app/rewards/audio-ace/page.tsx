
'use client';

import { ChevronLeft, Headphones } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState, useEffect, useCallback } from 'react';

// --- Game Configuration ---
const PADS = [
    { id: 0, color: 'bg-green-500', hover: 'hover:bg-green-600', shadow: 'shadow-green-500/50' },
    { id: 1, color: 'bg-red-500', hover: 'hover:bg-red-600', shadow: 'shadow-red-500/50' },
    { id: 2, color: 'bg-yellow-500', hover: 'hover:bg-yellow-600', shadow: 'shadow-yellow-500/50' },
    { id: 3, color: 'bg-blue-500', hover: 'hover:bg-blue-600', shadow: 'shadow-blue-500/50' },
];
const SEQUENCE_DELAY = 600; // ms between each light in the sequence
const PAD_FLASH_DURATION = 300; // ms for how long a pad stays lit

// --- Helper Function ---
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function AudioAcePage() {
    const [gameState, setGameState] = useState<'idle' | 'playingSequence' | 'playerTurn' | 'gameOver'>('idle');
    const [sequence, setSequence] = useState<number[]>([]);
    const [playerSequence, setPlayerSequence] = useState<number[]>([]);
    const [activePad, setActivePad] = useState<number | null>(null);
    const [score, setScore] = useState(0);

    const round = sequence.length;

    // --- Game Logic Functions ---
    const flashPad = async (padId: number) => {
        setActivePad(padId);
        // In a real game, you would play a sound here corresponding to the pad
        await sleep(PAD_FLASH_DURATION);
        setActivePad(null);
    };

    const playSequence = useCallback(async () => {
        setGameState('playingSequence');
        await sleep(SEQUENCE_DELAY);
        for (const padId of sequence) {
            await flashPad(padId);
            await sleep(SEQUENCE_DELAY / 2);
        }
        setGameState('playerTurn');
    }, [sequence]);
    
    const addNewToSequence = () => {
        const nextPad = Math.floor(Math.random() * PADS.length);
        setSequence(prev => [...prev, nextPad]);
    };
    
    const handlePlayerInput = async (padId: number) => {
        if (gameState !== 'playerTurn') return;
        
        await flashPad(padId);
        const newPlayerSequence = [...playerSequence, padId];
        setPlayerSequence(newPlayerSequence);

        // Check if the current input is correct
        if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
            setGameState('gameOver');
            return;
        }

        // Check if the round is complete
        if (newPlayerSequence.length === sequence.length) {
            setScore(s => s + (round * 10));
            setPlayerSequence([]);
            await sleep(SEQUENCE_DELAY);
            addNewToSequence();
        }
    };
    
    const startGame = () => {
        setSequence([]);
        setPlayerSequence([]);
        setScore(0);
        addNewToSequence();
        setGameState('playingSequence');
    };
    
    // --- Effects ---
    useEffect(() => {
        if (gameState === 'playingSequence' && sequence.length > 0) {
            playSequence();
        }
    }, [gameState, sequence, playSequence]);
    
    return (
        <div className="flex flex-col h-full bg-slate-900 text-white relative overflow-hidden">
            <header className="p-4 flex items-center justify-between flex-shrink-0 z-20 bg-slate-900/50 backdrop-blur-sm">
                <Link href="/rewards">
                    <Button variant="ghost" size="icon" className="text-white">
                        <ChevronLeft className="w-8 h-8" />
                    </Button>
                </Link>
                <div className="flex items-center gap-2">
                    <Headphones className="w-6 h-6 text-lime-400" />
                    <h1 className="text-lg font-bold">Audio Ace</h1>
                </div>
                <div className="w-8"></div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center p-4 relative">
                <div className="absolute top-4 text-center">
                    <p className="text-xl text-muted-foreground">Score: <span className="font-bold text-white">{score}</span></p>
                    <p className="text-xl text-muted-foreground">Round: <span className="font-bold text-white">{round}</span></p>
                </div>

                <div className="relative w-72 h-72 md:w-80 md:h-80">
                    {gameState === 'idle' || gameState === 'gameOver' ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                            {gameState === 'gameOver' && (
                                <>
                                    <h2 className="text-3xl font-bold text-red-500">Game Over</h2>
                                    <p className="text-lg">Final Score: {score}</p>
                                </>
                            )}
                            <Button onClick={startGame} size="lg" className="mt-4 bg-lime-500 hover:bg-lime-600 text-white font-bold rounded-full px-8 py-6">
                                {gameState === 'gameOver' ? 'Play Again' : 'Start Game'}
                            </Button>
                        </div>
                    ) : (
                        <p className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-muted-foreground z-0">
                           {gameState === 'playingSequence' ? 'Watch...' : 'Your Turn!'}
                        </p>
                    )}
                    
                    <div className={cn(
                        "w-full h-full grid grid-cols-2 grid-rows-2 gap-4 transition-opacity",
                        (gameState === 'idle' || gameState === 'gameOver') && 'opacity-20'
                    )}>
                        {PADS.map(pad => (
                            <button
                                key={pad.id}
                                onClick={() => handlePlayerInput(pad.id)}
                                disabled={gameState !== 'playerTurn'}
                                className={cn(
                                    'w-full h-full rounded-2xl transition-all duration-100',
                                    pad.color,
                                    gameState === 'playerTurn' && pad.hover,
                                    `shadow-lg ${pad.shadow}`,
                                    activePad === pad.id ? 'scale-105 opacity-100' : 'opacity-60',
                                    gameState !== 'playerTurn' && 'cursor-default'
                                )}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
