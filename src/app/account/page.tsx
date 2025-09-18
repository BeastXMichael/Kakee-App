
'use client';

import { ChevronLeft, ChevronRight, User, Globe, Shield, Users, Settings, HelpCircle, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { ProfileAvatar } from '@/components/home/profile-avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const menuItems = [
  { icon: User, text: 'Edit Profile', href: '/account/edit-profile' },
  { icon: Globe, text: 'Language', href: '/account/language' },
  { icon: Shield, text: 'My Rank', href: '/account/my-rank' },
  { icon: Users, text: 'Refer a Friend', href: '/account/refer-a-friend' },
  { icon: Settings, text: 'Settings', href: '/account/settings' },
  { icon: HelpCircle, text: 'Help & Support', href: '/account/help-support' },
];

export default function AccountPage() {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    setShowLogoutDialog(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push('/home'); 
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-200 p-0 sm:p-4 font-body">
        <div className="max-w-md w-full h-screen sm:h-[812px] bg-background shadow-2xl sm:rounded-[32px] flex flex-col relative overflow-hidden border-4 border-black">
          <div className="absolute inset-0 z-0 radiant-background-home animate-radiant-glow"></div>
          <header className="p-4 flex items-center justify-between flex-shrink-0 z-10 bg-transparent">
            <Link href="/home">
              <ChevronLeft className="w-8 h-8 text-gray-700" />
            </Link>
            <h1 className="text-lg font-bold text-gray-800">Account</h1>
            <div className="w-8"></div>
          </header>

          <main className="flex-grow overflow-y-auto no-scrollbar z-10">
            <div className="py-6 flex flex-col items-center">
              <div className="scale-[1.15] my-2">
                <ProfileAvatar />
              </div>
              <h2 className="mt-8 text-xl font-bold text-gray-800">General</h2>
              <p className="text-sm text-gray-500">general@kakee.com</p>
            </div>

            <div className="px-4 py-2">
              <div className="bg-white/40 backdrop-blur-sm rounded-lg shadow-sm border border-white/30">
                {menuItems.map((item, index) => (
                  <Link href={item.href} key={index} className="w-full flex items-center justify-between p-4 text-left border-b border-white/20 last:border-b-0">
                    <div className="flex items-center space-x-4">
                      <item.icon className="w-6 h-6 text-gray-700" />
                      <span className="font-medium text-gray-800">{item.text}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="px-4 py-2 mt-4">
              <div className="bg-white/40 backdrop-blur-sm rounded-lg shadow-sm border border-white/30">
                <AlertDialogTrigger asChild>
                  <button className="w-full flex items-center p-4 text-left">
                    <div className="flex items-center space-x-4">
                      <LogOut className="w-6 h-6 text-red-500" />
                      <span className="font-medium text-red-500">Logout</span>
                    </div>
                  </button>
                </AlertDialogTrigger>
              </div>
            </div>
            
            <div className="text-center py-4 text-xs text-gray-500">
              Version 1.0.0
            </div>
          </main>
        </div>
      </div>
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be returned to the home screen. You can always log back in.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-red-500 hover:bg-red-600">Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
