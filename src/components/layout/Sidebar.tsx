'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar as CalendarIcon, 
  BarChart3, 
  UserCircle, 
  Settings,
  Menu,
  ChevronLeft
} from 'lucide-react';

import { cn } from '@/lib/utils';
import useUIStore from '@/store/useUIStore';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

const bottomNavItems = [
  { name: 'Profile', href: '/profile', icon: UserCircle },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar } = useUIStore();

  const sidebarVariants = {
    expanded: { width: '240px' },
    collapsed: { width: '70px' },
  };

  return (
    <motion.aside
      initial={false}
      animate={isSidebarCollapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      className="hidden md:flex flex-col border-r bg-card h-screen sticky top-0 z-40 transition-colors"
    >
      {/* Logo & Toggle */}
      <div className={cn("flex items-center h-16 border-b px-4", isSidebarCollapsed ? "justify-center" : "justify-between")}>
        {!isSidebarCollapsed && (
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl overflow-hidden whitespace-nowrap">
            <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white h-3.5 w-3.5">
                <path d="M12 2v20" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            TaskFlow
          </Link>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className={cn("shrink-0", isSidebarCollapsed && "mx-auto")}>
          {isSidebarCollapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          
          return (
            <Tooltip key={item.href} delayDuration={isSidebarCollapsed ? 0 : 1000}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 transition-colors overflow-hidden",
                    isActive 
                      ? "bg-primary text-primary-foreground font-medium" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    isSidebarCollapsed ? "justify-center px-0" : ""
                  )}
                >
                  <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                  {!isSidebarCollapsed && <span className="truncate">{item.name}</span>}
                </Link>
              </TooltipTrigger>
              {isSidebarCollapsed && <TooltipContent side="right">{item.name}</TooltipContent>}
            </Tooltip>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="border-t py-4 px-3 flex flex-col gap-1">
        {bottomNavItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          
          return (
            <Tooltip key={item.href} delayDuration={isSidebarCollapsed ? 0 : 1000}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 transition-colors overflow-hidden",
                    isActive 
                      ? "bg-primary text-primary-foreground font-medium" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    isSidebarCollapsed ? "justify-center px-0" : ""
                  )}
                >
                  <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                  {!isSidebarCollapsed && <span className="truncate">{item.name}</span>}
                </Link>
              </TooltipTrigger>
              {isSidebarCollapsed && <TooltipContent side="right">{item.name}</TooltipContent>}
            </Tooltip>
          );
        })}
      </div>
    </motion.aside>
  );
}
