import React from 'react'
import './home.scss'

import { Navbar } from '@renderer/components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

interface IHomeProps {
  handleSidebarVisibility: () => void
}

export const Home = ({ handleSidebarVisibility }: IHomeProps): JSX.Element => {
  return (
    <div className='home__container'>
      <Navbar handleSidebarVisibility={handleSidebarVisibility}/>
      <section className='home__section'>
        <Outlet/>
      </section>
    </div>
  )
}
