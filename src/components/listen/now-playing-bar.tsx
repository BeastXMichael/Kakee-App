
'use client';

import Image from 'next/image';
import { Play, MoreHorizontal, Heart, Flame } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { SoundWaveIcon } from '../icons';

export default function NowPlayingBar() {
  const albumArt = PlaceHolderImages.find(img => img.id === 'now-playing-art');
  const [showVoteDialog, setShowVoteDialog] = useState(false);
  const [voted, setVoted] = useState<'heart' | 'fire' | null>(null);
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVote = (vote: 'heart' | 'fire') => {
    setVoted(vote);
    setTimeout(() => {
        toast({
            title: `You voted with ${vote === 'heart' ? 'a heart' : 'fire'}!`,
            description: "Thanks for your feedback!",
        });
        setShowVoteDialog(false);
        setVoted(null);
    }, 1000);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div className="flex-shrink-0 z-20 px-2 pb-2 bg-white">
        <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-2 flex items-center space-x-3 border border-white/50">
          {albumArt && (
            <Image
              src={albumArt.imageUrl}
              alt="Album Art"
              width={40}
              height={40}
              className="w-10 h-10 rounded-md"
              data-ai-hint={albumArt.imageHint}
            />
          )}
          <div className="flex-grow overflow-hidden">
            <p className="font-bold text-sm text-gray-800 truncate">Blinding Lights</p>
            <p className="text-xs text-gray-500 truncate">The Weeknd</p>
          </div>
           <button onClick={togglePlay} className="text-gray-700 w-6 h-6">
            {isPlaying ? (
                <div className="playing h-full w-full">
                    <SoundWaveIcon />
                </div>
            ) : (
                <Play className="h-6 w-6" fill="currentColor" />
            )}
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                    <MoreHorizontal className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setShowVoteDialog(true)}>
                    Vote
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Dialog open={showVoteDialog} onOpenChange={setShowVoteDialog}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 border-primary/50 text-white">
          <DialogHeader>
            <DialogTitle className="text-center text-primary text-2xl font-bold">Cast Your Vote!</DialogTitle>
            <DialogDescription className="text-center text-gray-300">
              How does this song make you feel?
            </DialogDescription>
          </DialogHeader>
          <div className="py-8 flex justify-center items-center gap-8">
            <button 
              onClick={() => handleVote('heart')}
              className={cn(
                  "p-4 bg-white/10 rounded-full transition-all duration-300 ease-in-out transform hover:scale-125 hover:bg-pink-500/50 focus:outline-none focus:ring-4 focus:ring-pink-400",
                  voted === 'heart' && 'animate-vote-pop bg-pink-500/50'
              )}
            >
              <Heart className="w-16 h-16 text-pink-400 transition-colors duration-300" fill={voted === 'heart' ? 'currentColor' : 'none'}/>
            </button>
            <button 
              onClick={() => handleVote('fire')}
              className={cn(
                  "p-4 bg-white/10 rounded-full transition-all duration-300 ease-in-out transform hover:scale-125 hover:bg-orange-500/50 focus:outline-none focus:ring-4 focus:ring-orange-400",
                  voted === 'fire' && 'animate-vote-pop bg-orange-500/50'
              )}
            >
              <Flame className="w-16 h-16 text-orange-400 transition-colors duration-300" fill={voted === 'fire' ? 'currentColor' : 'none'}/>
            </button>
          </div>
          <DialogFooter>
             <p className="text-xs text-gray-500 w-full text-center">Your vote helps us curate better playlists!</p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

    