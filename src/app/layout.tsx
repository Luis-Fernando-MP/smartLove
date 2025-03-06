import TanStackProvider from '@/providers/TanStackProvider'
import { robotoFlex } from '@/shared/fonts'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import type { Metadata } from 'next'
import NextTopLoader from 'nextjs-toploader'
import type { JSX, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import Providers from './Providers'
import './globals.css'
import './layout.scss'

dayjs.extend(isBetween)

export const metadata: Metadata = {
  title: 'SmartPro',
  description: 'Sistema de gestión de reservas para la empresa de hotel "Smart Love"',
  icons: '/logoV3.svg'
}

interface TRootLayout {
  children?: ReactNode[] | null | ReactNode
}

function RootLayout({ children }: TRootLayout): JSX.Element {
  return (
    <Providers>
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
    </Providers>
  )
}

export default RootLayout
