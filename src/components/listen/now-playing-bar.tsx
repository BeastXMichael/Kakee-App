import Image from 'next/image';
import { Play } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function NowPlayingBar() {
  const albumArt = PlaceHolderImages.find(img => img.id === 'now-playing-art');

  return (
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
        <button className="text-gray-700">
          <Play className="h-6 w-6" fill="currentColor" />
        </button>
      </div>
    </div>
  );
}
