import { DropDownArrowProps } from '@/app/util/interfaces'
import React from 'react'

const DropDownArrow: React.FC<DropDownArrowProps> = ({ isOpen, handleArrow }) => {

  const onClick = () => {
    handleArrow();
  }

  return (
    <span className='absolute top-[52px] right-[16px] text-black cursor-pointer'  onClick={onClick}>
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
  )
}

export default DropDownArrow