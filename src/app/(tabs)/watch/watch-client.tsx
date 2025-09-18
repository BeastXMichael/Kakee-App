
"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Search, Clapperboard } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { KoinIcon, BellIcon, TreasureChestIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import SearchOverlay from '@/components/watch/search-overlay';
import { ProfileAvatar } from '@/components/home/profile-avatar';
import NotificationPanel from '@/components/notifications/notification-panel';
import { Progress } from '@/components/ui/progress';

type VideoItem = {
    id: string;
    title: string;
    type: 'short' | 'drama' | 'regular';
};

type WatchClientProps = {
    trendingDramas: VideoItem[];
    forYou: VideoItem[];
    realityShows: VideoItem[];
    newAndTrending: VideoItem[];
    shorts: VideoItem[];
    top10Singapore: VideoItem[];
    kDramas: VideoItem[];
    regularVideos: VideoItem[];
};


export default function WatchClient({ trendingDramas, forYou, realityShows, newAndTrending, shorts, top10Singapore, kDramas, regularVideos }: WatchClientProps) {
    const [showSearch, setShowSearch] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);


    const recentlyWatchedImg = PlaceHolderImages.find(img => img.id === 'recently-watched');

    const openSearch = () => setShowSearch(true);
    const closeSearch = () => setShowSearch(false);
    
    const allLongFormContent = [
        ...newAndTrending.map(item => ({ ...item, category: 'New & Trending', type: 'drama' })),
        ...realityShows.map(item => ({ ...item, category: 'Reality Show', type: 'drama' })),
        ...regularVideos.map(item => ({ ...item, category: 'Regular Videos', type: 'regular' })),
        ...trendingDramas.map(item => ({...item, category: 'Trending Dramas', type: 'short' })),
        ...top10Singapore.map(item => ({...item, category: 'Top 10 in Singapore Today', type: item.id.includes('short') ? 'short' : 'drama' })),
    ];
    
    const getHref = (item: {id: string, type: 'short' | 'drama' | 'regular' | string}) => {
        switch(item.type) {
            case 'short': return `/watch/${item.id}`;
            case 'drama': return `/watch/drama/${item.id}`;
            case 'regular': return `/watch/regular/${item.id}`;
            default: return `/watch/${item.id}`;
        }
    }


    return (
        <div className="h-full bg-white flex flex-col relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-sky-200 via-cyan-100 to-transparent z-0"></div>
            
            <header className="p-4 flex justify-between items-center z-10 flex-shrink-0 sticky top-0 bg-transparent backdrop-blur-sm">
                <Link href="/account" className="flex items-center space-x-3">
                    <div className="w-10 h-10">
                        <ProfileAvatar />
                    </div>
                    <div>
                        <h1 className="text-md font-bold text-primary-foreground">Time to Binge</h1>
                        <p className="text-xs text-muted-foreground">Grab your popcorn!</p>
                    </div>
                </Link>
                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)} className="text-muted-foreground transition-transform duration-200 hover:scale-105 cursor-pointer">
                        <Search className="w-6 h-6" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setShowNotifications(true)} className="text-muted-foreground transition-transform duration-200 hover:scale-105 cursor-pointer relative">
                        <BellIcon className="w-6 h-6" />
                        <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-background"/>
                    </Button>
                </div>
            </header>

            {/* Main Scrollable Content */}
            <main className="flex-grow bg-transparent overflow-y-auto z-10 no-scrollbar h-full px-4">
                
                <div className="relative z-10">
                     <div className="bg-white/60 p-2 my-4 rounded-full shadow-sm border border-white/30 backdrop-blur-sm flex items-center space-x-2 flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                            <Clapperboard className="w-4 h-4" />
                        </div>
                        <div className='w-full'>
                            <Progress value={75} className='h-3' />
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md cursor-pointer flex-shrink-0 animate-chest-glow">
                            <TreasureChestIcon className="w-7 h-7"/>
                        </div>
                    </div>
                    
                    <div className='space-y-8 pt-6 pb-24'>
                         <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800">Shorts</h2>
                            <div className="flex space-x-3 overflow-x-auto no-scrollbar -mx-4 px-4">
                                {shorts.map(short => {
                                    const image = PlaceHolderImages.find(img => img.id === short.id);
                                    return (
                                        <Link href={`/watch/${short.id}`} key={short.id} className="w-28 flex-shrink-0 space-y-2 text-left transition-transform duration-200 hover:scale-105">
                                            {image && <Image src={image.imageUrl} alt={short.title} width={200} height={300} className="w-full h-auto rounded-lg shadow-md aspect-[9/16] object-cover" data-ai-hint={image.imageHint}/>}
                                            <p className="text-xs font-semibold">{short.title}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="space-y-4">
                             <h2 className="font-bold text-xl text-gray-800">For You</h2>
                             <div className="grid grid-cols-2 gap-4">
                                {allLongFormContent.map((item, index) => {
                                    const image = PlaceHolderImages.find(img => img.id === item.id);
                                    const isVertical = ['short', 'drama'].includes(item.type) && item.id.includes('drama') && !item.id.includes('k-drama');
                                    
                                    return (
                                        <Link href={getHref(item)} key={`${item.id}-${index}`} className="w-full space-y-2 text-left transition-transform duration-200 hover:scale-105">
                                            {image && <Image src={image.imageUrl} alt={item.title} width={400} height={225} className={`w-full h-auto rounded-lg shadow-md object-cover ${isVertical ? 'aspect-[2/3]' : 'aspect-video'}`} data-ai-hint={image.imageHint}/>}
                                            <p className="text-sm font-semibold">{item.title}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <SearchOverlay show={showSearch} onClose={closeSearch} />
            <NotificationPanel show={showNotifications} onClose={() => setShowNotifications(false)} />
        </div>
    );
}
