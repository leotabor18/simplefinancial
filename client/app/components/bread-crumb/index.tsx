'use client';

import { BreadCrumbItemProps, BreadCrumbProps } from '@/app/util/interfaces';
import { useRouter } from 'next/navigation';
import React from 'react'

const BreadCrumb: React.FC<BreadCrumbProps> = (props) => {
  const { items } = props;

  const router = useRouter();

  const previousLinks = items.slice(0, items.length - 1);
  const lastLink = items.slice(items.length - 1)[0];

  const handleClick = (link: string) => {
    router.push(link);
  }

  return (
    <nav className="flex" aria-label="Breadcrumb">
      {
        items.length === 1 ? 
        <li className="inline-flex items-center">
          <a onClick={() => handleClick(items[0].link)} className="inline-flex items-center font-medium text-textLight hover:text-graylight dark:text-textLight dark:hover:graylight hover:cursor-pointer">
          { items[0].name }
          </a>
        </li>
        :
        <>
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {
          previousLinks.map((item: BreadCrumbItemProps, idx: number) => (
            <div key={idx} className='flex items-center'>
              <li className="inline-flex items-center">
                <a onClick={() => handleClick(item.link)} className="inline-flex items-center font-medium text-textLight hover:text-graylight dark:text-textLight dark:hover:graylight hover:cursor-pointer">
                  { item.name }
                </a>
              </li>
              <li>
                <div className="flex items-center ml-2">
                  <svg className="rtl:rotate-180 w-3 h-3 text-textLight mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                </div>
              </li>
            </div>
          ))
        }
            <li className="inline-flex items-center">
              <a onClick={() => handleClick(lastLink.link)}  className="inline-flex items-center font-medium text-primary hover:text-graylight dark:text-primary dark:hover:graylight hover:cursor-pointer">
                { lastLink.name }
              </a>
            </li>
          </ol>
        </>
      }
    </nav>
  )
}

export default BreadCrumb