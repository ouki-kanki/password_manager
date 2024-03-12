import type { IInsertData } from '../../types'
import './app.scss'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react';

import { Sidebar } from './components/Sidebar/Sidebar'
import { InsertForm } from './components/InsertForm/InsertForm'
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home/Home';

function App(): JSX.Element {
  // TODO: set default behaviour from settings maybe with context or redux toolkit
  const [isSidebarVisible, setIsSidebarVisble] = useState(true)
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const getApplications = (): void => {
    window.api.getApplications()
  }

  const hadnleInsertApplicationData = (data: IInsertData): void => {
    window.api.insertApplication(data)
  }

  const handleSideBarVisibility = (): void => {
    setIsSidebarVisble((prev) => !prev)
  }

  return (
    <div className='app__container'>
      <Sidebar isSidebarVisible={isSidebarVisible}/>
      <Routes>
        <Route path='/' element={<Home handleSidebarVisibility={handleSideBarVisibility}/>}>
          <Route index element={<Dashboard getApplications={getApplications} ipcHandle={ipcHandle}/>}/>
          <Route path='insert' element={<InsertForm handleInsertApplicationData={hadnleInsertApplicationData}/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
