'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { type JSX, useState } from 'react'
import { HOME_PATHS } from 'shared/constants'
import { mada, yesevaOne } from 'shared/fonts'
import ColorSchemeButton from 'shared/ui/colorSchemeButton/ColorSchemeButton'

import './style.scss'
import './userMobile.scss'

const Nav = (): JSX.Element => {
  const [show, setShow] = useState(false)
  const pathname = usePathname()

  const router = useRouter()
  router.prefetch(HOME_PATHS.Rooms.link)

  const handleShowMenu = (): void => {
    setShow(!show)
  }

  const handleNavigate = (path: string) => {
    if (typeof window === 'undefined') return
    setShow(!show)
    router.push(path)
    if (path === HOME_PATHS.Rooms.link) return
    const targetElement = document.querySelector('section.main-content')
    console.log(targetElement)

    if (targetElement && targetElement instanceof HTMLElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <button className='landingNav-menu' onClick={handleShowMenu}>
        <Menu stroke='#fff' />
      </button>
      <nav className={`landingNav ${show ? 'show-menu' : ''}`}>
        <Link href={HOME_PATHS.Resume.link} className='landingNav-brand'>
          <h2 className={yesevaOne.className}>Smart Pro</h2>
          <span className={mada.className}>Hotel sauna rooftop bar</span>
        </Link>
        <ul className='landingNav-paths'>
          {Object.values(HOME_PATHS).map(path => {
            const { name, link, Icon } = path
            const isActive = pathname === link ? 'active' : ''
            return (
              <li key={name}>
                <button
                  className={`btn landingNav-link ${isActive}`}
                  onClick={() => handleNavigate(link)}
                >
                  <Icon />
                  <p>{name}</p>
                </button>
              </li>
            )
          })}
        </ul>
        <article className='landingNav-account'>
          <ColorSchemeButton />
          <button className='btn'>Regístrate</button>
          <button className='btn'>Ingresar</button>
        </article>
      </nav>
    </>
  )
}

export default Nav
