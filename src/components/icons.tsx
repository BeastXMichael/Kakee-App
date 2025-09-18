
import type { SVGProps } from 'react';
import { cn } from "@/lib/utils"
import { Music2, Share2, UserPlus, MapPin, KeyRound, GraduationCap, Building } from 'lucide-react';

export function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="currentColor" viewBox="0 0 20 20">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  );
}

export function ListenIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
    </svg>
  );
}

export function WatchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

export function RewardsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="currentColor" viewBox="0 0 20 20">
      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}

export function SmileIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
    )
}

export function BellIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
        </svg>
    )
}

export function CrownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M44,23l-8.8,3.2L32,18l-8,5l-8-5l-3.2,8.2L4,23L12,31l-2,8h28l-2-8L44,23z M10,15, M24,14, M38,15"/>
        <circle fill="currentColor" cx="10" cy="15" r="4"/>
        <circle fill="currentColor" cx="24" cy="14" r="4"/>
        <circle fill="currentColor" cx="38" cy="15" r="4"/>
    </svg>
  );
}

export function KoinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <div className={cn("w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold", props.className)}>
        K
    </div>
  )
}

export const ProfileFrame = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 120 120" {...props}>
    <defs>
      <linearGradient id="g-frame-woah" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="100%" stopColor="#F472B6" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path
      d="M 60,10 A 50,50 0 1 1 59.9,10.01 L 60,30 Z M 60,110 A 50,50 0 1 1 60.1,109.99 L 60,90 Z"
      stroke="url(#g-frame-woah)"
      strokeWidth="4"
      fill="none"
      filter="url(#glow)"
    />
    <circle
      cx="60"
      cy="60"
      r="57"
      fill="none"
      stroke="url(#g-frame-woah)"
      strokeWidth="1"
      strokeDasharray="2 5"
      opacity="0.5"
    />
  </svg>
)

export const DailySpinWheelIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" {...props}>
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#fecaca"/><stop offset="100%" stopColor="#fed7aa"/></linearGradient>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#fed7aa"/><stop offset="100%" stopColor="#fef08a"/></linearGradient>
      <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#fef08a"/><stop offset="100%" stopColor="#d9f99d"/></linearGradient>
      <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#d9f99d"/><stop offset="100%" stopColor="#bfdbfe"/></linearGradient>
      <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#bfdbfe"/><stop offset="100%" stopColor="#ddd6fe"/></linearGradient>
      <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#ddd6fe"/><stop offset="100%" stopColor="#fecaca"/></linearGradient>
    </defs>
    <circle cx="50" cy="50" r="48" fill="#fde68a" stroke="#fff" strokeWidth="4"/>
    <path d="M50 50 L50 2 A48 48 0 0 1 91.6 25 Z" fill="url(#grad1)"/>
    <path d="M50 50 L91.6 25 A48 48 0 0 1 91.6 75 Z" fill="url(#grad2)"/>
    <path d="M50 50 L91.6 75 A48 48 0 0 1 50 98 Z" fill="url(#grad3)"/>
    <path d="M50 50 L50 98 A48 48 0 0 1 8.4 75 Z" fill="url(#grad4)"/>
    <path d="M50 50 L8.4 75 A48 48 0 0 1 8.4 25 Z" fill="url(#grad5)"/>
    <path d="M50 50 L8.4 25 A48 48 0 0 1 50 2 Z" fill="url(#grad6)"/>
    <circle cx="50" cy="50" r="15" fill="#fff" stroke="#ef4444" strokeWidth="4"/>
  </svg>
)

export function TreasureChestIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <image href="https://img.icons8.com/plasticine/100/000000/treasure-chest.png" height="100" width="100"/>
    </svg>
  )
}

export function StreamsRouletteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 3.5a1.5 1.5 0 01.5 2.915V9.5a1.5 1.5 0 01-3 0V6.415A1.5 1.5 0 0110 3.5z" />
      <path d="M4 9.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1.51a3.5 3.5 0 006 0V9.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2.336A6.5 6.5 0 0110 18.5a6.5 6.5 0 01-6.5-6.664V9.5z" />
    </svg>
  )
}

export function LyricLegendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
    </svg>
  )
}

export function KakeeBeatsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="currentColor">
      <path d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.084l.943.314A3 3 0 0011 14V5.236l6.553-3.129A1 1 0 0018 3z" />
      <path d="M5 12a2 2 0 100 4 2 2 0 000-4z" />
      <path d="M11 14a2 2 0 100 4 2 2 0 000-4z" />
    </svg>
  )
}

export function GuessTheSongIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  )
}

export const SoundWaveIcon = (props: SVGProps<SVGSVGElement>) => (
    <div className={cn("flex items-end justify-between h-full", props.className)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
    </div>
)

export function ShareSocialIcon(props: SVGProps<SVGSVGElement>) {
  return <Share2 {...props} className={cn("text-blue-500", props.className)} />
}

export function CommunityDjIcon(props: SVGProps<SVGSVGElement>) {
  return <Music2 {...props} className={cn("text-green-500", props.className)} />
}

export function UserPlusIcon(props: SVGProps<SVGSVGElement>) {
  return <UserPlus {...props} className={cn("text-red-500", props.className)} />
}

export function VillageHeadIcon(props: SVGProps<SVGSVGElement>) {
  return <Building {...props} />
}
export function ExperiencedIcon(props: SVGProps<SVGSVGElement>) {
  return <MapPin {...props} />
}
export function TenantIcon(props: SVGProps<SVGSVGElement>) {
  return <KeyRound {...props} />
}
export function FreshmanIcon(props: SVGProps<SVGSVGElement>) {
  return <GraduationCap {...props} />
}
