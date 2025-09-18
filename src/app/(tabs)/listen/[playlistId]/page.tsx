
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { KoinIcon, SoundWaveIcon } from '@/components/icons';

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
    },
    'lofi-beats-radio': {
        title: 'Lofi Beats Radio',
        description: '24/7 chilled beats to relax, study, or sleep.',
        image: 'radio-1',
        songs: [
            { id: 'song-5', title: 'Midnight Stroll', artist: 'Lo-fi Ghost', votes: 54000 },
            { id: 'song-6', title: 'Misty Window', artist: 'Study Cat', votes: 51000 },
            { id: 'song-7', title: 'Dreaming of You', artist: 'Chillhop Cow', votes: 48000 },
        ],
        communityPicks: []
    },
    'espresso-song': {
        title: 'Espresso',
        description: 'By Sabrina Carpenter',
        image: 'made-for-you-1',
        songs: [
            { id: 'song-espresso', title: 'Espresso', artist: 'Sabrina Carpenter', votes: 150000 },
            { id: 'song-please', title: 'Please Please Please', artist: 'Sabrina Carpenter', votes: 120000 },
            { id: 'song-taste', title: 'Taste', artist: 'Sabrina Carpenter', votes: 110000 },
        ],
        communityPicks: []
    },
    'crank-up-brain-power': {
        title: 'Crank Up Brain Power',
        description: 'Music to help you focus and study.',
        image: 'trending-1',
        songs: [
            { id: 'song-brain-1', title: 'Genesis', artist: 'Grimes', votes: 88000 },
            { id: 'song-brain-2', title: 'Oblivion', artist: 'Grimes', votes: 85000 },
        ],
        communityPicks: []
    },
    'pov-you-vibe': {
        title: 'POV: You\'re Vibing',
        description: 'Just good vibes.',
        image: 'trending-2',
        songs: [
            { id: 'song-vibe-1', title: 'Good Days', artist: 'SZA', votes: 91000 },
            { id: 'song-vibe-2', title: 'Golden', artist: 'Harry Styles', votes: 90000 },
        ],
        communityPicks: []
    },
    'gym-rat-fuel': {
        title: 'Gym Rat Fuel',
        description: 'Get pumped.',
        image: 'trending-3',
        songs: [
            { id: 'song-gym-1', title: 'HUMBLE.', artist: 'Kendrick Lamar', votes: 99000 },
            { id: 'song-gym-2', title: 'Till I Collapse', artist: 'Eminem', votes: 97000 },
        ],
        communityPicks: []
    },
     'running-flash': {
        title: 'Running Flash',
        description: 'High-energy tracks for your run.',
        image: 'radio-3',
        songs: [
            { id: 'song-run-1', title: 'Dog Days Are Over', artist: 'Florence + The Machine', votes: 93000 },
            { id: 'song-run-2', title: 'Shake It Out', artist: 'Florence + The Machine', votes: 92500 },
        ],
        communityPicks: []
    },
    'sad-girl-hours': {
        title: 'Sad Girl Hours',
        description: 'For when you\'re in your feels.',
        image: 'made-for-you-1',
        songs: [
            { id: 'song-sad-1', title: 'drivers license', artist: 'Olivia Rodrigo', votes: 110000 },
            { id: 'song-sad-2', title: 'deja vu', artist: 'Olivia Rodrigo', votes: 105000 },
        ],
        communityPicks: []
    }
};

