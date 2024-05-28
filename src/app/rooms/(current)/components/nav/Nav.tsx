'use client'

import NavContainer from 'app/rooms/components/navContainer/NavContainer'
import useNav from 'hooks/useNav'
import { CircleHelp } from 'lucide-react'
import Link from 'next/link'
import { type JSX } from 'react'
import { DASHBOARD_PATHS, HOME_PATHS, WHATSAPP_URL } from 'shared/constants'
import { whisper } from 'shared/fonts'
import Social from 'shared/ui/social/Social'

import Filters from '../filters/Filters'
import './style.scss'

const Nav = (): JSX.Element => {
  const { pathname } = useNav()

  return (
    <NavContainer className='roomsNav'>
      <details className='roomNav-details' name='paths' open>
        <summary className='roomNav-summary'>Dashboard</summary>
        {DASHBOARD_PATHS.map(path => {
          const { name, link, Icon } = path
          let isActive = pathname === link ? 'active' : ''
          if (link === '/') isActive = 'active'
          return (
            <Link
              key={name}
              href={`/rooms/${link}`}
              className={`roomNav-summary__path btn ${isActive}`}
            >
              <Icon />
              <p>{name}</p>
            </Link>
          )
        })}
      </details>
      <details className='roomNav-details' name='paths'>
        <summary className='roomNav-summary'>Home</summary>
        {Object.values(HOME_PATHS).map(path => {
          const { name, link, Icon } = path
          const isActive = pathname === link ? 'active' : ''
          return (
            <Link key={name} href={link} className={`roomNav-summary__path btn ${isActive}`}>
              <Icon />
              <p>{name}</p>
            </Link>
          )
        })}
      </details>
      <Filters />
      <section className='roomNav-consulting'>
        <Link
          href={WHATSAPP_URL}
          target='_blank'
          rel='noreferrer'
          className='roomNav-consulting__go'
        >
          <CircleHelp />
          Consultar
        </Link>
        <div className='roomNav-consulting__social'>
          <Social />
          <h3 className={whisper.className}>Smart Love</h3>
        </div>
      </section>
    </NavContainer>
  )
}

export default Nav
