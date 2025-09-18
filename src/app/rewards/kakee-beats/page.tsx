'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { KakeeBeatsIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const initialNotes = [
  { id: 1, position: 20, delay: 0 },
  { id: 2, position: 60, delay: 0.5 },
  { id: 3, position: 40, delay: 1 },
  { id: 4, position: 80, delay: 1.5 },
  { id: 5, position: 30, delay: 2 },
  { id: 6, position: 70, delay: 2.5 },
  { id: 7, position: 50, delay: 3 },
  { id: 8, position: 10, delay: 3.5 },
  { id: 9, position: 25, delay: 4.2 },
  { id: 10, position: 65, delay: 4.8 },
];

type ScoreFeedback = {
  id: number;
  points: number;
  x: number;
  y: number;
};

export default function KakeeBeatsPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [hitNotes, setHitNotes] = useState<Set<number>>(new Set());
  const [scoreFeedback, setScoreFeedback] = useState<ScoreFeedback[]>([]);

  useEffect(() => {
    if (isPlaying) {
      setScore(0);
      setCombo(0);
      setHitNotes(new Set());
      setScoreFeedback([]);
    }
  }, [isPlaying]);

  const handleNoteHit = (noteId: number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (hitNotes.has(noteId)) return;

    const points = 10 + combo;
    setScore(s => s + points);
    setCombo(c => c + 1);
    setHitNotes(h => new Set(h.add(noteId)));
    
    const rect = e.currentTarget.getBoundingClientRect();
    const newFeedback: ScoreFeedback = {
      id: Date.now(),
      points,
      x: rect.left + rect.width / 2,
      y: rect.top,
    };
    setScoreFeedback(f => [...f, newFeedback]);
    setTimeout(() => {
        setScoreFeedback(f => f.filter(item => item.id !== newFeedback.id));
    }, 1000);
  };
  
  const handleAnimationEnd = (noteId: number) => {
    // If note falls off screen without being hit, reset combo
    if (!hitNotes.has(noteId)) {
        setCombo(0);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pink-500/10 [background-size:40px_40px] animate-grid-bg"></div>

      <header className="p-4 flex items-center justify-between flex-shrink-0 z-20 bg-gray-900/50 backdrop-blur-sm">
        <Link href="/rewards">
          <Button variant="ghost" size="icon" className="text-white">
            <ChevronLeft className="w-8 h-8" />
          </Button>
        </Link>
        <div className="flex items-center gap-2">
            <KakeeBeatsIcon className="w-6 h-6 text-pink-400"/>
            <h1 className="text-lg font-bold">Kakee Beats</h1>
        </div>
        <div className="w-8"></div>
      </header>

      {isPlaying && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 text-center">
            <p className="text-4xl font-extrabold text-white text-shadow-lg">{score.toLocaleString()}</p>
            {combo > 1 && <p className="text-lg font-bold text-cyan-400 animate-pulse">{combo}x COMBO</p>}
        </div>
      )}

      {scoreFeedback.map(fb => (
        <div 
          key={fb.id} 
          className="absolute z-30 font-bold text-lg text-yellow-300 animate-score-popup pointer-events-none"
          style={{ left: fb.x, top: fb.y }}
        >
          +{fb.points}
        </div>
      ))}

      <main className="flex-grow flex flex-col items-center justify-center relative">
        {!isPlaying && (
            <div className="text-center z-10">
                <h2 className="text-4xl font-extrabold text-pink-400 animate-pulse">Kakee Beats</h2>
                <p className="text-lg text-gray-300 mt-2">Tap the notes to the rhythm!</p>
                <Button onClick={() => setIsPlaying(true)} size="lg" className="mt-8 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xl rounded-full px-12 py-8">
                    Tap to Start
                </Button>
            </div>
        )}
        
        {isPlaying && (
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
                {initialNotes.map(note => (
                    <button
                        key={note.id}
                        onClick={(e) => handleNoteHit(note.id, e)}
                        onAnimationEnd={() => handleAnimationEnd(note.id)}
                        className={cn(
                            "absolute w-14 h-14 bg-cyan-400 rounded-full shadow-[0_0_20px_theme(colors.cyan.400)] animate-note-fall",
                            hitNotes.has(note.id) && "opacity-0 scale-150 transition-opacity transition-transform"
                        )}
                        style={{ 
                            left: `${note.position}%`,
                            animationDelay: `${note.delay}s`,
                         }}
                    ></button>
                ))}
            </div>
        )}

      </main>

       {isPlaying && (
        <footer className="w-full flex-shrink-0 h-24 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10">
            <div className="h-1 w-full bg-gradient-to-r from-pink-500 to-cyan-400 absolute top-0 shadow-[0_-2px_15px_theme(colors.pink.500)]"></div>
            <div className="flex justify-center mt-8">
                <Button onClick={() => setIsPlaying(false)} variant="secondary">End Game</Button>
            </div>
        </footer>
       )}
    </div>
  );
}
