// src/app/(tabs)/listen/[playlistId]/page.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, MoreHorizontal, Heart, Sun, Brain, Zap, ChevronLeft, Plus } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { voteForSong } from '@/ai/flows/vote-for-song';
import { cn } from '@/lib/utils';

const playlistDetails = {
    'shower-power': {
        title: 'Crying in the Shower',
        description: 'The community\'s top picks. Updated daily.',
        image: 'playlist-crying-shower',
        songs: [
            { id: 'song-1', title: 'Someone Like You', artist: 'Adele', votes: 102000 },
            { id: 'song-2', title: 'Liability', artist: 'Lorde', votes: 98000 },
            { id: 'song-3', title: 'Happier Than Ever', artist: 'Billie Eilish', votes: 95000 },
            { id: 'song-4', title: 'All Too Well (10 Minute Version)', artist: 'Taylor Swift', votes: 92000 },
        ],
        communityPicks: [
            { id: 'morning-energy', title: 'Morning Energy', icon: Sun, color: 'yellow' },
            { id: 'study-flow', title: 'Study Flow', icon: Brain, color: 'blue' },
            { id: 'hype-train', title: 'Hype Train', icon: Zap, color: 'red' },
        ]
    }
};

type Song = {
    id: string;
    title: string;
    artist: string;
    votes: number;
};

export default function PlaylistPage({ params }: { params: { playlistId: string } }) {
    const { playlistId } = params;
    const details = playlistDetails[playlistId as keyof typeof playlistDetails] || playlistDetails['shower-power'];
    const { toast } = useToast();
    const [songs, setSongs] = useState<Song[]>(details.songs);
    const [votedSongs, setVotedSongs] = useState<Record<string, boolean>>({});

    const handleVote = async (songId: string) => {
        if (votedSongs[songId]) return;

        setVotedSongs(prev => ({ ...prev, [songId]: true }));
        try {
            const result = await voteForSong({ songId, playlistId, userId: 'user-general' });
            if (result.success) {
                setSongs(currentSongs =>
                    currentSongs.map(song =>
                        song.id === songId ? { ...song, votes: result.newVoteCount } : song
                    ).sort((a, b) => b.votes - a.votes)
                );
                toast({
                    title: "Vote Cast!",
                    description: "You've successfully voted for this song.",
                });
            }
        } catch (error) {
            console.error("Failed to vote:", error);
            toast({
                title: "Vote Failed",
                description: "Could not cast your vote. Please try again.",
                variant: 'destructive',
            });
            setVotedSongs(prev => ({ ...prev, [songId]: false }));
        }
    };
    
    const playlistImage = PlaceHolderImages.find(p => p.id === details.image);

    return (
        <div className="flex flex-col h-full bg-[#0D1B2A]">
            <header className="p-4 flex-shrink-0 z-10">
                <Link href="/listen">
                    <ChevronLeft className="w-8 h-8 text-gray-300" />
                </Link>
            </header>

            <main className="flex-grow overflow-y-auto no-scrollbar px-4 text-white">
                <div className="flex flex-col items-center text-center">
                    {playlistImage && (
                         <Image
                            src={playlistImage.imageUrl}
                            alt={details.title}
                            width={160}
                            height={160}
                            className="w-40 h-40 rounded-lg shadow-2xl shadow-black/50"
                            data-ai-hint={playlistImage.imageHint}
                        />
                    )}
                    <h1 className="text-3xl font-extrabold mt-4">{details.title}</h1>
                    <p className="text-sm text-gray-400 mt-1">{details.description}</p>
                    <div className="flex items-center space-x-6 mt-4">
                        <Button variant="ghost" size="icon" className="w-16 h-16 rounded-full bg-red-500 text-white hover:bg-red-600">
                            <Play className="w-8 h-8" fill="currentColor" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                           <Heart className="w-7 h-7" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                           <MoreHorizontal className="w-7 h-7" />
                        </Button>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="font-bold text-xl mb-3">Top Songs</h2>
                    <div className="space-y-3">
                        {songs.map((song, index) => (
                            <div key={song.id} className="flex items-center">
                                <span className="text-lg font-bold w-6 text-gray-400">{index + 1}</span>
                                <div className="flex-grow ml-3">
                                    <p className="font-bold">{song.title}</p>
                                    <p className="text-xs text-gray-400">{song.artist} &bull; {Math.round(song.votes/1000)}k votes</p>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => handleVote(song.id)} className={cn("text-gray-500", votedSongs[song.id] && "text-red-500")}>
                                    <Heart className="w-6 h-6" fill={votedSongs[song.id] ? "currentColor" : "none"}/>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 pb-4">
                     <h2 className="font-bold text-xl mb-3">More Community Picks</h2>
                     <div className="grid grid-cols-3 gap-3">
                        {details.communityPicks.map(pick => {
                            const pickImage = PlaceHolderImages.find(p => p.id === pick.id);
                            return (
                                <Link href="#" key={pick.id}>
                                    <div className="space-y-1.5 cursor-pointer">
                                        {pickImage && (
                                            <Image
                                                src={pickImage.imageUrl}
                                                alt={pick.title}
                                                width={100}
                                                height={100}
                                                className="w-full h-auto rounded-lg shadow-md aspect-square object-cover"
                                                data-ai-hint={pickImage.imageHint}
                                            />
                                        )}
                                        <p className="text-xs font-semibold text-center">{pick.title}</p>
                                    </div>
                                </Link>
                            )
                        })}
                     </div>
                </div>
            </main>

            <footer className="p-4 flex-shrink-0 z-10 sticky bottom-0 bg-[#0D1B2A]/80 backdrop-blur-sm">
                <Button size="lg" className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full font-bold">
                    <Plus className="w-5 h-5 mr-2"/>
                    Suggest a Song & Earn 100 XP
                </Button>
            </footer>
        </div>
    );
}
