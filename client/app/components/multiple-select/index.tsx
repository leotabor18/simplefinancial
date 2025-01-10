import { MutipleSelectProps } from '@/app/util/interfaces';
import React, { useState, useRef, useEffect } from 'react';
import DropDownArrow from '../drop-down-arrow';
import { SelectItemProps } from '@/app/util/types';

const MultipleSelect: React.FC<MutipleSelectProps> = ({
  selected = [],
  options,
  onSelect,
  label,
  helperText,
  error
}) => {
  const [selectedValues, setSelectedValues] = useState<SelectItemProps[]>(selected);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleSelection = (option: SelectItemProps) => {
    const updatedValues = selectedValues.find(item => option.value === item.value)
      ? selectedValues.filter((v) => v.value !== option.value)
      : [...selectedValues, option];
    if(!onSelect) {
      return;
    }
    setSelectedValues(updatedValues);
    onSelect(updatedValues);
  };

  const removeSelection = (selectedValue: SelectItemProps) => {
    const updatedValues = selectedValues.filter((v) => v.value !== selectedValue.value);
    setSelectedValues(updatedValues);
    if(!onSelect) {
      return;
    }
    onSelect(updatedValues);
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

  const handleOpen = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <label
        htmlFor="custom-select"
        className="block mb-2 text-base font-medium text-black dark:text-black"
      >
        {label}
      </label>
      <div
        className={`flex items-center flex-wrap border h-auto text-black text-base rounded-lg block w-full ${selectedValues.length ? 'p-2 ' :'p-4 ' }bg-gray-50 border-gray 
        focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black cursor-pointer`}
        onClick={handleOpen}
      >
        {selectedValues.map((selectedValue) => {
          const optionLabel = options?.find((option) => option.value === selectedValue.value)?.label;
          return (
            <div
              key={selectedValue.value}
              className="flex items-center bg-primary-light bg-background text-black px-2 py-1 m-1 rounded-md"
            >
              <span className="mr-1">{optionLabel}</span>
              <button
                className="text-textLight hover:text-gray-200 mx-2"
                onClick={(e) => {
                  e.stopPropagation();
                  removeSelection(selectedValue);
                }}
              >
                ✕
              </button>
            </div>
          );
        })}
        {selectedValues.length === 0 && <span className="text-[#9CA3AF]">{label}</span>}
      </div>
      {isOpen && (
        <ul
          className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 h-[200px] overflow-auto"
        >
          {options?.map((option) => (
            <li
              key={option.value}
              className="flex justify-between items-center px-4 py-2 hover:bg-[rgba(8,77,120,0.1)] cursor-pointer text-black"
              onClick={() => toggleSelection(option)}
            >
              <span>{option.label}</span>
              {selectedValues.find(item => item.value === option.value) && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
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
       <DropDownArrow isOpen={isOpen} handleArrow={handleOpen} />
      {error && <p className={`text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>{helperText}</p>}
    </div>
  );
};

export default MultipleSelect;
