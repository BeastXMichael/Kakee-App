
'use client';

import { Bell, Film, Gift, UserPlus } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

type Notification = {
    icon: React.ElementType;
    iconClass: string;
    text: string;
    time: string;
};

const notifications: Notification[] = [
    { icon: Gift, iconClass: "text-green-500", text: "You've earned 50 Koins from Daily Spin!", time: "5m ago" },
    { icon: Film, iconClass: "text-blue-500", text: "New episode of 'From HDB to CEO' is out.", time: "1h ago" },
    { icon: UserPlus, iconClass: "text-purple-500", text: "Your friend @user123 just joined Kakee!", time: "3h ago" },
    { icon: Bell, iconClass: "text-yellow-500", text: "'Lofi Beats Radio' playlist has been updated.", time: "yesterday" },
];

type NotificationPanelProps = {
    show: boolean;
    onClose: () => void;
};

export default function NotificationPanel({ show, onClose }: NotificationPanelProps) {
    return (
        <Sheet open={show} onOpenChange={(open) => !open && onClose()}>
            <SheetContent className="bg-background/95 backdrop-blur-sm border-l-primary/20">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2 text-primary-foreground">
                        <Bell className="w-5 h-5" />
                        Notifications
                    </SheetTitle>
                </SheetHeader>
                <div className="mt-6 flow-root">
                    <ul role="list" className="-my-4 divide-y divide-border">
                        {notifications.map((notification, index) => (
                            <li key={index} className="flex items-center space-x-4 py-4">
                                <div className="flex-shrink-0">
                                    <notification.icon className={`w-6 h-6 ${notification.iconClass}`} aria-hidden="true" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-primary-foreground/90">{notification.text}</p>
                                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </SheetContent>
        </Sheet>
    );
}
