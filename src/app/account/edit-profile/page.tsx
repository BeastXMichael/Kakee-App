
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProfileAvatar } from '@/components/home/profile-avatar';

export default function EditProfilePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-0 sm:p-4 font-body">
      <div className="max-w-md w-full h-screen sm:h-[812px] bg-background shadow-2xl sm:rounded-[32px] flex flex-col relative overflow-hidden border-4 border-black">
        <header className="p-4 flex items-center justify-between flex-shrink-0 z-10">
          <Link href="/account">
            <ChevronLeft className="w-8 h-8 text-gray-700" />
          </Link>
          <h1 className="text-lg font-bold text-gray-800">Edit Profile</h1>
          <div className="w-8"></div>
        </header>

        <main className="flex-grow overflow-y-auto no-scrollbar px-4">
          <div className="py-6 flex flex-col items-center">
            <div className="scale-90">
              <ProfileAvatar />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="General" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="general@kakee.com" disabled />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                defaultValue="Our #1 Rewards Buddy"
                rows={3}
              />
            </div>
            <Button className="w-full">Save Changes</Button>
          </div>
        </main>
      </div>
    </div>
  );
}
