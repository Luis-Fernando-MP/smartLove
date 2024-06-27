'use client'

import type { JSX, ReactNode } from 'react'
import { sansitaSwashed } from 'shared/fonts'

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
