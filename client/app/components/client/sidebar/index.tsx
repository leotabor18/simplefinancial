'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { USER_ROLES } from '@/app/util/constants';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { HomeIcon, ChatBubbleOvalLeftIcon, QuestionMarkCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { MenuItem, SidebarProps } from '@/app/util/interfaces';

const MANAGEMENT_MENU: MenuItem[] = [
  { name: 'Clients', link: '/', icon: HomeIcon },
  { name: 'Tasks Management', link: '/tasks', icon: HomeIcon },
  { name: 'Forms', link: '/forms', icon: HomeIcon },
  { name: 'Help Center', link: '/help-center', icon: QuestionMarkCircleIcon },
  { name: 'Settings', link: '/settings', icon: Cog6ToothIcon },
];

const CLIENT_MENU: MenuItem[] = [
  { name: 'Home', link: '/', icon: HomeIcon },
  { name: 'Messages', link: '/messages', icon: ChatBubbleOvalLeftIcon },
  { name: 'Help Center', link: '/help-center', icon: QuestionMarkCircleIcon },
  { name: 'Settings', link: '/settings', icon: Cog6ToothIcon },
];

const Sidebar = ({ role }: SidebarProps) => {
  const pathname = usePathname();

  const currentPath = useMemo(() => {
    if (pathname.includes('/clients')) return '/';
    if (pathname.includes('/dashboard')) return '/';
    if (pathname.includes('/forms')) return '/forms';
    return pathname;
  }, [pathname]);

  const menu = useMemo(() => {
    return role === USER_ROLES.MANAGEMENT ? MANAGEMENT_MENU : CLIENT_MENU;
  }, [role]);

  return (
    <div className="hidden sm:block sm:fixed sm:left-0 sm:top-20 h-screen w-60 gap-y-5 z-10 bg-background">
      <nav className="flex flex-1 flex-col mt-5">
        <ul className="flex flex-1 flex-col gap-y-7 text-center">
          <li>
            <ul className="space-y-4 w-full -mx-1">
              {menu.map((item) => (
                <Link key={item.name} href={item.link} className={clsx(item.link === currentPath ? 'bg-primary text-white' : 'text-slate-700 hover:bg-primary/10 hover:text-primary/80', 'w-full ml-1 group px-4 flex gap-x-3 p-4 md:text-sm ssm:px-8 items-center self-center')}>
                  <item.icon aria-hidden="true" className={clsx(item.link === currentPath ? 'text-white' : 'text-slate-700', 'h-6 w-6 md:ml-2 xs:min-w-6 xs:max-w-8 ssm:mr-6')} />
                  <span className="sm:text-base w-32 whitespace-nowrap text-left">{item.name}</span>
                </Link>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
