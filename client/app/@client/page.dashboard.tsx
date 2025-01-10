'use client';

import Title from '@/app/components/title';
import React from 'react';
import Feed from '../components/client/feed';

interface Props {}

const DashboardComponent: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col w-full sm:p-10">
      <Title 
        name={'Welcome!'} 
        sub={`Here's what you need to complete so we can get started working on your projects for us`}
        containerStyle='mb-8 px-10' 
        textStyle=''
      />
      <div className="flex content-center items-center justify-center gap-4">
        <Feed />
      </div>
    </div>
  );
};
export default DashboardComponent;
