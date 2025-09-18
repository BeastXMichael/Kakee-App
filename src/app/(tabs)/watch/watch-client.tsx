"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { KoinIcon, BellIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import SearchOverlay from '@/components/watch/search-overlay';
import VideoPlayer from '@/components/watch/video-player';
import { ProfileAvatar } from '@/components/home/profile-avatar';
import NotificationPanel from '@/components/notifications/notification-panel';

type VideoItem = {
    id: string;
    title: string;
};

type WatchClientProps = {
    topVideos: VideoItem[];
    trendingDramas: VideoItem[];
    forYou: VideoItem[];
    moreToWatch: VideoItem[];
    shorts: VideoItem[];
    top10Singapore: VideoItem[];
    kDramas: VideoItem[];
};


export default function WatchClient({ topVideos, trendingDramas, forYou, moreToWatch, shorts, top10Singapore, kDramas }: WatchClientProps) {
    const scrollRef = useRef<HTMLmainElement>(null);
    const [headerState, setHeaderState] = useState({ show: false, opaque: false, title: false });
    const [showSearch, setShowSearch] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);


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
            <main ref={scrollRef} className="flex-grow bg-transparent overflow-y-auto z-10 no-scrollbar h-full px-4">
                
                <div className="relative z-10">
                    <Link href="/rewards" className="bg-white/60 p-3 my-4 rounded-full shadow-sm border border-white/30 backdrop-blur-sm flex items-center space-x-2 flex-shrink-0 transition-transform duration-200 hover:scale-105 cursor-pointer">
                        <KoinIcon />
                        <span className="font-bold text-primary-foreground">1,250 Koins</span>
                        <div className="flex-grow"></div>
                        <div className="text-xs font-bold bg-gray-800 text-white px-3 py-1 rounded-full h-auto hover:bg-black transition">Redeem</div>
                    </Link>
                    
                    <div className="grid grid-cols-2 gap-2">
                        {topVideos.slice(0,8).map(item => {
                            const image = PlaceHolderImages.find(img => img.id === item.id);
                            return (
                            <button onClick={openPlayer} key={item.id} className="bg-white/60 backdrop-blur-sm rounded-md flex items-center space-x-2 shadow-sm border border-white/50 overflow-hidden transition-transform duration-200 hover:scale-105 cursor-pointer group">
                                {image && <Image src={image.imageUrl} alt={item.title} width={48} height={48} className="w-12 h-12 flex-shrink-0 object-cover" data-ai-hint={image.imageHint} />}
                                <div className="truncate pr-2 flex-grow text-left">
                                  <p className="text-xs font-bold truncate">{item.title}</p>
                                </div>
                            </button>
                            );
                        })}
                    </div>
                    
                    <div className="space-y-8 pt-6 pb-24">
                        <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800">Trending Dramas</h2>
                            <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-4 px-4">
                                {trendingDramas.map(drama => {
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
                            <h2 className="font-bold text-xl mb-3 text-gray-800">Shorts</h2>
                            <div className="grid grid-cols-3 gap-3">
                                {shorts.map(short => {
                                    const image = PlaceHolderImages.find(img => img.id === short.id);
                                    return (
                                        <button onClick={openPlayer} key={short.id} className="w-full space-y-2 text-left transition-transform duration-200 hover:scale-105">
                                            {image && <Image src={image.imageUrl} alt={short.title} width={200} height={300} className="w-full h-auto rounded-lg shadow-md aspect-[9/16] object-cover" data-ai-hint={image.imageHint}/>}
                                            <p className="text-xs font-semibold">{short.title}</p>
                                        </button>
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
                                        <button onClick={openPlayer} key={`${item.id}-${index}`} className="flex-shrink-0 space-y-2 text-left transition-transform duration-200 hover:scale-105 w-40">
                                            <div className="relative">
                                                <div className="text-8xl font-black text-white absolute -left-4 -bottom-4" style={{ WebkitTextStroke: "4px black", textStroke: "4px black", zIndex: 0 }}>{index + 1}</div>
                                                {image && <Image src={image.imageUrl} alt={item.title} width={128} height={192} className="w-full h-auto rounded-lg shadow-md aspect-[2/3] object-cover relative z-10 ml-auto" style={{ width: '80%'}} data-ai-hint={image.imageHint}/>}
                                            </div>
                                            <p className="text-sm font-semibold">{item.title}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h2 className="font-bold text-xl mb-3 text-gray-800">K-Dramas</h2>
                            <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-4 px-4">
                                {kDramas.map(drama => {
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
                            <h2 className="font-bold text-xl mb-3 text-gray-800">More to Watch</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {moreToWatch.map((drama, index) => {
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
                        
                    </div>
                </div>
            </main>

            <SearchOverlay show={showSearch} onClose={closeSearch} />
            <VideoPlayer show={showPlayer} onClose={closePlayer} />
            <NotificationPanel show={showNotifications} onClose={() => setShowNotifications(false)} />
        </div>
    );
}
