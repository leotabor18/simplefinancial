import { ButtonIconProps } from '@/app/util/interfaces';
import React from 'react'

const ButtonIcon: React.FC<ButtonIconProps> = (props) => {
  const { name, icon, onClick } = props;

  return (
    <button 
      type="button" 
      onClick={onClick} 
      className="text-white bg-primary hover:bg-primary-800 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary"
    >
      {name}
      {
        icon ?
        <></>
      :  
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6 ml-2 font-semibold">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      }
    </button>
  )
}

export default ButtonIcon