import './sidebar.scss'
import { LeftOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';


interface ISidebarProps  {
  isSidebarVisible: boolean;
  handleSideBarVisibility: () => void;
}

export const Sidebar = ({ isSidebarVisible, handleSideBarVisibility }: ISidebarProps): JSX.Element => {
  const isVisible = isSidebarVisible ? { display: 'block' } : { display: 'none' }

  return (
    <div className={`sidebar__container${!isSidebarVisible ? "-hidden" : ""}`}>
      <div className="__title" style={isVisible}>
        <Link to='/'>Pass Man</Link>
      </div>
      <nav style={isVisible}>
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
      </nav>
      <div
        onClick={handleSideBarVisibility} 
        className='sidebar__btn-close'>
      <LeftOutlined />
      </div>
    </div>
  )
}
