import Image from 'next/image';
import React from 'react';

const InProgressContent = () => {
  return (
    <div className="mt-16 flex flex-col gap-y-6 items-center w-full">
      <h2 className="text-black text-4xl font-bold hover:bg-background ">Oops!</h2>
      <h5 className="mb-4 text-black text-base/7 font-medium	 hover:bg-background-50 ">This page is still in progress</h5>
      <Image src={'/images/in-progress.svg'} alt="In Progress SVG" width={448.14} height={448.53} />
    </div>
  );
};

export default InProgressContent;
