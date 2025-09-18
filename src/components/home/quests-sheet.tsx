
'use client';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CommunityDjIcon, ShareSocialIcon, UserPlusIcon } from "../icons";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { KoinIcon } from "../icons";

type Quest = {
    icon: React.ElementType;
    iconBg: string;
    title: string;
    description: string;
    reward: number;
    progress: number;
    total: number;
    claimed: boolean;
};

const dailyQuests: Quest[] = [
    { icon: ShareSocialIcon, iconBg: "bg-blue-100", title: "Social Butterfly", description: "Share a playlist to your social media.", reward: 50, progress: 1, total: 1, claimed: true },
    { icon: CommunityDjIcon, iconBg: "bg-green-100", title: "Community DJ", description: "Add 3 songs to a community playlist.", reward: 20, progress: 1, total: 3, claimed: false },
    { icon: UserPlusIcon, iconBg: "bg-red-100", title: "Better with Friends", description: "Successfully invite one friend to Kakee.", reward: 100, progress: 0, total: 1, claimed: false },
];

const weeklyQuests: Quest[] = [
    { icon: CommunityDjIcon, iconBg: "bg-green-100", title: "Playlist Pro", description: "Create 5 new playlists.", reward: 200, progress: 2, total: 5, claimed: false },
    { icon: UserPlusIcon, iconBg: "bg-red-100", title: "Super Recruiter", description: "Invite 5 friends to Kakee.", reward: 500, progress: 1, total: 5, claimed: false },
];


function QuestItem({ quest }: { quest: Quest }) {
    return (
        <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${quest.iconBg}`}>
                    <quest.icon className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                    <h4 className="font-bold text-sm text-gray-800">{quest.title}</h4>
                    <p className="text-xs text-gray-500">{quest.description}</p>
                </div>
                <div className="text-right flex items-center gap-1">
                    <p className="font-bold text-sm text-yellow-500">+{quest.reward}</p>
                    <KoinIcon className="w-4 h-4 text-xs" />
                </div>
            </div>
            <div className="flex items-center gap-3 mt-2">
                <Progress value={(quest.progress / quest.total) * 100} className="h-2 flex-grow" />
                <span className="text-xs font-medium text-gray-500 w-8 text-right">{quest.progress}/{quest.total}</span>
                {quest.claimed ? (
                    <Button size="sm" variant="outline" className="text-xs h-7 px-4" disabled>Claimed</Button>
                ) : (
                     <Button size="sm" className={`text-xs h-7 px-4 ${quest.progress >= quest.total ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}`}>
                        {quest.progress >= quest.total ? 'Claim' : 'Go'}
                    </Button>
                )}
            </div>
        </div>
    );
}

export default function QuestsSheet({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const [isRendered, setIsRendered] = useState(false);

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
                    "absolute bottom-0 left-0 w-full h-[90%] bg-background rounded-t-2xl flex flex-col p-0 transform transition-transform duration-300 ease-in-out",
                    open ? "translate-y-0" : "translate-y-full"
                )}
            >
                <div className="p-4 text-center relative flex-shrink-0">
                    <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-2" />
                    <h2 className="font-extrabold text-2xl text-gray-800">Quests</h2>
                    <p className="text-sm text-muted-foreground">Complete challenges for awesome rewards!</p>
                    <button onClick={() => onOpenChange(false)} className="absolute top-4 right-4 text-muted-foreground">
                        <X className="w-5 h-5"/>
                    </button>
                </div>
                <Tabs defaultValue="daily" className="w-full flex-grow flex flex-col">
                    <TabsList className="mx-4 grid w-auto grid-cols-2">
                        <TabsTrigger value="daily">Daily</TabsTrigger>
                        <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    </TabsList>
                    <p className="text-xs text-gray-500 text-center my-2">New quests in 10h 42m</p>
                    <div className="flex-grow overflow-y-auto no-scrollbar bg-gray-100/50">
                        <TabsContent value="daily" className="m-0 p-4">
                            <div className="space-y-3">
                                {dailyQuests.map((quest, i) => <QuestItem key={`daily-${i}`} quest={quest} />)}
                            </div>
                        </TabsContent>
                        <TabsContent value="weekly" className="m-0 p-4">
                            <div className="space-y-3">
                                {weeklyQuests.map((quest, i) => <QuestItem key={`weekly-${i}`} quest={quest} />)}
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}
