"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Play } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { KoinIcon, BellIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import SearchOverlay from '@/components/watch/search-overlay';
import VideoPlayer from '@/components/watch/video-player';
import { ProfileAvatar } from '@/components/home/profile-avatar';
import NotificationPanel from '@/components/notifications/notification-panel';

export type VideoContent = {
    id: string;
    title: string;
    playlistId: string;
    imageId: string;
    description?: string;
}

type WatchClientProps = {
    topVideos: VideoContent[];
    trendingDramas: VideoContent[];
    forYou: VideoContent[];
    moreToWatch: VideoContent[];
}

export default function WatchClient({ topVideos, trendingDramas, forYou, moreToWatch }: WatchClientProps) {
    const [showSearch, setShowSearch] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const openPlayer = () => setShowPlayer(true);
    const closePlayer = () => setShowPlayer(false);
    const openSearch = () => setShowSearch(true);
    const closeSearch = () => setShowSearch(false);

    return (
        <>
            <div className="flex flex-col h-full bg-background relative overflow-y-auto no-scrollbar">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-sky-200 via-cyan-100 to-transparent z-0"></div>
                
                <header className="p-4 flex justify-between items-center z-10 flex-shrink-0 sticky top-0 bg-transparent backdrop-blur-sm">
                     <Link href="/account" className="flex items-center space-x-3">
                        <div className="w-10 h-10">
                            <ProfileAvatar />
                        </div>
                        <div>
                            <h1 className="text-md font-bold text-primary-foreground">Ready to binge?</h1>
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

                <main className="flex-grow bg-transparent overflow-y-auto z-10 no-scrollbar px-4 h-full">
                    <div className="relative z-10">
                         <Link href="/rewards" className="bg-white/60 p-3 my-4 rounded-full shadow-sm border border-white/30 backdrop-blur-sm flex items-center space-x-2 flex-shrink-0 transition-transform duration-200 hover:scale-105 cursor-pointer">
                            <KoinIcon />
                            <span className="font-bold text-primary-foreground">1,250 Koins</span>
                            <div className="flex-grow"></div>
                            <div className="text-xs font-bold bg-gray-800 text-white px-3 py-1 rounded-full h-auto hover:bg-black transition">Redeem</div>
                        </Link>
                        
                        <div className="grid grid-cols-2 gap-2">
                            {topVideos.map(item => {
                                const image = PlaceHolderImages.find(img => img.id === item.imageId);
                                return (
                                <button onClick={openPlayer} key={item.id} className="bg-white/60 backdrop-blur-sm rounded-md flex items-center space-x-2 shadow-sm border border-white/50 overflow-hidden transition-transform duration-200 hover:scale-105 cursor-pointer group">
                                    {image && <Image src={image.imageUrl} alt={item.title} width={48} height={48} className="w-12 h-12 flex-shrink-0 object-cover" data-ai-hint={image.imageHint} />}
                                    <div className="truncate pr-2 flex-grow text-left">
                                      <p className="text-xs font-bold truncate">{item.title}</p>
                                    </div>
                                    <div className="pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Play className="w-5 h-5 text-primary" fill="currentColor"/>
                                    </div>
                                </button>
                                );
                            })}
                        </div>

                        <div className="space-y-8 py-6 pb-24">
                             <div>
                                <h2 className="font-bold text-xl mb-3 text-gray-800">Trending Dramas</h2>
                                <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-4 px-4">
                                    {trendingDramas.map(item => {
                                        const image = PlaceHolderImages.find(img => img.id === item.imageId);
                                        return(
                                            <button onClick={openPlayer} key={item.id} className="w-32 flex-shrink-0 space-y-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                <div className="w-full h-auto rounded-lg shadow-md aspect-[2/3] overflow-hidden">
                                                {image && <Image src={image.imageUrl} alt={item.title} width={128} height={192} className="w-full h-full object-cover" data-ai-hint={image.imageHint}/>}
                                                </div>
                                                <p className="text-sm font-semibold truncate">{item.title}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            
                            <div>
                                <h2 className="font-bold text-xl mb-3 text-gray-800">For You</h2>
                                <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-4 px-4">
                                    {forYou.map(item => {
                                        const image = PlaceHolderImages.find(img => img.id === item.imageId);
                                        return(
                                            <button onClick={openPlayer} key={item.id} className="w-40 flex-shrink-0 space-y-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                <div className="w-full h-auto rounded-lg shadow-md aspect-video overflow-hidden">
                                                {image && <Image src={image.imageUrl} alt={item.title} width={160} height={90} className="w-full h-full object-cover" data-ai-hint={image.imageHint}/>}
                                                </div>
                                                <p className="text-sm font-semibold truncate text-center">{item.title}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <h2 className="font-bold text-xl mb-3 text-gray-800">More to Watch</h2>
                                <div className="space-y-2">
                                    {moreToWatch.map(item => {
                                        const image = PlaceHolderImages.find(img => img.id === item.imageId);
                                        return(
                                            <button onClick={openPlayer} key={item.id} className="w-full flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100/50 transition-transform duration-200 hover:scale-105 cursor-pointer group">
                                                <div className="w-24 h-14 rounded-lg shadow-md aspect-video overflow-hidden flex-shrink-0">
                                                    {image && <Image src={image.imageUrl} alt={item.title} width={96} height={54} className="w-full h-full object-cover" data-ai-hint={image.imageHint}/>}
                                                </div>
                                                <div className="flex-grow text-left">
                                                    <p className="font-bold truncate">{item.title}</p>
                                                    <p className="text-sm text-gray-600 truncate">{item.description}</p>
                                                </div>
                                                 <div className="pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Play className="w-6 h-6 text-primary" fill="currentColor"/>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <SearchOverlay show={showSearch} onClose={closeSearch} />
            <VideoPlayer show={showPlayer} onClose={closePlayer} />
            <NotificationPanel show={showNotifications} onClose={() => setShowNotifications(false)} />
        </>
    );
}
