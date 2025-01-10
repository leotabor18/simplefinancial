'use client';
import { TitleProps } from '@/app/util/interfaces';
import React from 'react';

const Title = (props: TitleProps) => {
  return (
    <div className={`${props.containerStyle}`}>
      <h1 className={`text-black text-[25px] font-bold ${props.textStyle}`}>{props.name}</h1>
      {props.sub ? <p className="py-4 text-slate-500 text-md">{props.sub}</p> : <></>}
    </div>
  );
};

export default Title;
