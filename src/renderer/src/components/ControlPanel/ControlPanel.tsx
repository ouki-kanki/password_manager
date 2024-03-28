import React from 'react'
import './controlpanel.scss'

import { Input, Space } from 'antd'

const getFormData = (applicationName, username, email, handleApplicationName, handleUsername, handleEmail ): {
  title: string;
  id: string;
  name: string;
  onChange: React.ChangeEvent<HTMLInputElement>
}[] => ([
  {
    title: 'Application Name',
    name: applicationName,
    id: 'application-name',
    onChange: handleApplicationName 
  },
  {
    title: 'User Name',
    name: username,
    id: 'user-name',
    onChange: handleUsername 
  },
  {
    title: 'Email',
    name: email,
    id: 'email',
    onChange: handleEmail 
  },
])

interface ControlPanelProps {
  applicationName: string;
  username: string;
  email: string;
  handleApplicationName: React.ChangeEventHandler<HTMLInputElement>;
  handleUsername: React.ChangeEventHandler<HTMLInputElement>;
  handleEmail: React.ChangeEventHandler<HTMLInputElement>;
  onClearAll: () => void
}


export const ControlPanel = ({ applicationName, email, username, handleApplicationName, handleEmail, handleUsername, onClearAll }: ControlPanelProps): JSX.Element => {

  return (
    <div className='control-panel'>
      <h2>Controls</h2>
      <form className="control-panel__controls-container">

        {getFormData(applicationName, username, email, handleApplicationName, handleUsername, handleEmail).map((data) => (
          <div className="control-panel__formField" key={data.id}>
            <label htmlFor={data.id}>{data.title}</label>
            <Space.Compact>
              <Input
                onChange={data.onChange}
                value={data.name}
              />
            </Space.Compact>
          </div>
        ))} 
      </form>
      <button 
        style={{ backgroundColor: 'tomato' }}
        onClick={onClearAll}
        >clear</button>
    </div>

  )
}
