import Image from 'next/image';
import { BellIcon, SmileIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { ProfileAvatar } from '@/components/home/profile-avatar';
import { KoinIcon } from '@/components/icons';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function RecentlyForYou() {
    const recommendations = { recommendedContent: ['Lofi Beats Radio', 'From HDB to CEO', 'Chill Mix', 'Indie Wave'] };

    const contentMap: { [key: string]: typeof PlaceHolderImages[0] | undefined } = {
        'Lofi Beats Radio': PlaceHolderImages.find(img => img.id === 'recently-1'),
        'From HDB to CEO': PlaceHolderImages.find(img => img.id === 'recently-2'),
        'Chill Mix': PlaceHolderImages.find(img => img.id === 'made-for-you-1'),
        'Indie Wave': PlaceHolderImages.find(img => img.id === 'made-for-you-5'),
    };
    
    const recommendedContent = recommendations.recommendedContent.slice(0, 4);

    return (
        <div className="flex-shrink-0">
            <h2 className="font-bold text-lg mb-2 text-primary-foreground/90">Recently for You</h2>
            <div className="grid grid-cols-2 gap-3">
                {recommendedContent.map((title, index) => {
                    const content = contentMap[title] || Object.values(contentMap)[index % Object.keys(contentMap).length];
                    return (
                        <div key={index} className="space-y-1.5 transition-transform duration-200 hover:scale-105 cursor-pointer">
                            {content && (
                                <Image
                                    src={content.imageUrl}
                                    alt={content.description}
                                    width={400}
                                    height={231}
                                    className="w-full h-auto rounded-lg shadow-md aspect-[13/8] object-cover"
                                    data-ai-hint={content.imageHint}
                                />
                            )}
                            <p className="text-xs font-semibold text-primary-foreground/80">{title}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


function LatestDrops() {
    const drops = [
        PlaceHolderImages.find(img => img.id === 'drops-1'),
        PlaceHolderImages.find(img => img.id === 'drops-2'),
        PlaceHolderImages.find(img => img.id === 'drops-3'),
        PlaceHolderImages.find(img => img.id === 'new-drama-1'),
        PlaceHolderImages.find(img => img.id === 'new-drama-2'),
        PlaceHolderImages.find(img => img.id === 'new-drama-3'),
    ].filter(Boolean);
    const titles = ["Ah Beng's Guide", "New Lobang!", "New Game!", "Secret Kopi Stall", "Ah Beng's Galaxy", "Last Mama Shop"];

    return (
        <div className="flex-shrink-0">
            <h2 className="font-bold text-lg mb-2 text-primary-foreground/90">Latest Drops</h2>
            <div className="grid grid-cols-3 gap-3">
                {drops.map((drop, index) => (
                    <div key={drop!.id} className="space-y-1.5 transition-transform duration-200 hover:scale-105 cursor-pointer">
                        <Image
                            src={drop!.imageUrl}
                            alt={drop!.description}
                            width={200}
                            height={300}
                            className="w-full h-auto rounded-lg shadow-md aspect-[2/3] object-cover"
                            data-ai-hint={drop!.imageHint}
                        />
                        <p className="text-xs font-semibold text-primary-foreground/80">{titles[index]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function HomePage() {
  return (
    <div className="flex flex-col h-full bg-background relative">
      <div className="absolute inset-0 z-0 radiant-background-home animate-radiant-glow"></div>
      
      <header className="p-4 flex justify-between items-center z-10 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/80 rounded-full flex items-center justify-center">
            <SmileIcon className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-md font-bold text-primary-foreground">Welcome, General!</h1>
            <p className="text-xs text-muted-foreground">Our #1 Rewards Buddy</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground transition-transform duration-200 hover:scale-105 cursor-pointer">
            <BellIcon className="w-6 h-6" />
          </Button>
        </div>
      </header>

      <main className="px-4 pt-0 flex-grow bg-transparent z-10 flex flex-col overflow-y-auto no-scrollbar">
        <div className="text-center my-2 flex-shrink-0">
          <ProfileAvatar />
        </div>
        
        <div className="bg-white/60 p-3 rounded-full shadow-sm border border-white/30 backdrop-blur-sm flex items-center space-x-2 mb-4 flex-shrink-0 transition-transform duration-200 hover:scale-105 cursor-pointer">
            <KoinIcon />
            <span className="font-bold text-primary-foreground">1,250 Koins</span>
            <div className="flex-grow"></div>
            <Button size="sm" className="text-xs font-bold bg-gray-800 text-white px-3 py-1 rounded-full h-auto hover:bg-black transition">Redeem</Button>
        </div>

        <div className="flex-grow flex flex-col space-y-6 pb-4">
          <RecentlyForYou />
          <LatestDrops />
          <RecentlyForYou />
        </div>
      </main>
    </div>
  );
}
