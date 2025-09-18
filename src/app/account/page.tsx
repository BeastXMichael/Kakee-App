
import { ChevronLeft, ChevronRight, User, Globe, Shield, Users, Settings, HelpCircle, LogOut } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const menuItems = [
  { icon: User, text: 'Edit Profile' },
  { icon: Globe, text: 'Language' },
  { icon: Shield, text: 'My Rank' },
  { icon: Users, text: 'Refer a Friend' },
  { icon: Settings, text: 'Settings' },
  { icon: HelpCircle, text: 'Help & Support' },
];

export default function AccountPage() {
  const avatarImage = PlaceHolderImages.find(img => img.id === 'user-avatar');

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-0 sm:p-4 font-body">
      <div className="max-w-md w-full h-screen sm:h-[812px] bg-gray-50 shadow-2xl sm:rounded-[32px] flex flex-col relative overflow-hidden border-4 border-black">
        <header className="p-4 flex items-center justify-between flex-shrink-0 z-10 bg-gray-50/80 backdrop-blur-sm">
          <Link href="/home">
            <ChevronLeft className="w-8 h-8 text-gray-700" />
          </Link>
          <h1 className="text-lg font-bold text-gray-800">Account</h1>
          <div className="w-8"></div>
        </header>

        <main className="flex-grow overflow-y-auto no-scrollbar">
          <div className="p-6 flex flex-col items-center">
            <div className="relative w-24 h-24">
              {avatarImage && (
                <Image
                  src={avatarImage.imageUrl}
                  alt="User Avatar"
                  width={96}
                  height={96}
                  className="w-full h-full rounded-full border-4 border-white shadow-lg"
                  data-ai-hint={avatarImage.imageHint}
                />
              )}
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-800">General</h2>
            <p className="text-sm text-gray-500">general@kakee.com</p>
          </div>

          <div className="px-4 py-2">
            <div className="bg-white rounded-lg shadow-sm">
              {menuItems.map((item, index) => (
                <button key={index} className="w-full flex items-center justify-between p-4 text-left border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <item.icon className="w-6 h-6 text-gray-500" />
                    <span className="font-medium text-gray-700">{item.text}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
          
          <div className="px-4 py-2 mt-4">
            <div className="bg-white rounded-lg shadow-sm">
                <button className="w-full flex items-center p-4 text-left">
                  <div className="flex items-center space-x-4">
                    <LogOut className="w-6 h-6 text-red-500" />
                    <span className="font-medium text-red-500">Logout</span>
                  </div>
                </button>
            </div>
          </div>
          
          <div className="text-center py-4 text-xs text-gray-400">
            Version 1.0.0
          </div>
        </main>
      </div>
    </div>
  );
}
