'use client';

import { useState } from 'react';
import Logo from '@/components/shared/logo';
import Projects from '@/components/sidebar/projects';
import SidebarLinks from '@/components/sidebar/sidebar-links';
import Profile from '@/components/sidebar/profile';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export type ProfileProps = {
  name: string;
  email: string;
  avatar: string;
};

export default function SidebarMenu({ user }: { user: ProfileProps }) {
  const [open, setOpen] = useState(false);

  const closeSidebar = () => setOpen(false);
  return (
    <>
      <div className='hidden md:inline fixed left-0 top-0 bottom-0 md:w-[250px] dark:bg-white/5 border-r dark:border-neutral-800'>
        <div className='flex flex-col justify-between h-full p-8 py-10'>
          <div className='flex flex-col justify-between gap-4 w-full'>
            <Logo small />
            <Projects />
            <SidebarLinks />
          </div>
          <Profile user={user} />
        </div>
      </div>

      {/* Small screens */}
      <div className='flex items-center justify-between md:hidden p-6 border-b  dark:border-b-slate-800'>
        <Logo />
        <div className='flex items-center gap-2'>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <Menu className='size-8 dark:text-gray-400 bg-white/15 p-1 rounded-sm cursor-pointer hover:dark:text-gray-200 transition-colors' />
            </SheetTrigger>
            <SheetContent
              side='left'
              className='flex flex-col justify-between w-[250px]'
            >
              <SheetTitle className='sr-only'>Sidebar Menu Options</SheetTitle>
              <div className='flex flex-col justify-between h-full p-8 py-10 dark:bg-white/5 border-r dark:border-neutral-800'>
                <div className='flex flex-col justify-between gap-4 w-full'>
                  <Logo small />
                  <Projects />
                  <SidebarLinks closeSidebar={closeSidebar} />
                </div>
                <Profile user={user} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
