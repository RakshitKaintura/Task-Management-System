'use client';

import { Bell, Search, Menu } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ThemeToggle from './ThemeToggle';
import NotificationCenter from './NotificationCenter';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import useUIStore from '@/store/useUIStore';

export default function Topbar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { setMobileMenuOpen } = useUIStore();

  // Get initials for avatar fallback
  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button 
        variant="outline" 
        size="icon" 
        className="md:hidden shrink-0"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] rounded-full bg-muted"
            />
          </div>
        </form>

        <ThemeToggle />

        <NotificationCenter />

        <DropdownMenu>
          <DropdownMenuTrigger 
            render={
              <Button variant="ghost" className="relative h-8 w-8 rounded-full" />
            }
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar || ''} alt={user?.name || 'User'} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => router.push('/profile')}
              className="w-full cursor-pointer"
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => router.push('/settings')}
              className="w-full cursor-pointer"
            >
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600 focus:bg-red-100 dark:focus:bg-red-900/20">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
