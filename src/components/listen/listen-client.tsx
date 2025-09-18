
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Search, Play } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { KoinIcon, BellIcon } from '@/components/icons';
import type { TrendingContentOutput } from '@/ai/flows/trending-content-prediction';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ListenSearchOverlay from './search-overlay';
import { ProfileAvatar } from '../home/profile-avatar';
import NotificationPanel from '../notifications/notification-panel';

const topSongs = [
    { id: 'made-for-you-1', title: 'Espresso', artist: 'Sabrina Carpenter' },
    { id: 'made-for-you-2', title: 'Good Luck, Babe!', artist: 'Chappell Roan' },
    { id: 'made-for-you-3', title: 'Die With A Smile', artist: 'Lady Gaga' },
    { id: 'made-for-you-4', title: 'Please Please Please', artist: 'Sabrina Carpenter' },
    { id: 'made-for-you-5', title: 'Taste', artist: 'Sabrina Carpenter' },
    { id: 'made-for-you-6', title: 'Birds of a Feather', artist: 'Billie Eilish' },
    { id: 'radio-1', title: 'Not Like Us', artist: 'Kendrick Lamar' },
    { id: 'radio-2', title: 'I Am The Walrus', artist: 'The Beatles' },
];

const radioStations = [
    { id: 'radio-1', title: 'Lofi Beats Radio' },
    { id: 'radio-2', title: 'K-Pop Fever' },
    { id: 'radio-3', title: 'Mandopop Hits' },
];

const moreSongs = [
    { id: 'trending-1', title: 'Adrenaline Rush', artist: 'High-energy tracks for your workout.', playlistId: 'shower-power' },
    { id: 'trending-2', title: 'Creative Flow', artist: 'Inspiring music to get your ideas flowing.', playlistId: 'shower-power' },
    { id: 'trending-3', title: 'Road Trip Anthems', artist: 'The perfect soundtrack for your journey.', playlistId: 'shower-power' },
    { id: 'made-for-you-5', title: 'Indie Drive', artist: 'Cruising with the best modern indie.', playlistId: 'shower-power' },
    { id: 'made-for-you-6', title: 'Sunshine Beats', artist: 'Feel-good tracks for a great day.', playlistId: 'shower-power' },
    { id: 'recently-1', title: 'Deep Study', artist: 'Instrumental beats to help you focus.', playlistId: 'shower-power' },
];

type ListenClientProps = {
    trendingData: TrendingContentOutput;
}

export default function ListenClient({ trendingData }: ListenClientProps) {
    const [showSearch, setShowSearch] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const trendingPlaylists = [
        { id: 'trending-1', title: 'Workout Power', playing: trendingData.trendingContent[0], playlistId: 'shower-power' },
        { id: 'trending-2', title: 'Chill Vibes', playing: trendingData.trendingContent[1], playlistId: 'shower-power' },
        { id: 'trending-3', title: 'Global Grooves', playing: trendingData.trendingContent[2], playlistId: 'shower-power' },
        { id: 'radio-3', title: 'Happy Hits', playing: trendingData.trendingContent[3], playlistId: 'shower-power' },
        { id: 'made-for-you-1', title: 'Shower Jams', playing: trendingData.trendingContent[4], playlistId: 'shower-power' }
    ];


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
                        {topSongs.map(item => {
                            const image = PlaceHolderImages.find(img => img.id === item.id);
                            return (
                            <button key={item.id} className="bg-white/60 backdrop-blur-sm rounded-md flex items-center space-x-2 shadow-sm border border-white/50 overflow-hidden transition-transform duration-200 hover:scale-105 cursor-pointer group">
                                {image && <Image src={image.imageUrl} alt={item.title} width={48} height={48} className="w-12 h-12 flex-shrink-0" data-ai-hint={image.imageHint} />}
                                <div className="truncate pr-2 flex-grow">
                                  <p className="text-xs font-bold truncate ">{item.title}</p>
                                  <p className="text-xs text-muted-foreground truncate">{item.artist}</p>
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
                                <h2 className="font-bold text-xl mb-3 text-gray-800">Your Favorite Radios</h2>
                                <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-4 px-4">
                                    {radioStations.map(item => {
                                        const image = PlaceHolderImages.find(img => img.id === item.id);
                                        return(
                                            <Link href={`/listen/shower-power`} key={item.id} className="w-40 flex-shrink-0 space-y-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                <div className="w-full h-auto rounded-lg shadow-md aspect-square overflow-hidden">
                                                {image && <Image src={image.imageUrl} alt={item.title} width={160} height={160} className="w-full h-full object-cover" data-ai-hint={image.imageHint}/>}
                                                </div>
                                                <p className="text-sm font-semibold truncate text-center">{item.title}</p>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                            
                            <div>
                                <h2 className="font-bold text-xl mb-3 text-gray-800">Trending Now</h2>
                                <div className="flex space-x-4 overflow-x-auto no-scrollbar -mx-4 px-4">
                                    {trendingPlaylists.map(item => {
                                        const image = PlaceHolderImages.find(img => img.id === item.id);
                                        return(
                                            <Link href={`/listen/${item.playlistId}`} key={item.id} className="w-32 flex-shrink-0 space-y-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
                                                <div className="w-full h-auto rounded-lg shadow-md aspect-square overflow-hidden">
                                                {image && <Image src={image.imageUrl} alt={item.title} width={128} height={128} className="w-full h-full object-cover" data-ai-hint={image.imageHint}/>}
                                                </div>
                                                <p className="text-sm font-semibold truncate">{item.title}</p>
                                                <p className="text-xs text-gray-500 truncate">Now Playing: {item.playing}</p>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <h2 className="font-bold text-xl mb-3 text-gray-800">Discover More Tracks</h2>
                                <div className="space-y-2">
                                    {moreSongs.map(item => {
                                        const image = PlaceHolderImages.find(img => img.id === item.id);
                                        return(
                                            <button key={item.id} className="w-full flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100/50 transition-transform duration-200 hover:scale-105 cursor-pointer group">
                                                <div className="w-16 h-16 rounded-lg shadow-md aspect-square overflow-hidden flex-shrink-0">
                                                    {image && <Image src={image.imageUrl} alt={item.title} width={64} height={64} className="w-full h-full object-cover" data-ai-hint={image.imageHint}/>}
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-bold truncate">{item.title}</p>
                                                    <p className="text-sm text-gray-600 truncate">{item.artist}</p>
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
            <ListenSearchOverlay show={showSearch} onClose={() => setShowSearch(false)} />
            <NotificationPanel show={showNotifications} onClose={() => setShowNotifications(false)} />
        </>
    );
}

    