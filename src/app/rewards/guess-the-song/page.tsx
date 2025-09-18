
'use client';

import { ChevronLeft, Play, Pause, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GuessTheSongIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';

const questions = [
    {
        songSnippetUrl: '/snippets/song1.mp3', // Placeholder URL
        options: ['Blinding Lights', 'As It Was', 'Shape of You', 'Despacito'],
        answer: 'Blinding Lights',
    },
    {
        songSnippetUrl: '/snippets/song2.mp3',
        options: ['Uptown Funk', 'Happy', 'Sorry', 'Levitating'],
        answer: 'Levitating',
    },
    {
        songSnippetUrl: '/snippets/song3.mp3',
        options: ['Watermelon Sugar', 'Good 4 U', 'Peaches', 'Butter'],
        answer: 'Watermelon Sugar',
    },
];

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export default function GuessTheSongPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
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
                 <h2 className="text-3xl font-bold text-sky-300">Game Over!</h2>
                 <p className="text-xl mt-2">Your final score is:</p>
                 <p className="text-5xl font-extrabold text-white my-4">{score}</p>
                 <Button onClick={handlePlayAgain} className="bg-sky-500 hover:bg-sky-600">
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
                    <GuessTheSongIcon className="w-6 h-6 text-sky-400" />
                    <h1 className="text-lg font-bold">Guess the Song</h1>
                </div>
                <div className="text-lg font-bold text-sky-300">{score}</div>
            </header>

            <main className="flex-grow flex flex-col justify-between p-4 md:p-6">
                <div className="text-center">
                    <p className="text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</p>
                    <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="mt-2 h-2"/>
                </div>

                <div className="flex flex-col items-center justify-center my-8">
                     <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-32 h-32 rounded-full bg-sky-500/20 border-2 border-sky-400 flex items-center justify-center text-sky-300 shadow-[0_0_20px_theme(colors.sky.500)] transition-transform hover:scale-105"
                    >
                        {isPlaying ? <Pause className="w-16 h-16"/> : <Play className="w-16 h-16" />}
                    </button>
                    <p className="mt-4 text-muted-foreground">Tap to play song snippet</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {currentQuestion.options.map(option => (
                         <Button 
                            key={option} 
                            onClick={() => handleAnswer(option)}
                            className={cn(
                                "w-full text-lg justify-center py-6 h-auto",
                                "bg-white/10 text-white border border-transparent",
                                "hover:bg-white/20 hover:border-sky-400",
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
                    <div className="mt-4 text-center">
                         <Button onClick={handleNextQuestion} className="w-full bg-sky-500 hover:bg-sky-600 py-6 text-lg">
                            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Game'}
                        </Button>
                    </div>
                )}
            </main>
        </div>
    );
}
