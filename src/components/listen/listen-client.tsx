
"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Search, BellIcon } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { KoinIcon } from '@/components/icons';
import type { TrendingContentOutput } from '@/ai/flows/trending-content-prediction';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ListenSearchOverlay from './search-overlay';
import { ProfileAvatar } from '../home/profile-avatar';

const madeForYouItems = [
    { id: 'made-for-you-1', title: 'Shower Power' },
    { id: 'made-for-you-2', title: 'Running Flash' },
    { id: 'made-for-you-3', title: 'Commute Grooves' },
    { id: 'made-for-you-4', title: 'Focus Learning' },
    { id: 'made-for-you-5', title: 'Midnight Chill' },
    { id: 'made-for-you-6', title: 'Game On' },
    { id: 'radio-1', title: 'Party Mode' },
    { id: 'radio-2', title: 'Sleepy Time' },
];

const morePlaylists = [
    { id: 'trending-1', title: 'Adrenaline Rush', description: 'High-energy tracks for your workout.' },
    { id: 'trending-2', title: 'Creative Flow', description: 'Inspiring music to get your ideas flowing.' },
    { id: 'trending-3', title: 'Road Trip Anthems', description: 'The perfect soundtrack for your journey.' },
    { id: 'made-for-you-5', title: 'Indie Drive', description: 'Cruising with the best modern indie.' },
    { id: 'made-for-you-6', title: 'Sunshine Beats', description: 'Feel-good tracks for a great day.' },
    { id: 'recently-1', title: 'Deep Study', description: 'Instrumental beats to help you focus.' },
];

type ListenClientProps = {
    trendingData: TrendingContentOutput;
}

export default function ListenClient({ trendingData }: ListenClientProps) {
    const scrollRef = useRef<HTMLmainElement>(null);
    const [headerState, setHeaderState] = useState({ show: false, opaque: false, title: false });
    const [showSearch, setShowSearch] = useState(false);

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
    
    const trendingNow = trendingData.trendingContent.slice(0, 5).map((playingTitle, index) => {
      const items = [
          { id: 'trending-1', title: 'Upbeat Pop', playing: playingTitle },
          { id: 'trending-2', title: 'Chill Vibes', playing: playingTitle },
          { id: 'trending-3', title: 'Global Grooves', playing: playingTitle },
          { id: 'radio-3', title: 'Happy Hits', playing: playingTitle },
          { id: 'made-for-you-1', title: 'Shower Jams', playing: playingTitle }
      ];
      return items[index];
    });


    return (
        <>
            <div className="flex flex-col h-full bg-background relative overflow-y-auto no-scrollbar">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-200 via-pink-100 to-transparent z-0"></div>
                
                <header className="p-4 flex justify-between items-center z-10 flex-shrink-0 sticky top-0 bg-transparent backdrop-blur-sm">
                    <Link href="/account" className="flex items-center space-x-3">
                        <div className="w-10 h-10">
                            <ProfileAvatar />
                        </div>
                        <div>
                            <h1 className="text-md font-bold text-primary-foreground">What's your mood?</h1>
                            <p className="text-xs text-muted-foreground">We've got a beat for that</p>
                        </div>
                    </Link>
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)} className="text-muted-foreground transition-transform duration-200 hover:scale-105 cursor-pointer">
                            <Search className="w-6 h-6" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-muted-foreground transition-transform duration-200 hover:scale-105 cursor-pointer">
                            <BellIcon className="w-6 h-6" />
                        </Button>
                    </div>
                </header>

                <main ref={scrollRef} className="flex-grow bg-transparent overflow-y-auto z-10 no-scrollbar px-4 h-full">
                    <div className="relative z-10">
                        <Link href="/rewards" className="bg-white/60 p-3 my-4 rounded-full shadow-sm border border-white/30 backdrop-blur-sm flex items-center space-x-2 flex-shrink-0 transition-transform duration-200 hover:scale-105 cursor-pointer">
                            <KoinIcon />
                            <span className="font-bold text-primary-foreground">1,250 Koins</span>
                            <div className="flex-grow"></div>
                            <div className="text-xs font-bold bg-gray-800 text-white px-3 py-1 rounded-full h-auto hover:bg-black transition">Redeem</div>
                        </Link>
                        
                        <div className="grid grid-cols-2 gap-2">
                        {madeForYouItems.map(item => {
                            const image = PlaceHolderImages.find(img => img.id === item.id);
                            return (
                            <div key={item.id} className="bg-white/60 backdrop-blur-sm rounded-md flex items-center space-x-2 shadow-sm border border-white/50 overflow-hidden transition-transform duration-200 hover:scale-105 cursor-pointer">
                                {image && <Image src={image.imageUrl} alt={item.title} width={48} height={48} className="w-12 h-12 flex-shrink-0" data-ai-hint={image.imageHint} />}
                                <p className="text-xs font-bold truncate pr-2">{item.title}</p>
                            </div>
                            );
                        })}
                        </div>

                        <div className="space-y-8 py-6 pb-24">
                            <div>
                                <h2 className="font-bold text-xl mb-3 text-gray-800">Trending Now</h2>
                                <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-4 px-4">
                                    {trendingNow.map(item => {
                                        const image = PlaceHolderImages.find(img => img.id === item.id);
                                        return(
                                            <div key={item.id} className="w-32 flex-shrink-0 space-y-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                <div className="w-full h-auto rounded-lg shadow-md aspect-square overflow-hidden">
                                                {image && <Image src={image.imageUrl} alt={item.title} width={128} height={128} className="w-full h-full object-cover" data-ai-hint={image.imageHint}/>}
                                                </div>
                                                <p className="text-sm font-semibold truncate">{item.title}</p>
                                                <p className="text-xs text-gray-500 truncate">Now Playing: {item.playing}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <h2 className="font-bold text-xl mb-3 text-gray-800">More Playlists</h2>
                                <div className="space-y-2">
                                    {morePlaylists.map(item => {
                                        const image = PlaceHolderImages.find(img => img.id === item.id);
                                        return(
                                            <div key={item.id} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100/50 transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                <div className="w-16 h-16 rounded-lg shadow-md aspect-square overflow-hidden flex-shrink-0">
                                                    {image && <Image src={image.imageUrl} alt={item.title} width={64} height={64} className="w-full h-full object-cover" data-ai-hint={image.imageHint}/>}
                                                </div>
                                                <div>
                                                    <p className="font-bold truncate">{item.title}</p>
                                                    <p className="text-sm text-gray-600 truncate">{item.description}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <ListenSearchOverlay show={showSearch} onClose={() => setShowSearch(false)} />
        </>
    );
}
