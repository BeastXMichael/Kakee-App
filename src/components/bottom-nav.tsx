'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { HomeIcon, ListenIcon, RewardsIcon, WatchIcon } from '@/components/icons';

const navItems = [
  { href: '/home', label: 'HOME', icon: HomeIcon },
  { href: '/listen', label: 'LISTEN', icon: ListenIcon },
  { href: '/watch', label: 'WATCH', icon: WatchIcon },
  { href: '/rewards', label: 'REWARDS', icon: RewardsIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <footer className="flex justify-around items-center p-2 border-t flex-shrink-0 bg-white/80 backdrop-blur-sm z-30">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link href={item.href} key={item.label} className={cn(
            'flex flex-col items-center w-1/4 transition-colors duration-200',
            isActive ? 'text-primary' : 'text-gray-400 hover:text-primary'
          )}>
            <item.icon className="w-6 h-6 mb-1" />
            <span className={cn('text-xs', isActive ? 'font-bold' : 'font-medium')}>{item.label}</span>
          </Link>
        );
      })}
    </footer>
  );
}
