import { Coffee, Ticket } from 'lucide-react';
import DailySpinCard from '@/components/rewards/daily-spin-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StreamsRouletteIcon, LyricLegendIcon, KakeeBeatsIcon, GuessTheSongIcon } from '@/components/icons';

const lobangs = [
  { icon: Coffee, text: "1-for-1 Coffee", gradient: "from-green-400 to-teal-500" },
  { icon: Ticket, text: "10% Off Tickets", gradient: "from-orange-400 to-red-500" },
];

const games = [
  { icon: StreamsRouletteIcon, text: "Streams Roulette", gradient: "from-purple-500 to-indigo-500" },
  { icon: LyricLegendIcon, text: "Lyric Legend", gradient: "from-cyan-500 to-teal-500" },
  { icon: KakeeBeatsIcon, text: "Kakee Beats", gradient: "from-pink-500 to-rose-500" },
  { icon: GuessTheSongIcon, text: "Guess the Song", gradient: "from-sky-500 to-blue-500" },
];

export default function RewardsPage() {
  return (
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-amber-200 via-yellow-100 to-background z-0"></div>
      
      <div className="relative z-10 flex flex-col h-full p-4">
        <header className="flex-shrink-0">
          <h1 className="text-2xl font-extrabold text-gray-800">Rewards</h1>
        </header>

        <DailySpinCard />
        
        <div className="mt-3">
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
          <div className="grid grid-cols-2 gap-2">
            {lobangs.map((lobang, index) => (
              <Card key={index} className="shadow-md aspect-[4/3] overflow-hidden border-0">
                <CardContent className={`bg-gradient-to-br ${lobang.gradient} flex flex-col items-center justify-center p-2 text-white text-center h-full`}>
                  <lobang.icon className="w-8 h-8" />
                  <p className="font-bold text-xs mt-1 text-shadow">{lobang.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-4 flex-grow flex flex-col">
          <h2 className="font-bold text-lg mb-2 text-gray-800">Mini-Games Arcade</h2>
          <div className="grid grid-cols-2 gap-2 flex-grow">
            {games.map((game, index) => (
              <Card key={index} className="shadow-md aspect-video overflow-hidden border-0">
                <CardContent className={`bg-gradient-to-br ${game.gradient} flex flex-col items-center justify-center p-2 text-white text-center h-full`}>
                   <game.icon className="w-8 h-8" />
                   <p className="font-bold text-[10px] mt-1 text-shadow">{game.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
