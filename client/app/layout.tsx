import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { getUserData } from './api/external/userAPI';
import Navbar from './components/client/navbar';
import './globals.css';
import { LOGIN_URL, USER_ROLES } from './util/constants';
import Sidebar from './components/client/sidebar';
import { redirect } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Simple Financial',
  description: '',
};

const ReactDom = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
};

export default async function RootLayout({
  children,
  client,
  management,
}: Readonly<{
  children: React.ReactNode;
  client: React.ReactNode;
  management: React.ReactNode;
}>) {
  const { isAuthenticated } = getKindeServerSession();
  const isAuth = await isAuthenticated();

  if (isAuth) {
    const user = await getUserData();
    const pages = user?.role.name === USER_ROLES.MANAGEMENT ? management : client;

    return (
      <ReactDom>
        <div className="w-full h-screen flex flex-col">
          <Navbar admin={user?.role.name === USER_ROLES.MANAGEMENT ? 'admin' : ''} />
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar role={user?.role.name} />
            <div className="sm:ml-60 sm:mt-20 flex-1 overflow-auto bg-white">{pages ?? children}</div>
          </div>
        </div>
      </ReactDom>
    );
  }

  redirect(LOGIN_URL)
}
