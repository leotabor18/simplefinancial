'use client';

import { SelectChipsProps } from '@/app/util/interfaces';
import { SelectChipsData } from '@/app/util/types';
import React, { useEffect, useRef, useState } from 'react';

const SelectChips: React.FC<SelectChipsProps> = ({ data, dropdownClassName, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div
        className="flex items-center justify-between rounded-md bg-grayLight py-3 p-4 border border-transparent text-sm text-black transition-all shadow-sm cursor-pointer"
        onClick={toggleDropdown}
      >
        {data.length === 1 ? (
          <span>{data[0].name}</span>
        ) : (
          <>
            <span>{data.length} {label}</span>
            <svg
              className={`w-4 h-4 ml-2 transform transition-transform ${
                isOpen ? 'rotate-180' : 'rotate-0'
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </>
        )}
      </div>

      {isOpen && data.length > 1 && (
        <div
          className={`absolute left-0 mt-1 w-fit bg-white rounded-md shadow-xl z-10 ${dropdownClassName || ''}`}
        >
          <ul className="py-2">
            {data.map((item: SelectChipsData, idx) => (
              <li
                key={idx}
                className="px-4 py-4 hover:bg-slate-100 text-gray-700 cursor-pointer"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectChips;
