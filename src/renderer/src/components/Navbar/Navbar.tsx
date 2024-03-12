import './navbar.scss'

interface INavbarProps {
  handleSidebarVisibility: () => void
}

export const Navbar = ({ handleSidebarVisibility }: INavbarProps): JSX.Element => {
  return (
    <div>
      <button onClick={handleSidebarVisibility}>close side</button>

    </div>
  )
}
