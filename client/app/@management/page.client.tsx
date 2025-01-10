'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import ButtonIcon from '../components/button-icon'
import Table from '../components/client/table'
import Searchbar from '../components/search-bar'
import Title from '../components/title'
import { useQueryParameter } from '../hooks/useQueryParameter'
import { createHeadCells } from '../util'
import { ClientComponentProps, ClientData } from '../util/interfaces'

const headCells = [
  createHeadCells<ClientData>('id', 'Client Id', true, true),
  createHeadCells<ClientData>('name', 'Client Name', true, false),
  createHeadCells<ClientData>('company', 'Companies', true, false),
  createHeadCells<ClientData>('category', 'Subscriptions', true, false),
  createHeadCells<ClientData>('teamAssigned', 'Accountant Assigned', true, false),
  createHeadCells<ClientData>('status', 'Status', true, false),
]

const ClientComponent: React.FC<ClientComponentProps> = ({ data }) => {
  const {
    // page,
    // size,
    keyword,
    handleSearchInputChange
  } = useQueryParameter({
    initialQueryParams: { page: 1, size: 10, search: '', sortField: 'lastName' }
  });

  const router = useRouter()

  const handleSearch = (value: string) => {
    handleSearchInputChange(value);
  }

  const handleCreateClient = () => {
    router.push('/clients/create')
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <Title name={'Active Clients'} containerStyle='mb-8'/>
        <div className=' mb-8 flex items-center justify-center gap-4'>
          <Searchbar 
            placeHolder='Search client'
            onChange={handleSearchInputChange} 
            onClick={handleSearch} 
            initialInput={keyword}
          />
          <ButtonIcon name='Add Client' onClick={handleCreateClient}/>
        </div>
      </div>
      <Table
        columns={headCells} 
        data={data}
        name='Clients'
      />
    </>
  )
}

export default ClientComponent
