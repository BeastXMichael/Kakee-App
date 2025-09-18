
'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { GeneralFrameAnimated, GeneralPackEmojis, LockIcon, VillageHeadIcon } from '@/components/icons';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function BenefitsSheet({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const [isRendered, setIsRendered] = useState(false);
    const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');

    useEffect(() => {
        if (open) {
            setIsRendered(true);
        } else {
            const timer = setTimeout(() => setIsRendered(false), 300); // Match animation duration
            return () => clearTimeout(timer);
        }
    }, [open]);

    if (!isRendered) return null;

    return (
        <div
            className={cn(
                "absolute inset-0 z-50 transition-colors duration-300",
                open ? "bg-black/60" : "bg-transparent pointer-events-none"
            )}
            onClick={() => onOpenChange(false)}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={cn(
                    "absolute bottom-0 left-0 w-full h-[90%] bg-secondary rounded-t-2xl flex flex-col transform transition-transform duration-300 ease-in-out",
                    open ? "translate-y-0" : "translate-y-full"
                )}
            >
                <header className="p-4 flex-shrink-0 bg-background/80 backdrop-blur-sm shadow-sm rounded-t-2xl">
                     <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-2" />
                    <div className="text-center">
                        <h2 className="font-extrabold text-2xl text-gray-800">My Collection</h2>
                        <p className="text-sm text-muted-foreground">Show off your unlocked rewards!</p>
                    </div>
                </header>

                <main className="flex-grow overflow-y-auto no-scrollbar p-4 space-y-6">
                    <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Profile Frames</h3>
                        <div className="bg-white/80 rounded-xl shadow-sm border border-white/50 p-3 space-y-3">
                            <div className="flex items-center justify-between bg-primary/20 border border-primary/30 rounded-lg p-2">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        {userAvatar && <Image src={userAvatar.imageUrl} alt="User Avatar" width={40} height={40} className="w-10 h-10 rounded-full shadow-lg shadow-primary/50" />}
                                        <div className="absolute inset-0 w-10 h-10 rounded-full border-2 border-primary animate-pulse"></div>
                                    </div>
                                    <span className="font-bold text-sm text-primary-foreground">General's Frame</span>
                                </div>
                                <div className="w-10 h-10">
                                    <GeneralFrameAnimated className="animate-spin-slow"/>
                                </div>
                            </div>
                             <div className="flex items-center justify-between p-2">
                                <div className="flex items-center gap-3 text-gray-500">
                                     <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                        <VillageHeadIcon className="w-6 h-6 text-gray-400"/>
                                     </div>
                                    <span className="font-bold text-sm">Village Head Frame</span>
                                </div>
                                <LockIcon className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Sound Effects</h3>
                        <div className="bg-white/80 rounded-xl shadow-sm border border-white/50 p-3">
                             <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-sm text-gray-800">Cosmic Echoes</h4>
                                    <p className="text-xs text-gray-500">Unlocked at: General</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Switch id="sfx-cosmic" checked />
                                    <Badge className="bg-primary hover:bg-primary/90">Equipped</Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2">Emoji Packs</h3>
                         <div className="space-y-3">
                            <div className="bg-white/80 rounded-xl shadow-sm border-2 border-primary p-3">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h4 className="font-bold text-sm text-gray-800">General's Pack</h4>
                                        <p className="text-xs text-green-600 font-medium">Unlocked!</p>
                                    </div>
                                    <Badge className="bg-primary hover:bg-primary/90">Equipped</Badge>
                                </div>
                                <GeneralPackEmojis />
                            </div>
                             <div className="bg-white/80 rounded-xl shadow-sm border border-white/50 p-3">
                                 <div className="flex items-center justify-between">
                                    <div className="opacity-50">
                                        <h4 className="font-bold text-sm text-gray-800">Village Head's Pack</h4>
                                        <p className="text-xs text-gray-500">Unlock at Village Head Rank</p>
                                    </div>
                                    <LockIcon className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

