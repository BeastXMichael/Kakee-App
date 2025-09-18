
import { ChevronLeft, Check } from 'lucide-react';
import Link from 'next/link';

const languages = [
  { name: 'English', code: 'en', selected: true },
  { name: '中文 (Simplified)', code: 'zh-CN', selected: false },
  { name: 'Bahasa Melayu', code: 'ms', selected: false },
  { name: 'தமிழ்', code: 'ta', selected: false },
];

export default function LanguagePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-0 sm:p-4 font-body">
      <div className="max-w-md w-full h-screen sm:h-[812px] bg-background shadow-2xl sm:rounded-[32px] flex flex-col relative overflow-hidden border-4 border-black">
        <header className="p-4 flex items-center justify-between flex-shrink-0 z-10">
          <Link href="/account">
            <ChevronLeft className="w-8 h-8 text-gray-700" />
          </Link>
          <h1 className="text-lg font-bold text-gray-800">Language</h1>
          <div className="w-8"></div>
        </header>

        <main className="flex-grow overflow-y-auto no-scrollbar px-4 py-6">
          <div className="bg-white/40 backdrop-blur-sm rounded-lg shadow-sm border border-white/30">
            {languages.map((lang, index) => (
              <button key={lang.code} className="w-full flex items-center justify-between p-4 text-left border-b border-white/20 last:border-b-0">
                <span className="font-medium text-gray-800">{lang.name}</span>
                {lang.selected && <Check className="w-5 h-5 text-primary" />}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
