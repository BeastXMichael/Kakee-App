
'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Gamepad2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect, useMemo } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// --- Game Configuration ---
const GRID_SIZE = 5;
const CELL_SIZE = 60; // size of each cell in pixels

type Point = { x: number; y: number };
type Path = {
    color: string;
    start: Point;
    end: Point;
};

const initialPaths: Path[] = [
    { color: '#3b82f6', start: { x: 0, y: 1 }, end: { x: 4, y: 1 } }, // Blue
    { color: '#ec4899', start: { x: 1, y: 0 }, end: { x: 1, y: 4 } }, // Pink
    { color: '#a855f7', start: { x: 0, y: 3 }, end: { x: 4, y: 3 } }, // Purple
    { color: '#22c55e', start: { x: 3, y: 0 }, end: { x: 3, y: 4 } }, // Green
];

// --- Helper Functions ---
const getIntersections = (paths: Path[]): Map<string, [Path, Path]> => {
    const intersections = new Map<string, [Path, Path]>();
    for (let i = 0; i < paths.length; i++) {
        for (let j = i + 1; j < paths.length; j++) {
            const path1 = paths[i];
            const path2 = paths[j];

            const isPath1Horizontal = path1.start.y === path1.end.y;
            const isPath2Horizontal = path2.start.y === path2.end.y;

            if (isPath1Horizontal !== isPath2Horizontal) {
                const [hPath, vPath] = isPath1Horizontal ? [path1, path2] : [path2, path1];
                
                const intersectX = vPath.start.x;
                const intersectY = hPath.start.y;

                if (
                    intersectX > Math.min(hPath.start.x, hPath.end.x) &&
                    intersectX < Math.max(hPath.start.x, hPath.end.x) &&
                    intersectY > Math.min(vPath.start.y, vPath.end.y) &&
                    intersectY < Math.max(vPath.start.y, vPath.end.y)
                ) {
                    intersections.set(`${intersectX},${intersectY}`, [path1, path2]);
                }
            }
        }
    }
    return intersections;
};


