
'use client';

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CommunityDjIcon, ShareSocialIcon, UserPlusIcon } from "../icons";

type Quest = {
    icon: React.ElementType;
    iconBg: string;
    title: string;
    description: string;
    xp: number;
    progress: number;
    total: number;
    claimed: boolean;
};

const dailyQuests: Quest[] = [
    { icon: ShareSocialIcon, iconBg: "bg-blue-100", title: "Social Butterfly", description: "Share a playlist to your social media.", xp: 50, progress: 1, total: 1, claimed: true },
    { icon: CommunityDjIcon, iconBg: "bg-green-100", title: "Community DJ", description: "Add 3 songs to a community playlist.", xp: 20, progress: 1, total: 3, claimed: false },
    { icon: UserPlusIcon, iconBg: "bg-red-100", title: "Better with Friends", description: "Successfully invite one friend to Kakee.", xp: 100, progress: 0, total: 1, claimed: false },
];

const weeklyQuests: Quest[] = [
    { icon: CommunityDjIcon, iconBg: "bg-green-100", title: "Playlist Pro", description: "Create 5 new playlists.", xp: 200, progress: 2, total: 5, claimed: false },
    { icon: UserPlusIcon, iconBg: "bg-red-100", title: "Super Recruiter", description: "Invite 5 friends to Kakee.", xp: 500, progress: 1, total: 5, claimed: false },
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
                <div className="text-right">
                    <p className="font-bold text-sm text-yellow-500">+{quest.xp} XP</p>
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
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="bottom" className="h-[90%] rounded-t-2xl flex flex-col p-0">
                <SheetHeader className="p-4 text-center">
                    <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-2" />
                    <SheetTitle className="font-extrabold text-2xl text-gray-800">Quests</SheetTitle>
                    <SheetDescription>
                        Complete challenges for awesome rewards!
                    </SheetDescription>
                </SheetHeader>
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
            </SheetContent>
        </Sheet>
    )
}
