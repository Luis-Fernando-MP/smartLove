'use client'

import NavContainer from '@/app/rooms/components/navContainer/NavContainer'
import useNav from '@/hooks/useNav'
import { DASHBOARD_PATHS, HOME_PATHS, WHATSAPP_URL } from '@/shared/constants'
import { mada, sansitaSwashed } from '@/shared/fonts'
import { switchClass } from '@/shared/helpers/switchClassName'
import Social from '@/shared/ui/social/Social'
import { CircleHelp, MessageCircleQuestion } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { type JSX } from 'react'

import Filters from '../filters/Filters'
import './style.scss'

const Nav = (): JSX.Element => {
  const { pathname } = useNav()

  return (
    <NavContainer className='roomsNav'>
      <details className='roomNav-details' name='paths' open>
        <summary className='roomNav-summary'>Dashboard</summary>
        <div className='roomNav-paths'>
          {DASHBOARD_PATHS.map(path => {
            const { name, link, Icon } = path
            let isActive = link === '/' ? 'active' : ''
            return (
              <Link key={name} href={`/rooms/${link}`} className={`roomNav-path btn ${isActive}`}>
                <Icon />
                <p>{name}</p>
              </Link>
            )
          })}
        </div>
      </details>
      <details className='roomNav-details' name='paths'>
        <summary className='roomNav-summary'>Inicio</summary>
        <div className='roomNav-paths'>
          {Object.values(HOME_PATHS).map(path => {
            const { name, link, Icon } = path
            const isActive = switchClass(pathname === link)
            return (
              <Link key={name} href={link} className={`roomNav-path btn ${isActive}`}>
                <Icon />
                <p>{name}</p>
              </Link>
            )
          })}
        </div>
      </details>
      <section className='roomNav-consulting'>
        <Link href={WHATSAPP_URL} target='_blank' rel='noreferrer' className='roomNav-consulting__go'>
          <MessageCircleQuestion />
          Charlemos 🚀
        </Link>
        <div className='roomNav-consulting__social'>
          <Social />
          <p className={sansitaSwashed.className}>Smart Love</p>
        </div>
      </section>
      <Filters />
    </NavContainer>
  )
}

export default Nav
