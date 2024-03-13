import { Outlet, useOutletContext } from 'react-router-dom'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd'

import './settingsLayout.scss'


type ContextType = {
  foo: string
}

export const SettingsLayout = (): JSX.Element => {
  const navigate = useNavigate()

  const handleBack = (): void => {
    navigate('/settings')
  }

  return (
    <div className='settings-layout__container'>
      <h2>Settings</h2>
      <Button 
        type='link'
        onClick={handleBack}
        >
          back
        {/* <Link 
          to='../'
          relative='path'
          >Back</Link> */}
      </Button>
      <nav>
        <NavLink
          to='.'
          className={({ isActive }) => isActive ? 'settings-navlink__active' : ''}
          end
          >home</NavLink>
        <NavLink
          to='advanced'
          className={({ isActive }) => isActive ? 'settings-navlink__active' : ''}
          >advanced</NavLink>
        <NavLink
          className={({ isActive }) => isActive ? 'settings-navlink__active' : ''}
          to='security'
          >security</NavLink>
        <NavLink
          className={({ isActive }) => isActive ? 'settings-navlink__active' : ''}
          to='ui'
        >ui</NavLink>
      </nav>
      <Outlet context={{ foo: "yoyo"} satisfies ContextType}/>   
    </div>
  )
}


export function useFoo(): ContextType {
  return useOutletContext<ContextType>()
}