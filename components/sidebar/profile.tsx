'use client';

import { useRouter } from 'next/navigation';
import { IconDotsVertical, IconLogout } from '@tabler/icons-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { ProfileProps } from '@/components/sidebar';
import { signOut } from '@/lib/auth-client';

export default function Profile({ user }: { user: ProfileProps }) {
  const router = useRouter();

  async function handleLogout() {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/login');
          },
        },
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='w-full justify-start gap-2 px-3 py-2 text-left cursor-pointer hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
        >
          <Avatar className='h-8 w-8 rounded-lg grayscale'>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className='rounded-lg bg-gray-700'>
              {user.name[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-medium'>{user.name}</span>
            <span className='text-muted-foreground truncate text-xs'>
              {user.email}
            </span>
          </div>
          <IconDotsVertical className='ml-auto size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className='p-0 font-normal'>
          <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
            <Avatar className='h-8 w-8 rounded-lg'>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className='rounded-lg'>
                {user.name[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-medium'>{user.name}</span>
              <span className='text-muted-foreground truncate text-xs'>
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer text-red-500'
          onClick={handleLogout}
        >
          <IconLogout className='text-red-500' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
