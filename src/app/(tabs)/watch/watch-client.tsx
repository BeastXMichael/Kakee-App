"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Search, Clapperboard } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { TreasureChestIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import SearchOverlay from './search-overlay';
import VideoPlayer from './video-player';

const dramas = [
    { id: 'new-drama-1', title: 'My Secret Kopi Stall Romance' },
    { id: 'new-drama-2', title: "Ah Beng's Guide to the Galaxy" },
    { id: 'new-drama-3', title: 'The Last Mama Shop' },
];

export default function WatchClient() {
    const [showSearch, setShowSearch] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);

    const recentlyWatchedImg = PlaceHolderImages.find(img => img.id === 'recently-watched');

    const openPlayer = () => setShowPlayer(true);
    const closePlayer = () => setShowPlayer(false);
    const openSearch = () => setShowSearch(true);
    const closeSearch = () => setShowSearch(false);

    return (
        <div className="h-full bg-white flex flex-col relative">
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-sky-200 via-cyan-100 to-transparent z-0"></div>
            
            <header className="p-4 pt-6 flex-shrink-0 z-10 relative">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-extrabold text-gray-800">Watch</h1>
                    <Button variant="ghost" size="icon" onClick={openSearch}><Search className="w-6 h-6 text-gray-600" /></Button>
                </div>
                <div className="mt-4 bg-white/60 p-2 rounded-full shadow-sm border border-white/50 backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center text-xs font-bold"><Clapperboard className="w-4 h-4" /></div>
                        <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-cyan-500 h-2 rounded-full" style={{ width: "75%" }}></div></div>
                        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-md cursor-pointer flex-shrink-0 animate-chest-glow">
                            <TreasureChestIcon className="w-6 h-6"/>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-grow flex flex-col px-4 pt-2 pb-4 z-10 relative">
                <div className="space-y-4 flex flex-col flex-grow">
                    <div>
                        <h2 className="font-bold text-xl mb-3 text-gray-800">Recently Watched</h2>
                        <button onClick={openPlayer} className="w-full text-left h-auto rounded-lg shadow-xl aspect-video object-cover bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col justify-end p-4 text-white relative overflow-hidden">
                            {recentlyWatchedImg && <Image src={recentlyWatchedImg.imageUrl} alt="Drama Poster" fill className="absolute inset-0 w-full h-full object-cover opacity-50" data-ai-hint={recentlyWatchedImg.imageHint}/>}
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black">From HDB to CEO</h3>
                                <p className="text-sm">Ep 24: The Final Merger</p>
                                <div className="mt-2 text-xs font-bold bg-white text-gray-900 px-4 py-1.5 rounded-full inline-block">Continue Watching</div>
                            </div>
                        </button>
                    </div>
                    <div className="mt-auto">
                        <h2 className="font-bold text-xl mb-3 text-gray-800">Newly Released</h2>
                        <div className="flex space-x-4 overflow-x-auto no-scrollbar">
                            {dramas.map(drama => {
                                const image = PlaceHolderImages.find(img => img.id === drama.id);
                                return (
                                    <button onClick={openPlayer} key={drama.id} className="w-32 flex-shrink-0 space-y-2 text-left">
                                        {image && <Image src={image.imageUrl} alt="Drama Poster" width={128} height={192} className="w-full h-auto rounded-lg shadow-md aspect-[2/3] object-cover" data-ai-hint={image.imageHint}/>}
                                        <p className="text-sm font-semibold">{drama.title}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>

            <SearchOverlay show={showSearch} onClose={closeSearch} />
            <VideoPlayer show={showPlayer} onClose={closePlayer} />
        </div>
    );
}
