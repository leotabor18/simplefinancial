import { TileProps } from '@/app/util/interfaces';
import Link from 'next/link';
import React from 'react';

const Tile = (props: TileProps) => {
  return (
    <div className='flex flex-col items-center justify-center w-[187px]'>
      <div className='h-[183px] bg-gray w-full rounded-[23px]'></div>
      <Link className='mt-3 text-black text-base/7 font-semibold hover:bg-gray-50 ' href={props.url}>{props.title}</Link>
    </div>
  )
}

export default Tile