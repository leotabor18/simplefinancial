import { SelectProps } from '@/app/util/interfaces';
import { SelectItemProps } from '@/app/util/types';
import React, { useState, useRef, useEffect } from 'react';

const Select: React.FC<SelectProps> = (props) => {
  const {selected,
    options,
    onSelect,
    label,
    helperText,
    error } = props;

  const [value, setValue] = useState<SelectItemProps | undefined>(selected);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: SelectItemProps) => {
    setValue(value);
    setIsOpen(false);
    if(!onSelect) {
      return;
    }
    onSelect(value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label
        htmlFor="custom-select"
        className="block mb-2 text-base font-medium text-black dark:text-black"
      >
        { label }
      </label>
      <div
        className="flex items-center justify-between border h-[58px] text-black text-base rounded-lg block w-full p-4 bg-gray-50 border-gray 
        focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {options?.find((option) => option.value === value?.value)?.label}
          {!value && <span className="text-[#9CA3AF]">{label}</span>}
        </span>
        <span>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 15l-7-7-7 7"
              />
            </svg>
          )}
        </span>
      </div>
      {isOpen && (
        <ul
          className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 h-[200px] overflow-auto"
        >
          {options?.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-[rgba(8,77,120,0.1)] cursor-pointer text-black"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
          {
            !options?.length ?
              (<span className="text-[#9CA3AF] italic m-4">No data found</span>)
            :
              (<></>)
          }
        </ul>
      )}
    </div>
  );
};

export default Select;
