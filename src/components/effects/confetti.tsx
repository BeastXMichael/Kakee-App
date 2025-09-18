
'use client';

import { useEffect, useState } from 'react';

const CONFETTI_COUNT = 50;
const COLORS = ['#FFDA63', '#FFB347', '#F472B6', '#3B82F6', '#22C55E'];

type ConfettiPiece = {
  id: number;
  style: React.CSSProperties;
};

export default function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const generatePieces = () => {
      const newPieces: ConfettiPiece[] = [];
      for (let i = 0; i < CONFETTI_COUNT; i++) {
        const size = Math.random() * 8 + 4; // 4px to 12px
        newPieces.push({
          id: i,
          style: {
            left: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)],
            animationDelay: `${Math.random() * 7}s`, // Stagger the start
            animationDuration: `${Math.random() * 3 + 4}s`, // 4s to 7s duration
          },
        });
      }
      setPieces(newPieces);
    };

    generatePieces();
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-20">
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="absolute top-0 animate-confetti-fall"
          style={piece.style}
        />
      ))}
    </div>
  );
}
