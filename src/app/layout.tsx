import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { ViewTransitions } from 'next-view-transitions'
import NextTopLoader from 'nextjs-toploader'
import TanStackProvider from 'providers/TanStackProvider'
import type { JSX, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { robotoFlex } from 'shared/fonts'

import './globals.css'
import './layout.scss'

export const metadata: Metadata = {
  title: 'SmartPro',
  description: 'Sistema de gestión de reservas para la empresa de hotel "Smart Love"',
  icons: '/logoV3.svg'
}

interface TRootLayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

function RootLayout({ children }: TRootLayout): JSX.Element {
  return (
    <ClerkProvider>
      <ViewTransitions>
        <html lang='es'>
          <body className={robotoFlex.className}>
            <NextTopLoader zIndex={100} height={5} color='var(--tn-primary)' />
            <TanStackProvider>{children}</TanStackProvider>
            <Toaster
              position='top-center'
              reverseOrder={false}
              toastOptions={{
                className: 'toast',
                style: { background: 'var(--bg-primary)', color: 'var(--fnt-primary)' }
              }}
            />
          </body>
        </html>
      </ViewTransitions>
    </ClerkProvider>
  )
}

export default RootLayout
