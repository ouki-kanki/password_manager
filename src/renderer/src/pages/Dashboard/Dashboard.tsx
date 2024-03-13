import { useEffect, useState } from 'react';
import { Button } from 'antd'
import './dashboard.scss';
import { ApplicationList } from '@renderer/components/ApplicationList/ApplicationList';
import Versions from '../../components/Versions'

interface IDashProps {
  getApplications: () => void
  ipcHandle: () => void
}

export const Dashboard = ({ getApplications, ipcHandle }: IDashProps): JSX.Element => {
  const [applications, setApplications] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  

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

        <button onClick={() => window.api.getApplicationsAndRelatedData()}>
          get Applications and related all
        </button>

        <button onClick={() => window.api.getApplicationsAndRelatedData({ name: 'sqlite', email: 'foo@bar.com' })}>
          get Applications and related with args
        </button>
        <button onClick={() => window.api.testCrypto('james')}>test crypto</button>

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

      <ApplicationList/>

      <Versions></Versions>
    </div>
  )
}
