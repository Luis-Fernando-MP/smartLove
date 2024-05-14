'use client'

import { Menu } from 'lucide-react'
import { type JSX } from 'react'
import useNav from 'shared/hooks/_useNav'

import './style.scss'
import './userMobile.scss'

const Nav = (): JSX.Element => {
  const { toggleShow, getClass } = useNav()

  return (
    <nav className={`dashboard-nav ${getClass()}`}>
      <button className='roomNav-static-menu' onClick={toggleShow}>
        <Menu />
      </button>
      <h1>Mis reservas</h1>
      <button className='dashboard-menu' onClick={toggleShow}>
        <Menu stroke='#fff' />
      </button>
    </nav>
  )
}

export default Nav
