import { useRef } from 'react'
import './applicationList.scss'
import { Link, useSearchParams } from 'react-router-dom'
import { Button, Col, Divider } from 'antd'
import { searchParamCreator } from '@renderer/utils/searchParamCreator'
import type { ApplicationData } from 'src/types'
import { ScissorOutlined } from '@ant-design/icons'

import { Space, Table, TableProps, Input } from 'antd'


interface TableData extends ApplicationData {
  key: React.Key
}


interface ApplicationListProps {
  data: ApplicationData[]
}

const {Column } = Table

export const ApplicationList = ({ data }: ApplicationListProps): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams()
  const tableData: TableData[] = data.map((item, id) => ({ ...item, key: id }))

  const handleCopyToClip = (value: string): void => {
    navigator.clipboard.writeText(value)
  }

  return (
    <div className='application_list-container'>
      <div className="application_list__filter-container">
        {/* <Button
         type='primary'
        >
          <Link to={`${searchParamCreator('username', 'tom', searchParams)}`}>filter tom</Link>
        </Button> */}
      </div>
      <Table
        // title={() => <div>Applications</div>} 
        dataSource={tableData}
        // scroll={{y: 200 }}
        pagination={{pageSize: 5}}
        >
        <Column title='Application Name' showSorterTooltip dataIndex="name" key="name"/>
        <Column title='User Name' showSorterTooltip dataIndex="username" key="username"/>
        <Column title='Email' showSorterTooltip dataIndex="email" key="email"/>
        <Column 
          className='application_list-password' 
          title='Password' 
          showSorterTooltip 
          dataIndex="password"
          render={(_: any, record: ApplicationData) => (
            <div className='application_list-password-action'>
            <Input.Password
              type='password'
              value={record.password}
            />
            <Button
              onClick={() => handleCopyToClip(record.password)}
            >
              <ScissorOutlined />
            </Button>
          </div>
          )}
          key="password"
          />
      </Table>
    </div>
  )
}
