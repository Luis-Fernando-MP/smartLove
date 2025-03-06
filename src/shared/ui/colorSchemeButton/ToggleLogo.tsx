'use client'

import { sansitaSwashed } from '@/shared/fonts'
import type { JSX } from 'react'

interface IToggleLogo {
  className?: string
}

const ToggleLogo = ({ className = 'logo' }: IToggleLogo): JSX.Element => {
  console.log('ToggleLogo', className)
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
