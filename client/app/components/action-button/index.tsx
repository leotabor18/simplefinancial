import { ActionButtonProps } from '@/app/util/interfaces'
import React from 'react'
import Spinner from '../spinner'

const ActionButton: React.FC<ActionButtonProps> = (props) => {
  return (
    <button
      type={props.type}
      className={`text-white bg-primary hover:bg-primary-800 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ${props.buttonStyle}`}
    >
      <Spinner isLoading={props.isLoading}/>
      {props.label}
    </button>
  )
}

export default ActionButton