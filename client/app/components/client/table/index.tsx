import { TableProps } from '@/app/util/interfaces'
import { Column } from '@/app/util/types'
import React from 'react'

const TableHead = <T extends object>({ columns }: {columns: Column<T>[]}) => {
  return (
    // <table className="w-full text-l text-left rtl:text-right text-black-500 dark:text-black-400 mb-6">
      <thead className="text-l text-black-700 bg-grayLight dark:bg-gray-700 dark:text-black-400 rounded-tl-lg rounded-tr-lg">
        <tr>
          {
            columns.map((column: Column<T>, indx: number) => (
              <th 
                key={indx} 
                scope="col" 
                className={`px-8 py-6 text-black-900 dark:text-black 
                  ${column.isHidden ? 'hidden': ''}
                  ${(indx === 1) ? 'rounded-l-xl': ''} 
                  ${indx === columns.length -1 ?'rounded-r-xl': ''}`}
              >
                {column.label}
              </th>
            ))
          }
        </tr>
      </thead>
    // </table>
  )
}


const Table = <T extends object>({ columns, data } : TableProps<T>) => {
  return (
    <div className="relative min-h-[500px] bg-white dark:bg-gray-800 rounded-lg">
      <table className="w-full text-l text-left rtl:text-right text-black-500 dark:text-black-400 ">
        <TableHead columns={columns}/> 
        <tbody>
          <tr className='h-6 bg-white border-none'>
            <td colSpan={columns.length} className='border-none'></td>
          </tr>
        </tbody>
        <tbody className='bg-transparent'>
          {
            data.length === 0 ?
              <tr>
                <td colSpan={columns.length} className='px-8 text-center py-6 font-medium text-black-900 whitespace-nowrap dark:text-black'>
                  No data available
                </td>
              </tr>
            : (
              data.map((row, rowIndex: number) => (
                <tr 
                  key={rowIndex} 
                  className="bg-transparent dark:bg-gray-800 hover:bg-primary/10 cursor-pointer">
                  {
                    columns.map((column, indx) => (
                      <td 
                        key={indx} 
                        scope="row" 
                        className={`px-8 py-5 font-medium text-black-900 whitespace-nowrap dark:text-black
                          ${column.isHidden ? 'hidden': ''}
                          ${(indx === 1) ? 'rounded-l-xl': ''} 
                          ${indx === columns.length -1 ?'rounded-r-xl': ''}
                          ${column.id}
                        `}
                      >{row[column.field] ? row[column.field] as React.ReactNode: '---'}</td>
                    ))
                  }
                </tr>
              ))
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table