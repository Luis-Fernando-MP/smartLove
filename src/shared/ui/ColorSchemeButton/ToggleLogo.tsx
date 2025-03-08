'use client'

import { sansitaSwashed } from '@/shared/fonts'
import type { JSX } from 'react'

interface IToggleLogo {
  className?: string
}

const ToggleLogo = ({ className = 'logo' }: IToggleLogo): JSX.Element => {
  console.log('ToggleLogo', className)
  return (
    <div className={`${sansitaSwashed.className} logo-container`}>
      <h3 className='font3'>Smart</h3>
      <h2 className='gr font3'>PRO</h2>
    </div>
  )
}

export default ToggleLogo
