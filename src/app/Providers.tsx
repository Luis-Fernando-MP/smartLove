'use client'

import { IS_PRODUCTION } from '@/shared/constants'
import { ClerkProvider } from '@clerk/nextjs'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ViewTransitions } from 'next-view-transitions'
import type { JSX, ReactNode } from 'react'

interface IProviders {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const Providers = ({ children }: IProviders): JSX.Element => {
  return (
    <ClerkProvider>
      <ViewTransitions>
        {children}
        {IS_PRODUCTION && <SpeedInsights />}
      </ViewTransitions>
    </ClerkProvider>
  )
}

export default Providers
