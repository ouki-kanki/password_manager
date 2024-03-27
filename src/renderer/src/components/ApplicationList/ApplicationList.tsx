import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from 'antd'
import { searchParamCreator } from '@renderer/utils/searchParamCreator'

import { Space, Table, Tag } from 'antd'

export const ApplicationList = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams()

  // console.log(searchParams)

  return (
    <div className='application_list-container'>
      <div className="application_list__filter-container">
        <Button
         type='primary'
        >
          <Link to={`${searchParamCreator('username', 'tom', searchParams)}`}>filter tom</Link>
        </Button>
      </div>
      <h2>Application List</h2>
    </div>
  )
}
