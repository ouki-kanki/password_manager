import React, { useEffect, useState } from 'react';
import { useDebounce } from '@renderer/hooks/useDebounce';
import './dashboard.scss';

import { ApplicationList } from '@renderer/components/ApplicationList/ApplicationList';
import Versions from '../../components/Versions'
import { ControlPanel } from '@renderer/components/ControlPanel/ControlPanel';

import { Button, Select, Space, Input } from 'antd'
import type { ApplicationData } from 'src/types';

interface IDashProps {
  getApplications: () => void
  ipcHandle: () => void
}



export const Dashboard = ({ getApplications, ipcHandle }: IDashProps): JSX.Element => {
  const [applications, setApplications] = useState<Array<ApplicationData>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [applicationName, setApplicationName] = useState('')
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  
  const debouncedName = useDebounce(applicationName)
  const debouncedUsername = useDebounce(username)
  const debouncedEmail = useDebounce(email)

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
    
    getData()
  }, [debouncedName, debouncedEmail, debouncedUsername])
  
  console.log("the applications", applications)
  
  const handleApplicationNameChange = ({ target: { value }}:React.ChangeEvent<HTMLInputElement>): void => {
    console.log("inside the name", value)
    setApplicationName(value)
  }

  const handleUsernameChange = ({ target: { value }}:React.ChangeEvent<HTMLInputElement>): void => {
    console.log("isnide the username", value)
    setUserName(value)
  }
   
  const handleEmailChange = ({ target: { value }}:React.ChangeEvent<HTMLInputElement>): void => {
    console.log("isndie the email", value)
    setEmail(value)
  }

  const handleClearFilters = (): void => {
    setApplicationName('')
    setEmail('')
    setUserName('')
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

      <ControlPanel
        applicationName={applicationName}
        username={username}
        email={email}
        handleApplicationName={handleApplicationNameChange}
        handleEmail={handleEmailChange}
        handleUsername={handleUsernameChange}
        onClearAll={handleClearFilters}
      />
      <ApplicationList data={applications}/>

      <Versions></Versions>
    </div>
  )
}
