'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { JSX } from 'react'

import { paths } from './paths'
import './style.scss'
import './userMobile.scss'

const Nav = (): JSX.Element => {
  const pathname = usePathname()
  return (
    <nav className='landingNav'>
      {paths.map(path => {
        const { name, link, Icon } = path
        const isActive = pathname === link ? 'active' : ''
        console.log(link, '---', pathname)

        return (
          <Link
            href={link}
            key={name}
            className={`btn landingNav-link ${isActive}`}
          >
            <Icon />
            <p>{name}</p>
          </Link>
        )
      })}
    </nav>
  )
}

export default Nav
