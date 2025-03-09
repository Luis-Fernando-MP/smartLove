'use client'

import type { JSX } from 'react'

interface IToggleLogo {
  className?: string
}

const ToggleLogo = ({ className = 'logo' }: IToggleLogo): JSX.Element => {
  return (
    <div className={`${className} font3 logo-container h-fit`}>
      <h3 className='font3'>Smart</h3>
      <h2 className='gr font3'>PRO</h2>
    </div>
  )
}

export default ToggleLogo
