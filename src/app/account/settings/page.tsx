
import { ChevronLeft, Bell, Lock, Palette } from 'lucide-react';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';

const settings = [
  { icon: Bell, text: 'Push Notifications', id: 'push' },
  { icon: Palette, text: 'Dark Mode', id: 'dark-mode' },
  { icon: Lock, text: 'Face ID / Biometrics', id: 'biometrics' },
];

export default function SettingsPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-0 sm:p-4 font-body">
      <div className="max-w-md w-full h-screen sm:h-[812px] bg-background shadow-2xl sm:rounded-[32px] flex flex-col relative overflow-hidden border-4 border-black">
        <header className="p-4 flex items-center justify-between flex-shrink-0">
          <Link href="/account">
            <ChevronLeft className="w-8 h-8 text-gray-700" />
          </Link>
          <h1 className="text-lg font-bold text-gray-800">Settings</h1>
          <div className="w-8"></div>
        </header>

        <main className="flex-grow overflow-y-auto no-scrollbar px-4 py-6">
            <div className="bg-white/40 backdrop-blur-sm rounded-lg shadow-sm border border-white/30">
                {settings.map((item, index) => (
                    <div key={item.id} className="w-full flex items-center justify-between p-4 text-left border-b border-white/20 last:border-b-0">
                        <div className="flex items-center space-x-4">
                        <item.icon className="w-6 h-6 text-gray-700" />
                        <span className="font-medium text-gray-800">{item.text}</span>
                        </div>
                        <Switch id={item.id} defaultChecked={item.id === 'push'} />
                    </div>
                ))}
            </div>
        </main>
      </div>
    </div>
  );
}
