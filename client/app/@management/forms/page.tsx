import InProgressContent from '@/app/components/in-progress'
import Tile from '@/app/components/tile'
import React from 'react'

const Forms = () => {
  return (
    <div className='flex items-start gap-x-10'>
      <Tile title='Submitted Forms' url='/forms/submitted'/>
      <Tile title='My Forms' url='/forms/my-forms'/>
      <Tile title='Add New Form' url='/forms/create'/>
    </div>
  )
}

export default Forms