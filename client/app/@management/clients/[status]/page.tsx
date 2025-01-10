import React from 'react'

const Page = async({ status} : { status : string}) => {
  return (
    <div>
      <h1 className='mb-8 text-black'>{status} Clients Home Page</h1>
    </div>
  )
}

export default Page