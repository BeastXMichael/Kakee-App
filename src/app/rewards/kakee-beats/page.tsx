'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { KakeeBeatsIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const notes = [
  { id: 1, position: 20, delay: 0 },
  { id: 2, position: 60, delay: 0.5 },
  { id: 3, position: 40, delay: 1 },
  { id: 4, position: 80, delay: 1.5 },
  { id: 5, position: 30, delay: 2 },
  { id: 6, position: 70, delay: 2.5 },
  { id: 7, position: 50, delay: 3 },
  { id: 8, position: 10, delay: 3.5 },
];

export default function KakeeBeatsPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pink-500/10 [background-size:40px_40px] animate-grid-bg"></div>

      <header className="p-4 flex items-center justify-between flex-shrink-0 z-10 bg-gray-900/50 backdrop-blur-sm">
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
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                {notes.map(note => (
                    <div 
                        key={note.id}
                        className="absolute w-12 h-12 bg-cyan-400 rounded-full shadow-[0_0_20px_theme(colors.cyan.400)] animate-note-fall"
                        style={{ 
                            left: `${note.position}%`,
                            animationDelay: `${note.delay}s`,
                         }}
                    ></div>
                ))}
            </div>
        )}

      </main>

       {isPlaying && (
        <footer className="w-full flex-shrink-0 h-24 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10">
            <div className="h-1 w-full bg-gradient-to-r from-pink-500 to-cyan-400 absolute top-0 shadow-[0_-2px_15px_theme(colors.pink.500)]"></div>
        </footer>
       )}
    </div>
  );
}
