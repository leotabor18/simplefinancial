import Image from 'next/image'
import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='mt-16 flex flex-col gap-y-6 items-center w-full'>
      <Image src={'/images/not-found.svg'} alt="In Progress SVG" width={448.14} height={448.53} />
    </div>
  )
}

export default NotFoundPage