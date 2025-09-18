'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, X } from 'lucide-react';
import CommentPanel from './comment-panel';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function VideoPlayer() {
    const [liked, setLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);

    return (
        <div className={`dark absolute inset-0 z-40 bg-black flex flex-col`}>
            <video
                src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
                autoPlay
                muted
                loop
                className="absolute inset-0 w-full h-full object-cover -z-10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute inset-0 radiant-background-watch-player animate-radiant-glow opacity-50"></div>
            
            <div className={cn("relative z-10 flex flex-col h-full p-4 transition-opacity duration-300", showComments && "opacity-0 pointer-events-none")}>
                <Link href="/watch" className="absolute top-4 left-4 text-white z-50">
                    <X className="w-8 h-8" />
                </Link>
                
                <div className="flex-grow"></div>

                <div className="flex items-end">
                    <div className="flex-grow text-white text-shadow">
                        <h3 className="font-bold text-lg">From HDB to CEO</h3>
                        <p className="text-sm">Ep 24: The Final Merger</p>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-center space-y-6 ml-4">
                        <button onClick={() => setLiked(!liked)} className="text-white flex flex-col items-center space-y-1">
                            <div className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Heart className={cn("w-7 h-7 transition-colors", liked && "fill-red-500 text-red-500")} />
                            </div>
                            <span className="text-xs font-semibold">12.1k</span>
                        </button>
                        <button onClick={() => setShowComments(true)} className="text-white flex flex-col items-center space-y-1">
                            <div className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <MessageCircle className="w-7 h-7" />
                            </div>
                            <span className="text-xs font-semibold">302</span>
                        </button>
                        <button className="text-white flex flex-col items-center space-y-1">
                            <div className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Share2 className="w-7 h-7" />
                            </div>
                            <span className="text-xs font-semibold">Share</span>
                        </button>
                    </div>
                </div>
                
                <div className="w-full bg-white/20 h-2 rounded-full mt-4 overflow-hidden relative">
                    <div className="w-1/3 h-full water-progress"></div>
                </div>
            </div>

            <CommentPanel show={showComments} onClose={() => setShowComments(false)} />
        </div>
    );
}
