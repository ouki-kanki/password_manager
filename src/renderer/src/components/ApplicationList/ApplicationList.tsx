import { useRef, useState } from 'react'
import './applicationList.scss'
import { useSearchParams } from 'react-router-dom'
import { Button, Col, Divider } from 'antd'
import type { ApplicationData } from 'src/types'
import { ScissorOutlined, DeleteOutlined, SaveOutlined, ExperimentOutlined, WindowsFilled } from '@ant-design/icons'
import { copyToClip } from '@renderer/utils/copyToClip'

import { Table, Input, Tooltip, Switch, Space, Modal } from 'antd'

interface TableData extends ApplicationData {
  key: React.Key
}


interface ApplicationListProps {
  data: ApplicationData[];
  getData: () => void
}

const {Column } = Table

export const ApplicationList = ({ data, getData }: ApplicationListProps): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [openModal, setOpenModal] = useState(false)
  const [isInEdit, setIsInEdit] = useState(true)
  const tableData: TableData[] = data.map((item, id) => ({ ...item, key: id }))

  const generateRandomPass = (): void => {
    const pass = window.api.generateRandomPassword()
    console.log("the pass", pass)
  }

  const handleDelete = (id: string): void => {
    window.api.deleteApplication(id)
    getData()
  }

  // modal methods
  const showModal = (): void => {
    setOpenModal(true)
  }

  const handleOk = (id: string): void => {
    handleDelete(id)
    setOpenModal(false)
  }

  const handleCancel = (): void => {
    setOpenModal(false)
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
      <Space className='insert-form__controls-space'>
        <Switch
          checked={isInEdit}
          onChange={() => setIsInEdit(prev => !prev)}
          checkedChildren='edit'
          unCheckedChildren='view'
        />
      </Space>

      <Table
        // title={() => <div>Applications</div>}
        className='application-list__table'
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
            {!isInEdit && (
              <Button
                onClick={() => copyToClip(record.password)}
              >
                <ScissorOutlined />
              </Button >
            )

            }
            {isInEdit && (
              <Tooltip
                title='generate random pass'
                >
                <Button
                  onClick={generateRandomPass}
                >
                  <ExperimentOutlined />
                </Button>
              </Tooltip>
            )}
            {isInEdit && (
              <Tooltip
                title='save'
                className={`application-list-edit-tooltip${isInEdit ? '--show' : ''}`}
                >
                <Button
                  style={{backgroundColor: 'lightgreen'}}
                  onClick={generateRandomPass}
                >
                  <SaveOutlined />
                </Button>
              </Tooltip>

            )}
            {isInEdit && (
                <Tooltip title='delete-record' className='application-list-del-tooltip'>
                  <Button
                    style={{ backgroundColor: 'tomato' }}
                    onClick={showModal}
                  >
                    <DeleteOutlined />
                  </Button>
                </Tooltip>
            )}
            <Modal
              open={openModal}
              onOk={() => handleOk(record.id)}
              onCancel={handleCancel}
            >
              <p>Are you Sure you want to delete {record.name}?</p>
            </Modal>
          </div>
          )}
          key="password"
          />
      </Table>
    </div>
  )
}
