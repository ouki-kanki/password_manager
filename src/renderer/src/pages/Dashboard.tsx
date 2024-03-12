import Versions from '../components/Versions'
import { Button } from 'antd'

interface IDashProps {
  getApplications: () => void;
  ipcHandle: () => void;
}


export const Dashboard = ({ getApplications, ipcHandle }: IDashProps ): JSX.Element => {
  return (
    <div className='nav_and_dash__container'>
    <div className="text">
      Build an Electron app with <span className="react">React</span>
      &nbsp;and <span className="ts">TypeScript</span>
    </div>
    <Button
      type='primary'
      onClick={getApplications}
      >get Applications test</Button>
    <button onClick={() => window.api.getApplicationsAndRelatedData()}>get Applications and related</button>
    <button onClick={() => window.api.testCrypto('james')}>test crypto</button>

    <div className="actions">
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
    <Versions></Versions>
  </div>
  )
}
