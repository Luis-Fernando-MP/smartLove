'use client'

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
        <html lang='es'>{children}</html>
        <SpeedInsights />
      </ViewTransitions>
    </ClerkProvider>
  )
}

export default Providers
