import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import type { IInsertData } from '../../types'
import './app.scss'

import { Button } from 'antd'

import { InsertForm } from './components/InsertForm/InsertForm'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const getApplications = (): void => {
    window.api.getApplications()
  }

  const hadnleInsertApplicationData = (data: IInsertData): void => {
    window.api.insertApplication(data)
  }

  return (
    <div>
      <div className="sidebar">sidebar</div>
      <div className='nav_and_dash'>
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
        <InsertForm
          handleInsertApplicationData={hadnleInsertApplicationData}
        />
        <p className="tip">
          Please try pressing <code>F12</code> to open the devTool
        </p>
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
    </div>
  )
}

export default App
