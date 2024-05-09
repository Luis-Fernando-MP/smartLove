import '@styles/config/_global.scss'
import type { Metadata } from 'next'
import { Roboto_Flex } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import type { JSX, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  weight: ['900', '800', '700', '600', '500', '400', '300'],
  variable: '--roboto-flex'
})

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
        <NextTopLoader height={5} color='#f55a61' />
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
