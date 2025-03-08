'use client'

import { HOME_PATHS } from '@/shared/constants'
import { switchClass } from '@/shared/helpers/switchClassName'
import ToggleLogo from '@/shared/ui/ColorSchemeButton/ToggleLogo'
import AuthButtons from '@/shared/ui/authButtons/AuthButtons'
import { Menu } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { usePathname, useRouter } from 'next/navigation'
import { type JSX, useEffect, useState } from 'react'

import './style.scss'
import './userMobile.scss'

const Nav = (): JSX.Element => {
  const [show, setShow] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    router.prefetch(HOME_PATHS.Rooms.link)
  }, [router])

  const handleShowMenu = (): void => {
    setShow(!show)
  }

  return (
    <>
      <button className='landingNav-menu' onClick={handleShowMenu}>
        <Menu stroke='#fff' />
      </button>
      <nav className={`landingNav ${switchClass(show, 'show-menu')}`}>
        <Link href={HOME_PATHS.Resume.link} className='landingNav-brand'>
          <ToggleLogo />
        </Link>
        <ul className='landingNav-paths'>
          {Object.values(HOME_PATHS).map(path => {
            const { name, link, Icon } = path
            const isActive = switchClass(pathname === link)
            return (
              <li key={name}>
                <Link href={link} className={`btn landingNav-link ${isActive}`}>
                  <Icon />
                  <p>{name}</p>
                </Link>
              </li>
            )
          })}
        </ul>
        <article className='landingNav-account'>
          <AuthButtons />
        </article>
      </nav>
    </>
  )
}

export default Nav
