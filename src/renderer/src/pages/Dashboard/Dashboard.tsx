import React, { useEffect, useState } from 'react';
import './dashboard.scss';
import { ApplicationList } from '@renderer/components/ApplicationList/ApplicationList';
import Versions from '../../components/Versions'

import { Button, Select, Space, Input } from 'antd'
import type { ApplicationData } from 'src/types';
import { useDebounce } from '@renderer/hooks/useDebounce';

interface IDashProps {
  getApplications: () => void
  ipcHandle: () => void
}



export const Dashboard = ({ getApplications, ipcHandle }: IDashProps): JSX.Element => {
  const [applications, setApplications] = useState<Array<ApplicationData>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  
  const debouncedName = useDebounce(name)
  const debouncedUsername = useDebounce(username)
  const debouncedEmail = useDebounce(email)

  // console.log("the debounced value", debouncedName)


  useEffect(() => {
    const getData = async () => {
      const data = window.api.getApplicationsAndRelatedData({
        name: debouncedName,
        email: debouncedEmail,
        username: debouncedUsername
      })

      if (data) {
        setApplications(data)
      }
    }
    console.log("the applications", applications)

    getData()
  }, [debouncedName, debouncedEmail, debouncedUsername])

  const handleGetData = (name?: string, username?: string, email?: string) => {
    // const data 
  }


  return (
    <div className="dashboard-container">
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <div className="dashboard__actions-container">
        <Button type="primary" onClick={getApplications}>
          get Applications test
        </Button>

        <button onClick={() => window.api.getApplicationsAndRelatedData({ name })}>
          get Applications and related
        </button>

        <button onClick={() => window.api.getApplicationsAndRelatedData({ name })}>
          get Applications and related all with name 
        </button>

        <Space.Compact>
          <Input 
            style={{width: '20%' }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
        </Space.Compact>

        <button onClick={() => window.api.getApplicationsAndRelatedData({ name: 'sqlite', email: 'foo@bar.com' })}>
          get Applications and related with args
        </button>

        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
      </div>

      <ApplicationList data={applications}/>

      <Versions></Versions>
    </div>
  )
}
