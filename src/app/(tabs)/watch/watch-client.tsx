
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

type WatchClientProps = {
    trendingDramas: { id: string, title: string }[];
    forYou: { id: string, title: string }[];
    realityShows: { id: string, title: string }[];
    newAndTrending: { id: string, title: string }[];
    shorts: { id: string, title: string }[];
    top10Singapore: { id: string, title: string }[];
    kDramas: { id: string, title: string }[];
    regularVideos: { id: string, title: string }[];
};


export default function WatchClient({ trendingDramas, forYou, realityShows, newAndTrending, shorts, top10Singapore, kDramas, regularVideos }: WatchClientProps) {
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
                    
                    {recentlyWatchedImg && (
                        <div className="mb-8 space-y-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
                            <h2 className="font-bold text-xl mb-3 text-gray-800">Continue Watching</h2>
                            <Image src={recentlyWatchedImg.imageUrl} alt={recentlyWatchedImg.description} width={400} height={231} className="w-full h-auto rounded-lg shadow-md aspect-video object-cover" data-ai-hint={recentlyWatchedImg.imageHint}/>
                            <p className="font-bold">From HDB to CEO</p>
                            <p className="text-xs text-gray-500">S1:E8 - The Final Merger</p>
                        </div>
                    )}
                    
                    <div className='space-y-8 py-6 pb-24'>
                        <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800">For You</h2>
                            <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-4 px-4">
                                {forYou.map(item => {
                                    const image = PlaceHolderImages.find(img => img.id === item.id);
                                    return (
                                        <Link href={`/watch/drama/${item.id}`} key={item.id} className="w-32 flex-shrink-0 space-y-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
                                            {image && <Image src={image.imageUrl} alt={item.title} width={200} height={300} className="w-full h-auto rounded-lg shadow-md aspect-[2/3] object-cover" data-ai-hint={image.imageHint}/>}
                                            <p className="text-sm font-semibold">{item.title}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800">New & Trending</h2>
                            <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-4 px-4">
                                {newAndTrending.map(item => {
                                    const image = PlaceHolderImages.find(img => img.id === item.id);
                                    return (
                                        <Link href={`/watch/drama/${item.id}`} key={item.id} className="w-48 flex-shrink-0 space-y-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
                                            {image && <Image src={image.imageUrl} alt={item.title} width={400} height={225} className="w-full h-auto rounded-lg shadow-md aspect-video object-cover" data-ai-hint={image.imageHint}/>}
                                            <p className="text-sm font-semibold">{item.title}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

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
                        
                        <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800">Top 10 in Singapore Today</h2>
                            <div className="flex space-x-2 overflow-x-auto no-scrollbar -mx-4 px-4 items-end">
                                {top10Singapore.map((item, index) => {
                                    const image = PlaceHolderImages.find(img => img.id === item.id);
                                    return (
                                        <Link href={`/watch/drama/${item.id}`} key={item.id} className="flex-shrink-0 flex items-end space-x-[-20px] transition-transform duration-200 hover:scale-105 cursor-pointer">
                                            <span className="text-8xl font-black text-gray-300 z-0" style={{WebkitTextStroke: '2px white'}}>{index + 1}</span>
                                            {image && <Image src={image.imageUrl} alt={item.title} width={200} height={300} className="w-28 h-auto rounded-lg shadow-md aspect-[2/3] object-cover z-10" data-ai-hint={image.imageHint}/>}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        
                         <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800">Reality Show: 피지컬-100</h2>
                            <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-4 px-4">
                                {realityShows.map(item => {
                                    const image = PlaceHolderImages.find(img => img.id === item.id);
                                    return (
                                        <Link href={`/watch/drama/${item.id}`} key={item.id} className="w-48 flex-shrink-0 space-y-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
                                            {image && <Image src={image.imageUrl} alt={item.title} width={400} height={225} className="w-full h-auto rounded-lg shadow-md aspect-video object-cover" data-ai-hint={image.imageHint}/>}
                                            <p className="text-sm font-semibold">{item.title}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800">Must-Watch K-Dramas</h2>
                            <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-4 px-4">
                                {kDramas.map(item => {
                                    const image = PlaceHolderImages.find(img => img.id === item.id);
                                    return (
                                        <Link href={`/watch/drama/${item.id}`} key={item.id} className="w-32 flex-shrink-0 space-y-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
                                            {image && <Image src={image.imageUrl} alt={item.title} width={200} height={300} className="w-full h-auto rounded-lg shadow-md aspect-[2/3] object-cover" data-ai-hint={image.imageHint}/>}
                                            <p className="text-sm font-semibold">{item.title}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800">Trending Dramas</h2>
                            <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-4 px-4">
                                {trendingDramas.map(item => {
                                    const image = PlaceHolderImages.find(img => img.id === item.id);
                                    return (
                                        <Link href={`/watch/${item.id}`} key={item.id} className="w-32 flex-shrink-0 space-y-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
                                            {image && <Image src={image.imageUrl} alt={item.title} width={200} height={300} className="w-full h-auto rounded-lg shadow-md aspect-[2/3] object-cover" data-ai-hint={image.imageHint}/>}
                                            <p className="text-sm font-semibold">{item.title}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        
                        <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800">Regular Videos</h2>
                            <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-4 px-4">
                                {regularVideos.map(item => {
                                    const image = PlaceHolderImages.find(img => img.id === item.id);
                                    return (
                                        <Link href={`/watch/regular/${item.id}`} key={item.id} className="w-48 flex-shrink-0 space-y-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
                                            {image && <Image src={image.imageUrl} alt={item.title} width={400} height={225} className="w-full h-auto rounded-lg shadow-md aspect-video object-cover" data-ai-hint={image.imageHint}/>}
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

    