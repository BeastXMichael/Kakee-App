
import { ChevronLeft, Gift } from 'lucide-react';
import Link from 'next/link';
import { CrownIcon, VillageHeadIcon, ExperiencedIcon, TenantIcon, FreshmanIcon } from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ProfileAvatar } from '@/components/home/profile-avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ranks = [
    {
        name: 'General',
        koins: null,
        icon: CrownIcon,
        iconBg: 'bg-primary/20',
        textColor: 'text-primary',
        isCurrent: true,
        perks: ['Exclusive Profile Banner', 'Animated Emoji Pack']
    },
    {
        name: 'Village Head',
        koins: 5000,
        icon: VillageHeadIcon,
        iconBg: 'bg-red-100',
        textColor: 'text-red-500',
        isCurrent: false,
        perks: []
    },
    {
        name: 'Experienced',
        koins: 2000,
        icon: ExperiencedIcon,
        iconBg: 'bg-orange-100',
        textColor: 'text-orange-500',
        isCurrent: false,
        perks: []
    },
    {
        name: 'Tenant',
        koins: 500,
        icon: TenantIcon,
        iconBg: 'bg-yellow-100',
        textColor: 'text-yellow-500',
        isCurrent: false,
        perks: []
    },
    {
        name: 'Freshman',
        koins: 0,
        icon: FreshmanIcon,
        iconBg: 'bg-blue-100',
        textColor: 'text-blue-500',
        isCurrent: false,
        perks: []
    }
]

export default function MyRankPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-0 sm:p-4 font-body">
      <div className="max-w-md w-full h-screen sm:h-[812px] bg-[#f7f7f7] shadow-2xl sm:rounded-[32px] flex flex-col relative overflow-hidden border-4 border-black">
        <header className="p-4 flex items-center justify-between flex-shrink-0 z-10 bg-white shadow-sm">
          <Link href="/account">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold text-gray-800">Hey Buddy</h1>
          <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
            <Gift className="w-5 h-5"/>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto no-scrollbar">
            <div className="p-4 bg-white">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12">
                        <ProfileAvatar/>
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800">General Buddy</h2>
                        <p className="text-sm text-gray-500">You're at the highest rank!</p>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex justify-between text-xs font-bold text-gray-500 mb-1">
                        <span>Rank Progress</span>
                        <span className="text-red-500">MAX</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-rank-progress h-2.5 rounded-full" style={{width: '100%'}}></div>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-3">All Ranks</h3>
                <div className="space-y-3">
                    {ranks.map(rank => (
                        <div key={rank.name} className={`bg-white rounded-xl shadow-sm p-4 ${rank.isCurrent ? 'border-2 border-primary' : 'border border-gray-100'}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${rank.iconBg}`}>
                                        <rank.icon className={`w-6 h-6 ${rank.textColor}`} />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold ${rank.isCurrent ? rank.textColor : 'text-gray-800'}`}>{rank.name}</h4>
                                        <p className="text-xs text-gray-500">
                                            {rank.isCurrent ? 'All perks unlocked!' : `Unlocked at ${rank.koins} Koins`}
                                        </p>
                                    </div>
                                </div>
                                {rank.isCurrent && <Badge className="bg-primary hover:bg-primary text-primary-foreground font-bold">Current</Badge>}
                            </div>
                            {rank.isCurrent && rank.perks.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                                   {rank.perks.map((perk, index) => (
                                     <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                        <div className="w-4 h-4 rounded-full bg-primary/30 text-primary flex items-center justify-center text-xs">🎁</div>
                                        <span>{perk}</span>
                                     </div>
                                   ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
