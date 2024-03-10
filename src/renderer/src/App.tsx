import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import type { IInsertData } from '../../types'

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
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <button onClick={getApplications}>get Applications test</button>
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
    </>
  )
}

export default App
