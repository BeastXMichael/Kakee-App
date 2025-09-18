import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CrownIcon, ProfileFrame } from '@/components/icons';

export function ProfileAvatar() {
  const avatarImage = PlaceHolderImages.find(img => img.id === 'user-avatar');

  return (
    <div className="relative w-full h-full">
      <div className="relative w-full h-full p-1 rounded-full">
        {avatarImage && (
          <Image
            src={avatarImage.imageUrl}
            alt="User Avatar"
            width={112}
            height={112}
            className="w-full h-full rounded-full border-2 border-white shadow-lg"
            data-ai-hint={avatarImage.imageHint}
          />
        )}
        <ProfileFrame className="absolute inset-0 w-full h-full animate-spin" />
        <div className="absolute -bottom-1 -right-0 w-5 h-5 bg-primary rounded-full border border-white flex items-center justify-center text-white font-bold text-sm shadow-md">
          <CrownIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
