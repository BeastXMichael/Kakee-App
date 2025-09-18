
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
};

type WatchClientProps = {
    trendingDramas: VideoItem[];
    forYou: VideoItem[];
    longFormDramas: VideoItem[];
    newAndTrending: VideoItem[];
    shorts: VideoItem[];
    top10Singapore: VideoItem[];
    kDramas: VideoItem[];
};


export default function WatchClient({ trendingDramas, forYou, longFormDramas, newAndTrending, shorts, top10Singapore, kDramas }: WatchClientProps) {
    const [showSearch, setShowSearch] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);


    const recentlyWatchedImg = PlaceHolderImages.find(img => img.id === 'recently-watched');

    const openSearch = () => setShowSearch(true);
    const closeSearch = () => setShowSearch(false);

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
                    
                    <Link href="/watch/drama/recently-watched" className="w-full text-left h-auto rounded-lg shadow-xl aspect-video object-cover bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col justify-end p-4 text-white relative overflow-hidden transition-transform duration-200 hover:scale-105 block">
                        {recentlyWatchedImg && <Image src={recentlyWatchedImg.imageUrl} alt="Drama Poster" fill className="absolute inset-0 w-full h-full object-cover opacity-50" data-ai-hint={recentlyWatchedImg.imageHint}/>}
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black text-shadow">Dune: Part Two</h3>
                            <p className="text-sm text-shadow-sm">Continue where you left off</p>
                            <div className="mt-2 text-xs font-bold bg-white text-gray-900 px-4 py-1.5 rounded-full inline-block">Continue Watching</div>
                        </div>
                    </Link>
                    
                    <div className="space-y-8 pt-6 pb-24">
                        <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800">Trending Dramas</h2>
                            <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-4 px-4">
                                {trendingDramas.map(drama => {
                                    const image = PlaceHolderImages.find(img => img.id === drama.id);
                                    return (
                                        <Link href={`/watch/${drama.id}`} key={drama.id} className="w-32 flex-shrink-0 space-y-2 text-left transition-transform duration-200 hover:scale-105">
                                            {image && <Image src={image.imageUrl} alt="Drama Poster" width={128} height={192} className="w-full h-auto rounded-lg shadow-md aspect-[2/3] object-cover" data-ai-hint={image.imageHint}/>}
                                            <p className="text-sm font-semibold">{drama.title}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800">Shorts</h2>
                            <div className="grid grid-cols-3 gap-3">
                                {shorts.map(short => {
                                    const image = PlaceHolderImages.find(img => img.id === short.id);
                                    return (
                                        <Link href={`/watch/${short.id}`} key={short.id} className="w-full space-y-2 text-left transition-transform duration-200 hover:scale-105">
                                            {image && <Image src={image.imageUrl} alt={short.title} width={200} height={300} className="w-full h-auto rounded-lg shadow-md aspect-[9/16] object-cover" data-ai-hint={image.imageHint}/>}
                                            <p className="text-xs font-semibold">{short.title}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800">Top 10 in Singapore Today</h2>
                            <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-4 px-4">
                                {top10Singapore.map((item, index) => {
                                    const image = PlaceHolderImages.find(img => img.id === item.id);
                                    return (
                                        <Link href={`/watch/drama/${item.id}`} key={`${item.id}-${index}`} className="flex-shrink-0 space-y-2 text-left transition-transform duration-200 hover:scale-105 w-40">
                                            <div className="relative">
                                                <div className="text-8xl font-black text-white absolute -left-4 -bottom-4" style={{ WebkitTextStroke: "4px black", textStroke: "4px black", zIndex: 0 }}>{index + 1}</div>
                                                {image && <Image src={image.imageUrl} alt={item.title} width={128} height={192} className="w-full h-auto rounded-lg shadow-md aspect-[2/3] object-cover relative z-10 ml-auto" style={{ width: '80%'}} data-ai-hint={image.imageHint}/>}
                                            </div>
                                            <p className="text-sm font-semibold">{item.title}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800">Long-Form Dramas</h2>
                            <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-4 px-4">
                                {longFormDramas.map(drama => {
                                    const image = PlaceHolderImages.find(img => img.id === drama.id);
                                    return (
                                        <Link href={`/watch/drama/${drama.id}`} key={drama.id} className="w-32 flex-shrink-0 space-y-2 text-left transition-transform duration-200 hover:scale-105">
                                            {image && <Image src={image.imageUrl} alt="Drama Poster" width={128} height={192} className="w-full h-auto rounded-lg shadow-md aspect-[2/3] object-cover" data-ai-hint={image.imageHint}/>}
                                            <p className="text-sm font-semibold">{drama.title}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        
                        <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800">New & Trending</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {newAndTrending.map((drama, index) => {
                                    const image = PlaceHolderImages.find(img => img.id === drama.id);
                                    return (
                                        <Link href={`/watch/drama/${drama.id}`} key={`${drama.id}-${index}`} className="w-full space-y-2 text-left transition-transform duration-200 hover:scale-105">
                                            {image && <Image src={image.imageUrl} alt="Drama Poster" width={400} height={225} className="w-full h-auto rounded-lg shadow-md aspect-video object-cover" data-ai-hint={image.imageHint}/>}
                                            <p className="text-sm font-semibold">{drama.title}</p>
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
