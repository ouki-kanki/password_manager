import React, { useEffect, useState } from 'react'
import { useDebounce } from '@renderer/hooks/useDebounce'
import './dashboard.scss'

import { ApplicationList } from '@renderer/components/ApplicationList/ApplicationList'
import Versions from '../../components/Versions'
import { ControlPanel } from '@renderer/components/ControlPanel/ControlPanel'

import { Button, Select, Space, Input, Collapse, Divider } from 'antd'
import type { ApplicationData } from 'src/types'

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
    const getData = (): void => {
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

  // console.log(applications)

  const handleApplicationNameChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('inside the name', value)
    setApplicationName(value)
  }

  const handleUsernameChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('isnide the username', value)
    setUserName(value)
  }

  const handleEmailChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('isndie the email', value)
    setEmail(value)
  }

  const handleClearFilters = (): void => {
    setApplicationName('')
    setEmail('')
    setUserName('')
  }

  return (
    <div className="dashboard-container">
      <Divider orientation="left">Pass Man</Divider>
      <Collapse
        items={[
          {
            key: '1',
            label: 'controls',
            children: (
              <>
                <Button type="primary" onClick={getApplications}>
                  get Applications test
                </Button>

                <button onClick={() => window.api.getApplicationsAndRelatedData({ name })}>
                  get Applications and related
                </button>

                <button onClick={() => window.api.getApplicationsAndRelatedData({ name })}>
                  get Applications and related all with name
                </button>

                <div className="dashboard__actions-container">
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
              </>
            )
          }
        ]}
      />

      <ControlPanel
        applicationName={applicationName}
        username={username}
        email={email}
        handleApplicationName={handleApplicationNameChange}
        handleEmail={handleEmailChange}
        handleUsername={handleUsernameChange}
        onClearAll={handleClearFilters}
      />
      <ApplicationList data={applications} />

      <Versions></Versions>
    </div>
  )
}
