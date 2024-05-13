import type { Metadata } from 'next'
import NextTopLoader from 'nextjs-toploader'
import type { JSX, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { robotoFlex } from 'shared/fonts'

import './layout.scss'

export const metadata: Metadata = {
  title: 'SmartPro',
  description:
    'Sistema de gestión de reservas para la empresa de hotel "Smart Love"',
  icons: '/logo.png'
}

interface TRootLayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

function RootLayout({ children }: TRootLayout): JSX.Element {
  return (
    <html lang='es'>
      <body className={robotoFlex.className}>
        <NextTopLoader height={5} color='#9296ff' />
        {children}
        <Toaster
          position='top-center'
          reverseOrder={false}
          toastOptions={{ className: 'toast' }}
        />
      </body>
    </html>
  )
}

export default RootLayout