const communityPlaylists = [
    { id: 'shower-power', title: 'Crying in the Shower' },
    { id: 'morning-energy', title: 'Morning Energy' },
    { id: 'study-flow', title: 'Study Flow' },
    { id: 'hype-train', title: 'Hype Train' },
    { id: 'gym-rat-fuel', title: 'Gym Rat Fuel' },
];


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
    const [songs, setSongs] = useState<Song[]>(details.songs.sort((a, b) => b.votes - a.votes));
    const [likedSongs, setLikedSongs] = useState<Record<string, boolean>>({});
    const [showSuggestionDialog, setShowSuggestionDialog] = useState(false);
    const [suggestionPlaylist, setSuggestionPlaylist] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [nowPlayingIndex, setNowPlayingIndex] = useState<number | null>(0);
    
    const togglePlay = (index?: number) => {
        const newIndex = index !== undefined ? index : (nowPlayingIndex === null ? 0 : nowPlayingIndex);
        if (isPlaying && newIndex === nowPlayingIndex) {
            setIsPlaying(false);
        } else {
            setNowPlayingIndex(newIndex);
            setIsPlaying(true);
        }
    };


    const handleLike = (songId: string) => {
        const isLiked = likedSongs[songId];
        setLikedSongs(prev => ({ ...prev, [songId]: !isLiked }));
        toast({
            title: isLiked ? "Removed from Liked Songs" : "Added to Liked Songs",
            description: `"${songs.find(s => s.id === songId)?.title}" has been ${isLiked ? 'removed from' : 'added to'} your Liked Songs playlist.`,
        });
    };
    
    const handleSuggestSong = async () => {
        if (!suggestionPlaylist) {
            toast({
                title: "No Playlist Selected",
                description: "Please select a playlist to suggest a song to.",
                variant: 'destructive',
            });
            return;
        }

        const currentSong = songs[0]; // Suggesting the top song for simplicity
        
        try {
            await voteForSong({ songId: currentSong.id, playlistId: suggestionPlaylist, userId: 'user-general' });
            toast({
                title: "Suggestion Sent!",
                description: `You suggested "${currentSong.title}" for the "${communityPlaylists.find(p => p.id === suggestionPlaylist)?.title}" playlist and earned 100 Koins!`,
            });
        } catch (error) {
             toast({
                title: "Suggestion Failed",
                description: "Could not send your suggestion. Please try again.",
                variant: 'destructive',
            });
        } finally {
            setShowSuggestionDialog(false);
            setSuggestionPlaylist(null);
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
                        <Button onClick={() => togglePlay()} variant="ghost" size="icon" className="w-16 h-16 rounded-full bg-red-500 text-white hover:bg-red-600">
                            {isPlaying ? (
                                <div className="h-8 w-8 playing">
                                    <SoundWaveIcon />
                                </div>
                            ) : (
                                <Play className="w-8 h-8" fill="currentColor" />
                            )}
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
                    <h2 className="font-bold text-xl mb-3">More For You</h2>
                    <div className="space-y-3">
                        {songs.map((song, index) => (
                            <button key={song.id} className="w-full flex items-center text-left" onClick={() => togglePlay(index)}>
                                <div className="w-6 text-lg font-bold text-gray-400 flex items-center justify-center">
                                    {isPlaying && nowPlayingIndex === index ? (
                                        <div className="h-4 w-4 text-red-500 playing">
                                            <SoundWaveIcon />
                                        </div>
                                    ) : (
                                        <span>{index + 1}</span>
                                    )}
                                </div>
                                <div className="flex-grow ml-3">
                                    <p className={cn("font-bold", isPlaying && nowPlayingIndex === index && "text-red-500")}>{song.title}</p>
                                    <p className="text-xs text-gray-400">{song.artist} &bull; {Math.round(song.votes/1000)}k votes</p>
                                </div>
                                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleLike(song.id); }} className={cn("text-gray-500", likedSongs[song.id] && "text-red-500")}>
                                    <Heart className="w-6 h-6" fill={likedSongs[song.id] ? "currentColor" : "none"}/>
                                </Button>
                            </button>
                        ))}
                    </div>
                </div>

                {details.communityPicks.length > 0 && <div className="mt-8 pb-4">
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
                </div>}
            </main>

            <footer className="p-4 flex-shrink-0 z-10 sticky bottom-0 bg-[#0D1B2A]/80 backdrop-blur-sm">
                <Dialog open={showSuggestionDialog} onOpenChange={setShowSuggestionDialog}>
                    <DialogTrigger asChild>
                        <Button size="lg" className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full font-bold">
                            <Plus className="w-5 h-5 mr-2"/>
                            Suggest a Song & Earn 100 Koins
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-gray-900 border-primary/50 text-white">
                        <DialogHeader>
                            <DialogTitle className="text-primary">Suggest a Song</DialogTitle>
                            <DialogDescription className="text-gray-400">
                                Vote to add <span className="font-bold text-white">{songs[0]?.title || 'this song'}</span> to a community playlist.
                            </DialogDescription>
                        </DialogHeader>
                        <RadioGroup onValueChange={setSuggestionPlaylist} className="my-4 space-y-2">
                            {communityPlaylists.map(playlist => (
                                <div key={playlist.id} className="flex items-center space-x-3 bg-white/5 p-3 rounded-md">
                                    <RadioGroupItem value={playlist.id} id={playlist.id} />
                                    <Label htmlFor={playlist.id} className="text-white font-medium">{playlist.title}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                        <DialogFooter>
                            <Button onClick={handleSuggestSong} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Suggest & Earn Koins</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </footer>
        </div>
    );
}

    