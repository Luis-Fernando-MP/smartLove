'use client'

import { Menu } from 'lucide-react'
import { type JSX } from 'react'
import useNav from 'shared/hooks/_useNav'

import { paths } from './paths'
import './style.scss'
import './userMobile.scss'

const Nav = (): JSX.Element => {
  const { toggleShow, pathname, getClass } = useNav()

  return (
    <nav className={`dashboard-nav ${getClass()}`}>
      <button className='roomNav-static-menu' onClick={toggleShow}>
        <Menu />
      </button>
      <ul className='roomNav-paths'>
        {paths.map(path => {
          const { name, link, Icon } = path
          const isActive = pathname === link ? 'active' : ''
          return (
            <li key={name}>
              <button className={`btn roomNav-link ${isActive}`}>
                <Icon />
                <p>{name}</p>
              </button>
            </li>
          )
        })}
      </ul>
      <article className='room-filter'>
        <h3>Filtros</h3>
        <button className='btn'>mas que</button>
        <button className='btn'>menos que</button>
      </article>
      <button className='dashboard-menu' onClick={toggleShow}>
        <Menu stroke='#fff' />
      </button>
    </nav>
  )
}

export default Nav