export default function ArcadeMasterPage() {
    const [weaveState, setWeaveState] = useState<Map<string, Path>>(new Map()); // Key: "x,y", Value: path on top
    const [isComplete, setIsComplete] = useState(false);

    const intersections = useMemo(() => getIntersections(initialPaths), []);

    // Initialize or reset the game
    const setupGame = () => {
        const initialWeave = new Map<string, Path>();
        // Randomly set which path is on top at each intersection
        intersections.forEach((paths, key) => {
            initialWeave.set(key, paths[Math.random() > 0.5 ? 0 : 1]);
        });
        setWeaveState(initialWeave);
        setIsComplete(false);
    };

    useEffect(() => {
        setupGame();
    }, []);

    // Check for win condition
    useEffect(() => {
        if (weaveState.size === 0 || intersections.size === 0) return;

        let completed = true;
        weaveState.forEach((topPath, key) => {
            const [pathA] = intersections.get(key)!;
            // The win condition is arbitrary for this puzzle.
            // Let's define it as "all horizontal paths are on top".
            if (topPath.start.y !== topPath.end.y) { // If the vertical path is on top
                completed = false;
            }
        });

        if (completed) {
            setIsComplete(true);
        }
    }, [weaveState, intersections]);
    
    const handleIntersectionClick = (key: string) => {
        const [path1, path2] = intersections.get(key)!;
        const currentTopPath = weaveState.get(key);
        const newTopPath = currentTopPath === path1 ? path2 : path1;
        
        const newWeaveState = new Map(weaveState);
        newWeaveState.set(key, newTopPath);
        setWeaveState(newWeaveState);
    };
    
    const viewBoxSize = (GRID_SIZE - 1) * CELL_SIZE + CELL_SIZE;

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
                    <Gamepad2 className="w-6 h-6 text-violet-400" />
                    <h1 className="text-lg font-bold">Arcade Master</h1>
                </div>
                <div className="w-8"></div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-violet-300">Color Weave</h2>
                    <p className="text-slate-400">Untangle the lines. Make horizontal lines go over vertical ones.</p>
                </div>
                
                <svg 
                    width={viewBoxSize} 
                    height={viewBoxSize} 
                    viewBox={`-${CELL_SIZE/2} -${CELL_SIZE/2} ${viewBoxSize} ${viewBoxSize}`}
                    className="rounded-lg bg-slate-800/50 shadow-2xl shadow-violet-500/20"
                >
                    {/* Render paths */}
                    {initialPaths.map(path => {
                        const isHorizontal = path.start.y === path.end.y;
                        return (
                            <line 
                                key={path.color}
                                x1={path.start.x * CELL_SIZE} 
                                y1={path.start.y * CELL_SIZE}
                                x2={path.end.x * CELL_SIZE} 
                                y2={path.end.y * CELL_SIZE}
                                stroke={path.color} 
                                strokeWidth="8"
                                strokeLinecap="round"
                                filter={`drop-shadow(0 0 5px ${path.color})`}
                            />
                        )
                    })}

                    {/* Render intersections */}
                    {Array.from(intersections.entries()).map(([key, paths]) => {
                         const [x, y] = key.split(',').map(Number);
                         const topPath = weaveState.get(key);
                         if (!topPath) return null;

                         const [pathA, pathB] = paths;
                         const bottomPath = topPath === pathA ? pathB : pathA;
                         
                         const isTopHorizontal = topPath.start.y === topPath.end.y;

                        return (
                            <g key={key} onClick={() => handleIntersectionClick(key)} className="cursor-pointer">
                                 {/* Mask for bottom path */}
                                 <line 
                                    x1={isTopHorizontal ? x * CELL_SIZE : bottomPath.start.x * CELL_SIZE}
                                    y1={isTopHorizontal ? bottomPath.start.y * CELL_SIZE : y * CELL_SIZE}
                                    x2={isTopHorizontal ? x * CELL_SIZE : bottomPath.end.x * CELL_SIZE}
                                    y2={isTopHorizontal ? bottomPath.end.y * CELL_SIZE : y * CELL_SIZE}
                                    strokeWidth="12"
                                    stroke="hsl(var(--background))"
                                    strokeLinecap="round"
                                 />
                                 {/* Top path segment */}
                                 <line 
                                    x1={isTopHorizontal ? topPath.start.x * CELL_SIZE : x * CELL_SIZE}
                                    y1={isTopHorizontal ? y * CELL_SIZE : topPath.start.y * CELL_SIZE}
                                    x2={isTopHorizontal ? topPath.end.x * CELL_SIZE : x * CELL_SIZE}
                                    y2={isTopHorizontal ? y * CELL_SIZE : topPath.end.y * CELL_SIZE}
                                    stroke={topPath.color}
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    filter={`drop-shadow(0 0 5px ${topPath.color})`}
                                 />
                                {/* Interaction circle */}
                                <circle cx={x * CELL_SIZE} cy={y * CELL_SIZE} r="12" fill="transparent" />
                            </g>
                        )
                    })}

                    {/* Render start/end nodes */}
                    {initialPaths.map(path => (
                        <g key={`nodes-${path.color}`}>
                             <circle cx={path.start.x * CELL_SIZE} cy={path.start.y * CELL_SIZE} r="10" fill={path.color} />
                             <circle cx={path.end.x * CELL_SIZE} cy={path.end.y * CELL_SIZE} r="10" fill={path.color} />
                        </g>
                    ))}
                </svg>

                 <Button onClick={setupGame} className="mt-6 bg-violet-500 hover:bg-violet-600">Reset Puzzle</Button>
            </main>
        </div>
        <AlertDialog open={isComplete} onOpenChange={(open) => !open && setupGame()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl text-center text-violet-400">Puzzle Complete!</AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                    Great job untangling the lines! You've earned 150 Koins.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogAction onClick={setupGame} className="w-full">Play Again</AlertDialogAction>
            </AlertDialogContent>
        </AlertDialog>
        </>
    );
}

