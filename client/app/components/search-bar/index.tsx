'use client';

import { SearchBarProps } from '@/app/util/interfaces';
import { ChangeEvent, MouseEvent, useState } from 'react';

const Searchbar = <T extends string>({ placeHolder = "Type Company here", onClick, onChange, initialInput }: SearchBarProps<T>) => {
  const [input, setInput] = useState(initialInput);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick(input);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setInput(e.target.value);
  };

  return (
    <form className="w-[491px] h-[51px]">
      <div className="flex">
        <div className="relative w-full h-full">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            id="search-dropdown"
            className="block p-3.5 rounded-[14px] border border-gray w-full z-20 text-sm text-black bg-gray-50 focus:ring-grayLight focus:border-grayLight no-clear"
            placeholder={placeHolder}
          />
          <button
            type="submit"
            onClick={handleClick}
            className="absolute top-0 right-0 p-2 pr-5 text-sm font-medium h-full text-white rounded-e-lg focus:outline-none "
          >
            <svg
              className="w-[24px] h-[24px] text-primary text-2xl"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Searchbar;
