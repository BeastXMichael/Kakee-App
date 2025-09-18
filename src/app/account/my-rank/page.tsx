
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { CrownIcon } from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MyRankPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-0 sm:p-4 font-body">
      <div className="max-w-md w-full h-screen sm:h-[812px] bg-background shadow-2xl sm:rounded-[32px] flex flex-col relative overflow-hidden border-4 border-black">
        <div className="absolute inset-0 z-0 radiant-background-home animate-radiant-glow"></div>
        <header className="p-4 flex items-center justify-between flex-shrink-0 z-10">
          <Link href="/account">
            <ChevronLeft className="w-8 h-8 text-gray-700" />
          </Link>
          <h1 className="text-lg font-bold text-gray-800">My Rank</h1>
          <div className="w-8"></div>
        </header>

        <main className="flex-grow overflow-y-auto no-scrollbar px-4 py-6 text-center z-10">
            <div className="bg-primary/80 rounded-full w-32 h-32 mx-auto flex items-center justify-center border-4 border-white shadow-lg">
                <CrownIcon className="w-24 h-24" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 mt-4">General</h2>
            <p className="text-muted-foreground">You're at the top tier!</p>

            <Card className="mt-8 text-left bg-white/60 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Rank Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <p>✅ Exclusive access to new releases</p>
                    <p>✅ Double Koins on all activities</p>
                    <p>✅ Special "General" badge</p>
                    <p>✅ Priority support</p>
                </CardContent>
            </Card>
        </main>
      </div>
    </div>
  );
}
