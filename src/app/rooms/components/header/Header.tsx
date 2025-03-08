import { HOME_PATHS } from '@/shared/constants'
import ToggleLogo from '@/shared/ui/ColorSchemeButton/ToggleLogo'
import AuthButtons from '@/shared/ui/authButtons/AuthButtons'
import { Link } from 'next-view-transitions'
import type { JSX } from 'react'

import './style.scss'

const Header = (): JSX.Element => {
  return (
    <header className='header'>
      <Link href={HOME_PATHS.Resume.link} className='header-brand'>
        <ToggleLogo />
      </Link>
      <article className='header-account'>
        <AuthButtons />
      </article>
    </header>
  )
}

export default Header
