import useNav from 'hooks/useNav'
import { Menu, PanelLeftClose } from 'lucide-react'
import { type JSX, type ReactNode } from 'react'

import './style.scss'

interface INavContainer {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  className: string
}

const NavContainer = ({ children, className }: INavContainer): JSX.Element => {
  const { toggleShow, getClass } = useNav()

  return (
    <nav className={`dashboard-nav ${getClass()} ${className}`}>
      <section className='dashboard-nav__container'>
        <button className='dashboard-nav-static-menu' onClick={toggleShow}>
          <span className='btn'>
            <PanelLeftClose />
          </span>
        </button>
        {children}
        <button className='dashboard-menu' onClick={toggleShow}>
          <Menu stroke='#fff' />
        </button>
      </section>
    </nav>
  )
}

export default NavContainer
