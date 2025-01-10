'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { MenuProps } from '@/app/util/interfaces';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const MANAGEMENT_MENU = [
  { name: 'Clients', link: '/' },
  { name: 'Tasks Management', link: '/tasks' },
  { name: 'Forms', link: '/forms' },
  { name: 'Help Center', link: '/help-center' },
  { name: 'Settings', link: '/settings' },
];

const CLIENT_MENU = [
  { name: 'Home', link: '/' },
  { name: 'Messages', link: '/tasks' },
  { name: 'Help Center', link: '/help-center' },
  { name: 'Settings', link: '/settings' },
];

interface NavbarProps {
  admin: string;
}

const Navbar: React.FC<NavbarProps> = ({ admin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const nav = admin ? MANAGEMENT_MENU : CLIENT_MENU;
  console.log('this is admin?', admin);

  return (
    <header className="sm:fixed sm:top-0 sm:left-0 w-full h-20 bg-white z-10 shadow border-b-2 border-black/5">
      <nav aria-label="Global" className="flex mx-4 items-center justify-between gap-x-6 p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="#" className="mx-3">
            <span className="sr-only">Your Company</span>
            <Image src={'/images/simple-financials-logo.png'} alt="Simple Financials Logo" width={100} height={100} />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-6"></div>
        <div className="flex lg:hidden">
          <button type="button" onClick={() => setMobileMenuOpen(true)} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6 justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image src={'/images/simple-financials-logo.png'} alt="Simple Financials Logo" width={120} height={120} />
            </Link>

            <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          {nav.map((item: MenuProps, indx) => (
            <div key={item.name + indx} className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-4">
                  <Link href={item.link}>
                    <button className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-background">{item.name}</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6">
                <LogoutLink>
                  <button className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-background">Log out</button>
                </LogoutLink>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;
