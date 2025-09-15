"use client";

import { useEffect, useRef, useState } from 'react';
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

const moreDramas = [
    { id: 'drops-1', title: 'Ah Beng\'s Guide' },
    { id: 'drops-2', title: 'New Lobang!' },
    { id: 'drops-3', title: 'New Game!' },
    { id: 'recently-1', title: 'Lofi Beats Radio' },
];

const justForYou = [
    { id: 'made-for-you-1', title: 'For You Mix' },
    { id: 'made-for-you-2', title: 'Lofi Beats' },
    { id: 'made-for-you-3', 'title': 'Discovery' },
    { id: 'made-for-you-4', 'title': 'New Releases' },
]

const trendingNow = [
    { id: 'trending-1', title: 'Top Hits' },
    { id: 'trending-2', title: 'Viral 50' },
    { id: 'trending-3', title: 'Global Hits' },
    { id: 'radio-3', title: 'Happy Hits' },
]

const shorts = [
    { id: 'short-1', title: 'Singapore Street Food' },
    { id: 'short-2', title: 'Gardens by the Bay Lights' },
    {
      id: 'short-3',
      title: 'Merlion Park Moments',
    },
    { id: 'short-4', title: 'Funny Cat Moments' },
    { id: 'short-5', title: 'Dance Challenge' },
    { id: 'short-6', title: 'Art & Craft DIY' },
];

