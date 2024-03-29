import { useState } from 'react'
import type { IInsertData } from '../../types'
import './app.scss'
import { Routes, Route } from 'react-router-dom'
import { useGetPath } from './hooks/useGetPath'

import { Sidebar } from './components/Sidebar/Sidebar'
import { InsertForm } from './components/InsertForm/InsertForm'
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Home } from './pages/Home/Home';

import { SettingsLayout } from './components/Layouts/SettingsLayout/SettingsLayout';
import { Settings } from './pages/Settings/Settings';
import { Advanced } from './pages/Settings/Advanced/Advanced';
import { Security } from './pages/Settings/Security/Security';
import { Ui } from './pages/Settings/Ui/Ui';


function App(): JSX.Element {
  useGetPath((location) => console.log(location.pathname))
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
      <Sidebar
        handleSideBarVisibility={handleSideBarVisibility} 
        isSidebarVisible={isSidebarVisible}/>
      <Routes>
        <Route path='/' element={<Home handleSidebarVisibility={handleSideBarVisibility}/>}>
          <Route index element={<Dashboard getApplications={getApplications} ipcHandle={ipcHandle}/>}/>
          <Route path='insert' element={<InsertForm handleInsertApplicationData={hadnleInsertApplicationData}/>}/>
          <Route path='settings' element={<SettingsLayout/>}>
            <Route index element={<Settings/>}/>
            <Route path='advanced' element={<Advanced/>}/>
            <Route path='security' element={<Security/>}/>
            <Route path='ui' element={<Ui/>}/>
            <Route path='ui/:id' element={<Ui/>}/>
          </Route>
        </Route>
      </Routes>
    </div> 
  )
}

export default App
