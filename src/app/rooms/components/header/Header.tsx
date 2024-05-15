import Link from 'next/link'
import type { JSX } from 'react'
import { HOME_PATHS } from 'shared/constants'
import { mada, yesevaOne } from 'shared/fonts'

import './style.scss'

const Header = (): JSX.Element => {
  return (
    <header className='header'>
      <Link href={HOME_PATHS[0].link} className='header-brand'>
        <h2 className={yesevaOne.className}>Smart Pro</h2>
        <span className={mada.className}>Hotel sauna rooftop bar</span>
      </Link>
      <article className='header-account'>
        <button className='btn'>Regístrate</button>
        <button className='btn'>Ingresar</button>
      </article>
    </header>
  )
}

export default Header
