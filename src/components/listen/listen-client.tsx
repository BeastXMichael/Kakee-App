"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Search, Music2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { TreasureChestIcon } from '@/components/icons';
import type { TrendingContentOutput } from '@/ai/flows/trending-content-prediction';

const madeForYouItems = [
    { id: 'made-for-you-1', title: 'Shower Sessions' },
    { id: 'made-for-you-2', title: 'Workout Beats' },
    { id: 'made-for-you-3', title: 'Commute Jams' },
    { id: 'made-for-you-4', title: 'Focus Flow' },
    { id: 'made-for-you-5', title: 'Late Night Lofi' },
    { id: 'made-for-you-6', title: 'Gaming Mix' },
    { id: 'radio-1', title: 'Party Starters' },
    { id: 'radio-2', title: 'Sleepy Sounds' },
];

const favoriteRadios = [
    { id: 'radio-1', title: 'For You Mix', playing: 'Blinding Lights', playingIcon: true },
    { id: 'radio-2', title: 'Lofi Beats', playing: 'a ku ka' },
    { id: 'radio-3', title: 'Happy Hits', playing: 'Good Days' },
    { id: 'trending-1', title: 'Top Hits', playing: 'Espresso' },
];

const morePlaylists = [
    { id: 'trending-1', title: 'Top Hits', description: 'The biggest tracks right now.' },
    { id: 'trending-2', title: 'Viral 50', description: 'The songs blowing up online.' },
    { id: 'trending-3', title: 'Global Hits', description: 'Top tracks from around the world.' },
    { id: 'made-for-you-5', title: 'Indie Rock', description: 'The best of modern indie.' },
    { id: 'made-for-you-6', title: 'Happy Hits', description: 'Feel-good tracks for a great day.' },
    { id: 'recently-1', title: 'Study Beats', description: 'Instrumental beats to help you focus.' },
];

type ListenClientProps = {
    trendingData: TrendingContentOutput;
}

export default function ListenClient({ trendingData }: ListenClientProps) {
    const scrollRef = useRef<HTMLmainElement>(null);
    const [headerState, setHeaderState] = useState({ show: false, opaque: false, title: false });

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
    
    const trendingNow = trendingData.trendingContent.map((title, index) => ({
      id: `trending-${index+1}`,
      title: index === 0 ? "Top Hits" : (index === 1 ? "Viral 50" : "Global Hits"),
      playing: title
    }));


    return (
        <>
            {/* Sticky Header */}
            <header className={`p-4 flex justify-between items-center flex-shrink-0 z-20 absolute top-0 left-0 w-full transition-all duration-300 ${headerState.show ? 'translate-y-0' : '-translate-y-full'} ${headerState.opaque ? 'bg-white/80 backdrop-blur-md' : 'bg-transparent'}`}>
                <h1 className={`text-md font-bold text-gray-800 transition-opacity duration-300 ${headerState.title ? 'opacity-100' : 'opacity-0'}`}>Listen</h1>
                <button><Search className="w-6 h-6 text-gray-400" /></button>
            </header>

            {/* Main Scrollable Content */}
            <main ref={scrollRef} className="flex-grow bg-white overflow-y-auto z-10 no-scrollbar h-full">
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-red-200 via-pink-100 to-transparent z-0"></div>
                <div className="relative z-10">
                    <header className="p-4 pt-6 transition-opacity duration-300" style={{ opacity: headerState.show ? 0 : 1 }}>
                        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">Listen</h1>
                        <div className="bg-white/60 p-2 rounded-full shadow-sm border border-white/50 backdrop-blur-sm">
                            <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs font-bold"><Music2 className="w-4 h-4" /></div>
                                <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-pink-500 h-2 rounded-full" style={{ width: "41.66%" }}></div></div>
                                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-md cursor-pointer flex-shrink-0 animate-chest-glow">
                                    <TreasureChestIcon className="w-6 h-6"/>
                                </div>
                            </div>
                        </div>
                    </header>
                    
                    <div className="grid grid-cols-2 gap-2 px-4">
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
                            <h2 className="font-bold text-xl mb-3 text-gray-800 px-4">Your Favorite Radios</h2>
                            <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-4 px-8">
                                {favoriteRadios.map(radio => {
                                    const image = PlaceHolderImages.find(img => img.id === radio.id);
                                    return (
                                        <div key={radio.id} className="w-40 flex-shrink-0 space-y-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
                                            <div className="w-full h-auto rounded-lg shadow-md aspect-square overflow-hidden">
                                                {image && <Image src={image.imageUrl} alt={radio.title} width={160} height={160} className="w-full h-full object-cover" data-ai-hint={image.imageHint}/>}
                                            </div>
                                            <div className="flex items-center gap-1.5 min-w-0">
                                                <p className="text-sm font-semibold truncate">{radio.title}</p>
                                                {radio.playingIcon && <div className="playing h-3 w-4 shrink-0 flex items-end gap-[2px] text-emerald-500" aria-hidden="true" title="Now playing"><span className="bar"></span><span className="bar"></span><span className="bar"></span></div>}
                                            </div>
                                            <p className="text-xs text-gray-500 truncate">Now Playing: {radio.playing}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800 px-4">Trending Now</h2>
                            <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-4 px-8">
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
                            <h2 className="font-bold text-xl mb-3 text-gray-800 px-4">More Playlists</h2>
                            <div className="px-4 space-y-2">
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
        </>
    );
}
