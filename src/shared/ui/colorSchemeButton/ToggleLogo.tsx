'use client'

import type { JSX, ReactNode } from 'react'
import LogoV2 from 'shared/assets/logoV2'
import LogoV2Blue from 'shared/assets/logoV2-blue'

import useStoreTheme from './useStoreTheme'

interface IToggleLogo {
  className?: string
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const ToggleLogo = ({ className = 'logo' }: IToggleLogo): JSX.Element => {
  const theme = useStoreTheme(store => store.theme)
  if (theme === 'dark') return <LogoV2 className={className} />
  return <LogoV2Blue className={className} />
}

export default ToggleLogo
