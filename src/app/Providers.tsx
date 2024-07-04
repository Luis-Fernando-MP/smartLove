'use client'

import { ClerkProvider } from '@clerk/nextjs'
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
      </ViewTransitions>
    </ClerkProvider>
  )
}

export default Providers
