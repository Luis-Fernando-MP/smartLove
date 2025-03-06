import { HOME_PATHS } from '@/shared/constants'
import AuthButtons from '@/shared/ui/authButtons/AuthButtons'
import ToggleLogo from '@/shared/ui/colorSchemeButton/ToggleLogo'
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
