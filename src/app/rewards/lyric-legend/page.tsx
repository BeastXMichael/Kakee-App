
'use client';

import { ChevronLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LyricLegendIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const questions = [
    {
        lyric: "I'm waking up to ash and dust, I wipe my brow and I sweat my ____.",
        options: ['rust', 'crust', 'lust', 'trust'],
        answer: 'rust',
        song: 'Radioactive - Imagine Dragons'
    },
    {
        lyric: "You're my ____, I'm your ____, you're my ____, I'm your ____.",
        options: ['sun', 'earth', 'wonderwall', 'supernova'],
        answer: 'wonderwall',
        song: 'Wonderwall - Oasis'
    },
    {
        lyric: "It's the eye of the tiger, it's the thrill of the ____.",
        options: ['fight', 'night', 'light', 'height'],
        answer: 'fight',
        song: 'Eye of the Tiger - Survivor'
    },
];

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export default function LyricLegendPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
    const [isFinished, setIsFinished] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswer = (option: string) => {
        if (answerState !== 'unanswered') return;

        setSelectedOption(option);
        if (option === currentQuestion.answer) {
            setAnswerState('correct');
            setScore(s => s + 100);
        } else {
            setAnswerState('incorrect');
        }
    };
    
    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(i => i + 1);
            setAnswerState('unanswered');
            setSelectedOption(null);
        } else {
            setIsFinished(true);
        }
    };
    
    const handlePlayAgain = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setAnswerState('unanswered');
        setSelectedOption(null);
        setIsFinished(false);
    }

    if (isFinished) {
        return (
            <div className="flex flex-col h-full bg-slate-900 text-white relative overflow-hidden items-center justify-center text-center p-4">
                 <h2 className="text-3xl font-bold text-cyan-300">Game Over!</h2>
                 <p className="text-xl mt-2">Your final score is:</p>
                 <p className="text-5xl font-extrabold text-white my-4">{score}</p>
                 <Button onClick={handlePlayAgain} className="bg-cyan-500 hover:bg-cyan-600">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Play Again
                 </Button>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full bg-slate-900 text-white relative overflow-hidden">
            <header className="p-4 flex items-center justify-between flex-shrink-0 z-20 bg-slate-900/50 backdrop-blur-sm">
                <Link href="/rewards">
                    <Button variant="ghost" size="icon" className="text-white">
                        <ChevronLeft className="w-8 h-8" />
                    </Button>
                </Link>
                <div className="flex items-center gap-2">
                    <LyricLegendIcon className="w-6 h-6 text-cyan-400" />
                    <h1 className="text-lg font-bold">Lyric Legend</h1>
                </div>
                <div className="text-lg font-bold text-cyan-300">{score}</div>
            </header>

            <main className="flex-grow flex flex-col justify-center p-4 md:p-6 text-center">
                
                <div className="bg-white/5 border border-cyan-500/30 rounded-lg p-6 shadow-xl shadow-cyan-500/10">
                    <p className="text-xl md:text-2xl font-semibold leading-relaxed">
                        "{currentQuestion.lyric.replace('____', '__________')}"
                    </p>
                    <p className="text-sm text-cyan-400 mt-2">{currentQuestion.song}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-8">
                    {currentQuestion.options.map(option => (
                         <Button 
                            key={option} 
                            onClick={() => handleAnswer(option)}
                            className={cn(
                                "w-full text-lg justify-center py-5 h-auto",
                                "bg-white/10 text-white border border-transparent",
                                "hover:bg-white/20 hover:border-cyan-400",
                                answerState !== 'unanswered' && option === currentQuestion.answer && "bg-green-500/80 border-green-400 hover:bg-green-500/90", // Correct answer
                                answerState === 'incorrect' && selectedOption === option && "bg-red-500/80 border-red-400 hover:bg-red-500/90" // Incorrectly selected
                            )}
                            disabled={answerState !== 'unanswered'}
                        >
                            {option}
                        </Button>
                    ))}
                </div>
                
                 {answerState !== 'unanswered' && (
                    <div className="mt-8 text-center animate-in fade-in duration-500">
                         <Button onClick={handleNextQuestion} className="w-full bg-cyan-500 hover:bg-cyan-600 py-6 text-lg">
                            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Game'}
                        </Button>
                    </div>
                )}
            </main>
        </div>
    );
}
