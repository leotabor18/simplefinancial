import { ButtonLinkProps } from '@/app/util/interfaces'
import React from 'react'

const ButtonLink: React.FC<ButtonLinkProps> = ({ handleClick, label, containerStyle }) => {
  return (
    <div className={`flex items-center gap-2 my-5 ${containerStyle}`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6 font-semibold text-primary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      <p 
        onClick={handleClick} 
        className="text-primary underline cursor-pointer"
      >
        {label}
      </p>
    </div>
  )
}

export default ButtonLink