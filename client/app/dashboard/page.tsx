import React from 'react';
import type { Metadata, NextApiRequest, NextApiResponse } from 'next';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { redirect } from 'next/navigation';
import MainHeader from '../components/client/header';
export const metadata: Metadata = {};

const Dashboard = ({isAuthed} : {isAuthed : boolean}) => {
  metadata.title = 'Dashboard';

  // const { getUser } = getKindeServerSession();
  // getUser().then((data) => console.log(data));
  // if (isAuthed) {
  //   redirect('/clients');
  // }
  //   if using useEffect -> please create a new file with 'use client' instead.

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <LogoutLink className='border p-2 w-72 text-xl font-bold mt-3 hover:text-blue-500 duration-300 active:text-gray-700'>
          Logout
        </LogoutLink>
      </div>
    </>
  );
};

export default Dashboard;
