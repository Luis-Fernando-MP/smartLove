import TanStackProvider from '@/providers/TanStackProvider'
import { bodyFonts } from '@/shared/fonts'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import NextTopLoader from 'nextjs-toploader'
import type { JSX, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import Providers from './Providers'
import './globals.css'
import './layout.scss'
import { metadata, viewport } from './metadata'

dayjs.extend(isBetween)

interface TRootLayout {
  children?: ReactNode[] | null | ReactNode
}

function RootLayout({ children }: TRootLayout): JSX.Element {
  return (
    <Providers>
      <html lang='es'>
        <body className={`${bodyFonts} antialiased`}>
          <NextTopLoader color='var(--tn-primary)' showSpinner={false} />
          <TanStackProvider>{children}</TanStackProvider>
          <Toaster
            position='top-center'
            toastOptions={{
              className: 'toast',
              position: 'top-right',
              style: {
                background: 'rgb(var(--bg-primary))',
                color: 'rgb(var(--fnt-primary))'
              }
            }}
          />
        </body>
      </html>
    </Providers>
  )
}

export default RootLayout

export { metadata, viewport }
