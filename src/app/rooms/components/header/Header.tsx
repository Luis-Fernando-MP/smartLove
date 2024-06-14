import Link from 'next/link'
import type { JSX } from 'react'
import { HOME_PATHS } from 'shared/constants'
import ColorSchemeButton from 'shared/ui/colorSchemeButton/ColorSchemeButton'
import ToggleLogo from 'shared/ui/colorSchemeButton/ToggleLogo'

import './style.scss'

const Header = (): JSX.Element => {
  return (
    <header className='header'>
      <Link href={HOME_PATHS.Resume.link} className='header-brand'>
        <ToggleLogo />
      </Link>
      <article className='header-account'>
        <ColorSchemeButton />
        <button className='btn'>Regístrate</button>
        <button className='btn'>Ingresar</button>
      </article>
    </header>
  )
}

export default Header