export default function WatchClient() {
    const scrollRef = useRef<HTMLmainElement>(null);
    const [headerState, setHeaderState] = useState({ show: false, opaque: false, title: false });
    const [showSearch, setShowSearch] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);

    const recentlyWatchedImg = PlaceHolderImages.find(img => img.id === 'recently-watched');

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const handleScroll = () => {
            const scrollY = scrollContainer.scrollTop;
            setHeaderState({
                show: scrollY > 50,
                opaque: scrollY > 80,
                title: scrollY > 100,
            });
        };

        scrollContainer.addEventListener('scroll', handleScroll);
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, []);

    const openPlayer = () => setShowPlayer(true);
    const closePlayer = () => setShowPlayer(false);
    const openSearch = () => setShowSearch(true);
    const closeSearch = () => setShowSearch(false);

    return (
        <div className="h-full bg-white flex flex-col">
            {/* Sticky Header */}
            <header className={`p-4 flex justify-between items-center flex-shrink-0 z-20 absolute top-0 left-0 w-full transition-all duration-300 ${headerState.show ? 'translate-y-0' : '-translate-y-full'} ${headerState.opaque ? 'bg-white/80 backdrop-blur-md' : 'bg-transparent'}`}>
                <h1 className={`text-md font-bold text-gray-800 transition-opacity duration-300 ${headerState.title ? 'opacity-100' : 'opacity-0'}`}>Watch</h1>
                <Button variant="ghost" size="icon" onClick={openSearch}><Search className="w-6 h-6 text-gray-400" /></Button>
            </header>

            {/* Main Scrollable Content */}
            <main ref={scrollRef} className="flex-grow bg-white overflow-y-auto z-10 no-scrollbar h-full">
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-sky-200 via-cyan-100 to-transparent z-0"></div>
                <div className="relative z-10">
                    <header className="p-4 pt-6" style={{ opacity: headerState.show ? 0 : 1, transition: 'opacity 0.3s' }}>
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
                    
                    <div className="space-y-8 pt-2 pb-24">
                        <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800 px-4">Recently Watched</h2>
                            <div className="px-4">
                                <button onClick={openPlayer} className="w-full text-left h-auto rounded-lg shadow-xl aspect-video object-cover bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col justify-end p-4 text-white relative overflow-hidden transition-transform duration-200 hover:scale-105">
                                    {recentlyWatchedImg && <Image src={recentlyWatchedImg.imageUrl} alt="Drama Poster" fill className="absolute inset-0 w-full h-full object-cover opacity-50" data-ai-hint={recentlyWatchedImg.imageHint}/>}
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-black">From HDB to CEO</h3>
                                        <p className="text-sm">Ep 24: The Final Merger</p>
                                        <div className="mt-2 text-xs font-bold bg-white text-gray-900 px-4 py-1.5 rounded-full inline-block">Continue Watching</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800 px-4">Newly Released</h2>
                            <div className="flex space-x-4 overflow-x-auto no-scrollbar px-4">
                                {dramas.map(drama => {
                                    const image = PlaceHolderImages.find(img => img.id === drama.id);
                                    return (
                                        <button onClick={openPlayer} key={drama.id} className="w-32 flex-shrink-0 space-y-2 text-left transition-transform duration-200 hover:scale-105">
                                            {image && <Image src={image.imageUrl} alt="Drama Poster" width={128} height={192} className="w-full h-auto rounded-lg shadow-md aspect-[2/3] object-cover" data-ai-hint={image.imageHint}/>}
                                            <p className="text-sm font-semibold">{drama.title}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800 px-4">Shorts</h2>
                            <div className="grid grid-cols-3 gap-3 px-4">
                                {shorts.map(short => {
                                    const image = PlaceHolderImages.find(img => img.id === short.id);
                                    return (
                                        <button onClick={openPlayer} key={short.id} className="w-full space-y-2 text-left transition-transform duration-200 hover:scale-105">
                                            {image && <Image src={short.imageUrl} alt={short.title} width={200} height={300} className="w-full h-auto rounded-lg shadow-md aspect-[9/16] object-cover" data-ai-hint={image.imageHint}/>}
                                            <p className="text-xs font-semibold">{short.title}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800 px-4">More Dramas</h2>
                            <div className="grid grid-cols-2 gap-4 px-4">
                                {moreDramas.map((drama, index) => {
                                    const image = PlaceHolderImages.find(img => img.id === drama.id);
                                    return (
                                        <button onClick={openPlayer} key={`${drama.id}-${index}`} className="w-full space-y-2 text-left transition-transform duration-200 hover:scale-105">
                                            {image && <Image src={image.imageUrl} alt="Drama Poster" width={400} height={225} className="w-full h-auto rounded-lg shadow-md aspect-video object-cover" data-ai-hint={image.imageHint}/>}
                                            <p className="text-sm font-semibold">{drama.title}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800 px-4">Just for you</h2>
                            <div className="grid grid-cols-2 gap-4 px-4">
                                {justForYou.map((item, index) => {
                                    const image = PlaceHolderImages.find(img => img.id === item.id);
                                    return (
                                        <button onClick={openPlayer} key={`${item.id}-${index}`} className="w-full space-y-2 text-left transition-transform duration-200 hover:scale-105">
                                            {image && <Image src={image.imageUrl} alt="Drama Poster" width={400} height={225} className="w-full h-auto rounded-lg shadow-md aspect-video object-cover" data-ai-hint={image.imageHint}/>}
                                            <p className="text-sm font-semibold">{item.title}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800 px-4">Trending Now</h2>
                            <div className="grid grid-cols-2 gap-4 px-4">
                                {trendingNow.map((item, index) => {
                                    const image = PlaceHolderImages.find(img => img.id === item.id);
                                    return (
                                        <button onClick={openPlayer} key={`${item.id}-${index}`} className="w-full space-y-2 text-left transition-transform duration-200 hover:scale-105">
                                            {image && <Image src={image.imageUrl} alt="Drama Poster" width={400} height={225} className="w-full h-auto rounded-lg shadow-md aspect-video object-cover" data-ai-hint={image.imageHint}/>}
                                            <p className="text-sm font-semibold">{item.title}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <SearchOverlay show={showSearch} onClose={closeSearch} />
            <VideoPlayer show={showPlayer} onClose={closePlayer} />
        </div>
    );
}
