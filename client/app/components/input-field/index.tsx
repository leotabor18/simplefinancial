'use client';

import { InputFieldProps } from '@/app/util/interfaces'
import React, { useState } from 'react'

const InputField: React.FC<InputFieldProps> = (props) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);
    props.onChange(e.target.value);
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  return (
    <div className={props.containerStyle}>
      <label htmlFor={props.id} className="block mb-2 text-base font-medium text-black dark:text-black">
        {props.label}
      </label>
      <input 
        type={props.type || 'text'}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`border h-[58px] text-black text-base rounded-lg block w-full p-2.5 
          ${props.error && (!isTouched || !props.value?.trim()) ?
            "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            :
            "bg-gray-50 border-gray focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary dark:focus:border-primary"}`
        }
        placeholder={props.placeHolder}
      />
      {
        props.error && (!isTouched || !props.value?.trim()) && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">{props.helperText}</p>
        )
      }
    </div>
  );
};

export default InputField