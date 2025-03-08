import TanStackProvider from '@/providers/TanStackProvider'
import Hydration from '@/shared/Components/Hydration'
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
          <Hydration>
            <TanStackProvider>{children}</TanStackProvider>
          </Hydration>
          <Toaster
            position='top-center'
            toastOptions={{
              className: 'toast',
              position: 'top-center',
              style: {
                background: 'var(--bg-primary)',
                color: 'var(--fnt-primary)'
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
