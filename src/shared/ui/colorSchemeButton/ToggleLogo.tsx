'use client'

import type { JSX, ReactNode } from 'react'
import Logo from 'shared/assets/logo'
import LogoV2 from 'shared/assets/logoV2'
import LogoV2Blue from 'shared/assets/logoV2-blue'
import LogoV3 from 'shared/assets/logoV3'
import { sansitaSwashed } from 'shared/fonts'

import useStoreTheme from './useStoreTheme'

interface IToggleLogo {
  className?: string
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const ToggleLogo = ({ className = 'logo' }: IToggleLogo): JSX.Element => {
  // const theme = useStoreTheme(store => store.theme)
  // if (theme === 'dark') return <Logo className={className} />
  return (
    <div className={`${sansitaSwashed.className} logo-container`}>
      <h4>Smart</h4>
      <h2 className='gr'>PRO</h2>
    </div>
  )
}

export default ToggleLogo
