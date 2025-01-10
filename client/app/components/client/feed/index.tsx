import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import ProgressBar from '../progressbar';
import { formatDate } from '@/app/util';

const timeline = [
  {
    id: 2,
    content: 'Initial Meeting and Onboarding',
    href: '#',
    date: 'Sep 22',
    datetime: '2020-09-22',
    icon: null,
  },
  {
    id: 3,
    content: 'Upload your P&L',
    href: '#',
    date: 'Sep 28',
    datetime: '2020-09-28',
    icon: null,
  },
  {
    id: 4,
    content: 'Answer Personal Information Form',
    href: '#',
    date: 'Sep 30',
    datetime: '2020-09-30',
    icon: CheckIcon,
  },
  {
    id: 5,
    content: 'Answer Tax Survey Form',
    href: '#',
    date: 'Oct 4',
    datetime: '2020-10-04',
    icon: CheckIcon,
  },
];

const Feed = () => {
  return (
    <div className="flow-root w-full sm:mx-10 bg-background sm:p-10 p-4 rounded-md space-y-5">
      <div className="flex flex-row justify-between items-center pb-6 px-1">
        <p className="font-semibold text-md sm:text-sm">{`Things to do`}</p>
        <ProgressBar />
      </div>
      <ul className="-mb-8">
        {timeline.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== timeline.length - 1 ? <span aria-hidden="true" className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" /> : null}
              <div className="relative flex space-x-4 bg-white p-8 rounded-md w-full items-center">
                <span className={clsx(event.icon ? 'bg-success' : '', 'flex size-5 sm:size-4 items-center justify-center ring-1 ring-black/25 rounded-md')}>{event.icon ? <event.icon aria-hidden="true" className="size-5 text-white" /> : <></>}</span>
                <div className="flex min-w-0 flex-1 justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">{event.content} </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={event.datetime}>{`Due Date: ${formatDate(event.date)}`}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
