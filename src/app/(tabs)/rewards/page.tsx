
'use client';

import { useState } from 'react';
import { Coffee, Ticket, Film, Pizza, Gamepad2, Headphones } from 'lucide-react';
import DailySpinCard from '@/components/rewards/daily-spin-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StreamsRouletteIcon, LyricLegendIcon, KakeeBeatsIcon, GuessTheSongIcon, BellIcon, MusicNoteIcon, SparklePinIcon } from '@/components/icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ProfileAvatar } from '@/components/home/profile-avatar';
import NotificationPanel from '@/components/notifications/notification-panel';

const lobangs = [
  { icon: Coffee, text: "1-for-1 Coffee", gradient: "from-green-400 to-teal-500" },
  { icon: Ticket, text: "10% Off Tickets", gradient: "from-orange-400 to-red-500" },
  { icon: Film, text: "Movie Vouchers", gradient: "from-blue-400 to-indigo-500" },
  { icon: Pizza, text: "Pizza Deals", gradient: "from-yellow-400 to-amber-500" },
];

const games = [
  { id: 'streams-roulette', icon: StreamsRouletteIcon, text: "Streams Roulette", gradient: "from-purple-500 to-indigo-500" },
  { id: 'lyric-legend', icon: LyricLegendIcon, text: "Lyric Legend", gradient: "from-cyan-500 to-teal-500" },
  { id: 'kakee-beats', icon: KakeeBeatsIcon, text: "Kakee Beats", gradient: "from-pink-500 to-rose-500" },
  { id: 'guess-the-song', icon: GuessTheSongIcon, text: "Guess the Song", gradient: "from-sky-500 to-blue-500" },
  { id: 'arcade-master', icon: Gamepad2, text: "Arcade Master", gradient: "from-violet-500 to-fuchsia-500" },
  { id: 'audio-ace', icon: Headphones, text: "Audio Ace", gradient: "from-lime-500 to-emerald-500" },
];

export default function RewardsPage() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
    <div className="flex flex-col h-full bg-background relative">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-amber-200 via-yellow-100 to-background z-0"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <header className="p-4 flex justify-between items-center z-10 flex-shrink-0 sticky top-0 bg-transparent backdrop-blur-sm">
            <Link href="/account" className="flex items-center space-x-3">
                <div className="w-10 h-10">
                    <ProfileAvatar />
                </div>
                <div>
                    <h1 className="text-md font-bold text-primary-foreground">Get Your Coins!</h1>
                    <p className="text-xs text-muted-foreground">Your daily lobangs are here</p>
                </div>
            </Link>
            <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={() => setShowNotifications(true)} className="text-muted-foreground transition-transform duration-200 hover:scale-105 cursor-pointer relative">
                    <BellIcon className="w-6 h-6" />
                    <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-background"/>
                </Button>
            </div>
        </header>

        <main className="flex-grow overflow-y-auto no-scrollbar px-4">
          <DailySpinCard />
          
          <div className="mt-3 flex-shrink-0">
            <div className="bg-white/60 p-3 rounded-2xl shadow-sm border border-white/50 backdrop-blur-sm flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground">Your Balance</p>
                <p className="text-xl font-bold text-primary-foreground">1,250 Koins</p>
              </div>
              <Button className="bg-gray-800 text-white font-bold py-1.5 px-3 rounded-lg text-xs h-auto hover:bg-black">Redeem</Button>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="font-bold text-lg mb-2 text-gray-800">Exclusive Lobangs</h2>
            <div className="grid grid-cols-2 gap-3">
              {lobangs.map((lobang, index) => (
                <Card key={index} className="shadow-md aspect-[4/3] overflow-hidden border-0 transition-transform duration-200 hover:scale-105 cursor-pointer">
                  <CardContent className={`bg-gradient-to-br ${lobang.gradient} flex flex-col items-center justify-center p-2 text-white text-center h-full`}>
                    <lobang.icon className="w-8 h-8" />
                    <p className="font-bold text-xs mt-1 text-shadow">{lobang.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-4 pb-4 relative">
            <div className='absolute inset-0 -z-10'>
              <MusicNoteIcon className="w-8 h-8 absolute top-0 -left-2 text-pink-300 opacity-60 rotate-[-15deg] animate-pulse" />
              <SparklePinIcon className="w-8 h-8 absolute top-12 -right-2 text-cyan-300 opacity-70 animate-bounce" />
              <MusicNoteIcon className="w-10 h-10 absolute bottom-1/2 -right-3 text-purple-300 opacity-50 rotate-[20deg] animate-pulse delay-500" />
              <SparklePinIcon className="w-6 h-6 absolute bottom-1/4 -left-3 text-amber-300 opacity-70 animate-pulse-slow" />
              <MusicNoteIcon className="w-12 h-12 absolute top-1/3 right-1/4 text-green-300 opacity-40 rotate-[10deg] animate-pulse delay-300" />
            </div>

            <h2 className="font-bold text-lg mb-2 text-gray-800">Mini-Games Arcade</h2>
            <div className="grid grid-cols-2 gap-3">
              {games.map((game) => (
                <Link href={`/rewards/${game.id}`} key={game.id}>
                  <Card className={cn("shadow-md aspect-video overflow-hidden border-0 transition-transform duration-300 group cursor-pointer relative")}>
                    <CardContent className={cn("bg-gradient-to-br flex flex-col items-center justify-center p-2 text-white text-center h-full transition-all duration-300 group-hover:brightness-110", game.gradient)}>
                      <game.icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                      <p className="font-bold text-[10px] mt-1 text-shadow">{game.text}</p>
                    </CardContent>
                    <div className="absolute inset-0 w-full h-full shine-effect opacity-0 group-hover:opacity-100"></div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
    <NotificationPanel show={showNotifications} onClose={() => setShowNotifications(false)} />
    </>
  );
}
