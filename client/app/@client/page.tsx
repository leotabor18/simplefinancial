import DashboardComponent from './page.dashboard';
import { Inter } from 'next/font/google';
import clsx from 'clsx';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

interface Params {}

const Dashboard = async () => {
  return (
    <main className={clsx(inter.variable, 'flex w-full')}>
      <DashboardComponent />
    </main>
  );
};

export default Dashboard;
