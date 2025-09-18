
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BellIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { ProfileAvatar } from '@/components/home/profile-avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useState, useEffect } from 'react';
import NotificationPanel from '@/components/notifications/notification-panel';
import WelcomeGiftDialog from '@/components/home/welcome-gift-dialog';
import { Shield, Sparkles, Trophy } from 'lucide-react';
import QuestsSheet from '@/components/home/quests-sheet';
import RankSheet from '@/components/home/rank-sheet';
import BenefitsSheet from '@/components/home/benefits-sheet';

function RecentlyForYou() {
    const recommendations = { recommendedContent: ['Lofi Beats Radio', 'From HDB to CEO', 'Chill Mix', 'Indie Wave'] };

    const contentMap: { [key: string]: { data: typeof PlaceHolderImages[0] | undefined, href: string } } = {
        'Lofi Beats Radio': { data: PlaceHolderImages.find(img => img.id === 'radio-2'), href: '/listen' },
        'From HDB to CEO': { data: PlaceHolderImages.find(img => img.id === 'recently-watched'), href: '/watch' },
        'Chill Mix': { data: PlaceHolderImages.find(img => img.id === 'radio-1'), href: '/listen' },
        'Indie Wave': { data: PlaceHolderImages.find(img => img.id === 'made-for-you-5'), href: '/listen' },
    };
    
    const recommendedContent = recommendations.recommendedContent.slice(0, 4);

    return (
        <div className="flex-shrink-0">
            <h2 className="font-bold text-lg mb-2 text-primary-foreground/90">Picked Just for You</h2>
            <div className="grid grid-cols-2 gap-3">
                {recommendedContent.map((title, index) => {
                    const content = contentMap[title] || Object.values(contentMap)[index % Object.keys(contentMap).length];
                    if (!content.data) return null;
                    return (
                        <Link href={content.href} key={index}>
                            <div className="space-y-1.5 transition-transform duration-200 hover:scale-105 cursor-pointer">
                                <Image
                                    src={content.data.imageUrl}
                                    alt={content.data.description}
                                    width={400}
                                    height={231}
                                    className="w-full h-auto rounded-lg shadow-md aspect-[13/8] object-cover"
                                    data-ai-hint={content.data.imageHint}
                                />
                                <p className="text-xs font-semibold text-primary-foreground/80">{title}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

function LatestListenDrops() {
    const drops = [
        { drop: PlaceHolderImages.find(img => img.id === 'made-for-you-1'), title: 'Shower Jams' },
        { drop: PlaceHolderImages.find(img => img.id === 'made-for-you-2'), title: 'Workout Beats' },
        { drop: PlaceHolderImages.find(img => img.id === 'made-for-you-3'), title: 'Commute Mix' },
    ].filter(item => item.drop);

    return (
        <div className="flex-shrink-0">
            <h2 className="font-bold text-lg mb-2 text-primary-foreground/90">New Music to Vibe To</h2>
            <div className="grid grid-cols-3 gap-3">
                {drops.map((item) => (
                    <Link href="/listen" key={item.drop!.id}>
                        <div className="space-y-1.5 transition-transform duration-200 hover:scale-105 cursor-pointer">
                            <Image
                                src={item.drop!.imageUrl}
                                alt={item.drop!.description}
                                width={200}
                                height={200}
                                className="w-full h-auto rounded-lg shadow-md aspect-square object-cover"
                                data-ai-hint={item.drop!.imageHint}
                            />
                            <p className="text-xs font-semibold text-primary-foreground/80">{item.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

function LatestWatchDrops() {
    const drops = [
        { drop: PlaceHolderImages.find(img => img.id === 'new-drama-1'), title: "Secret Kopi Stall" },
        { drop: PlaceHolderImages.find(img => img.id === 'new-drama-2'), title: "Ah Beng's Galaxy" },
        { drop: PlaceHolderImages.find(img => img.id === 'new-drama-3'), title: "Last Mama Shop" },
    ].filter(item => item.drop);

    return (
        <div className="flex-shrink-0">
            <h2 className="font-bold text-lg mb-2 text-primary-foreground/90">Fresh Dramas on Screen</h2>
            <div className="grid grid-cols-3 gap-3">
                {drops.map((item) => (
                    <Link href="/watch" key={item.drop!.id}>
                        <div className="space-y-1.5 transition-transform duration-200 hover:scale-105 cursor-pointer">
                            <Image
                                src={item.drop!.imageUrl}
                                alt={item.drop!.description}
                                width={200}
                                height={300}
                                className="w-full h-auto rounded-lg shadow-md aspect-[2/3] object-cover"
                                data-ai-hint={item.drop!.imageHint}
                            />
                            <p className="text-xs font-semibold text-primary-foreground/80">{item.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

function LatestRewardsDrops() {
    const drops = [
        { drop: PlaceHolderImages.find(img => img.id === 'drops-1'), title: '1-for-1 Movie Tix' },
        { drop: PlaceHolderImages.find(img => img.id === 'drops-2'), title: 'New Vouchers!' },
        { drop: PlaceHolderImages.find(img => img.id === 'drops-3'), title: 'Spin to Win!' },
    ].filter(item => item.drop);

    return (
        <div className="flex-shrink-0">
            <h2 className="font-bold text-lg mb-2 text-primary-foreground/90">Your Newest Perks</h2>
            <div className="grid grid-cols-3 gap-3">
                {drops.map((item) => (
                    <Link href="/rewards" key={item.drop!.id}>
                        <div className="space-y-1.5 transition-transform duration-200 hover:scale-105 cursor-pointer">
                            <Image
                                src={item.drop!.imageUrl}
                                alt={item.drop!.description}
                                width={200}
                                height={200}
                                className="w-full h-auto rounded-lg shadow-md aspect-square object-cover"
                                data-ai-hint={item.drop!.imageHint}
                            />
                            <p className="text-xs font-semibold text-primary-foreground/80">{item.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default function HomePage() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWelcomeGift, setShowWelcomeGift] = useState(false);
  const [showQuests, setShowQuests] = useState(false);
  const [showRank, setShowRank] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  
  useEffect(() => {
    // Use a timeout to avoid layout shift issues and make the popup feel less abrupt
    const timer = setTimeout(() => {
      setShowWelcomeGift(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);


  return (
    <>
    <WelcomeGiftDialog open={showWelcomeGift} onOpenChange={setShowWelcomeGift} />
    <div className="flex flex-col h-full bg-background relative overflow-y-auto no-scrollbar">
      <div className="absolute inset-0 z-0 radiant-background-home animate-radiant-glow"></div>
      
      <div className="p-4 flex justify-between items-center z-10 flex-shrink-0 sticky top-0 bg-background/80 backdrop-blur-sm">
        <Link href="/account" className="flex items-center space-x-3">
          <div className="w-10 h-10">
            <ProfileAvatar />
          </div>
          <div>
            <h1 className="text-md font-bold text-primary-foreground">Welcome, General!</h1>
            <p className="text-xs text-muted-foreground">Our #1 Rewards Buddy</p>
          </div>
        </Link>
        <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setShowNotifications(true)} className="text-muted-foreground transition-transform duration-200 hover:scale-105 cursor-pointer relative">
                <BellIcon className="w-6 h-6" />
                <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-background"/>
            </Button>
        </div>
      </div>

      <main className="px-4 pt-0 flex-grow bg-transparent z-10 flex flex-col">
        <Link href="/account" className="text-center my-2 flex-shrink-0">
          <div className="w-28 h-28 mx-auto">
            <ProfileAvatar />
          </div>
        </Link>
        
        <div className="grid grid-cols-3 gap-2 text-center mb-4 flex-shrink-0">
            <button onClick={() => setShowQuests(true)} className="bg-white/60 p-2 rounded-xl shadow-sm border border-white/30 backdrop-blur-sm flex flex-col items-center justify-center space-y-1 transition-transform duration-200 hover:scale-105 cursor-pointer">
                <Trophy className="w-6 h-6 text-amber-500"/>
                <span className="text-xs font-bold text-primary-foreground/90">Quests</span>
            </button>
             <button onClick={() => setShowRank(true)} className="bg-white/60 p-2 rounded-xl shadow-sm border border-white/30 backdrop-blur-sm flex flex-col items-center justify-center space-y-1 transition-transform duration-200 hover:scale-105 cursor-pointer">
                <Shield className="w-6 h-6 text-rose-500"/>
                <span className="text-xs font-bold text-primary-foreground/90">Rank</span>
            </button>
             <button onClick={() => setShowBenefits(true)} className="bg-white/60 p-2 rounded-xl shadow-sm border border-white/30 backdrop-blur-sm flex flex-col items-center justify-center space-y-1 transition-transform duration-200 hover:scale-105 cursor-pointer">
                <Sparkles className="w-6 h-6 text-violet-500"/>
                <span className="text-xs font-bold text-primary-foreground/90">Benefits</span>
            </button>
        </div>

        <div className="flex-grow flex flex-col space-y-6 pb-4">
          <RecentlyForYou />
          <LatestListenDrops />
          <LatestWatchDrops />
          <LatestRewardsDrops />
        </div>
      </main>
    </div>
    <NotificationPanel show={showNotifications} onClose={() => setShowNotifications(false)} />
    <QuestsSheet open={showQuests} onOpenChange={setShowQuests} />
    <RankSheet open={showRank} onOpenChange={setShowRank} />
    <BenefitsSheet open={showBenefits} onOpenChange={setShowBenefits} />
    </>
  );
}
