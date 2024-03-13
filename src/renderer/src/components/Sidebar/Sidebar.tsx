import './sidebar.scss'
import { Link, NavLink } from 'react-router-dom';


interface ISidebarProps  {
  isSidebarVisible: boolean;
}

export const Sidebar = ({ isSidebarVisible }: ISidebarProps): JSX.Element => {
  return (
    <div className={`sidebar__container${!isSidebarVisible ? "-hidden" : ""}`}>
      <div className="__title">
        <Link to='/'>Pass Man</Link>
      </div>
      <nav>
        <li className=''>
          <NavLink 
            to='.'
            className={({ isActive }) => isActive ? 'sidebar__container__link-active' : ''}
            >Home</NavLink>
        </li>
        <li>
          <NavLink 
            to='insert'
            end // if there is nested route it will end the matching here
            className={({ isActive }) => isActive ? 'sidebar__container__link-active' : ''}
            >New</NavLink>
        </li>
        <li>
          <NavLink
           to='settings'
           className={({ isActive }) => isActive ? 'sidebar__container__link-active' : ''}
          >Settings</NavLink>
        </li>
        <li>boing</li>
      </nav>
    </div>
  )
}
