'use client'

import ToggleLogo from '@/shared/ui/ColorSchemeButton/ToggleLogo'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import type { FC, JSX, ReactNode } from 'react'

import './style.scss'

interface TLayout {
  children?: ReactNode[]
}
const Layout: FC<TLayout> = ({ children }): JSX.Element => {
  const pathname = usePathname()
  const isSignUp = pathname === '/sign-up'

  return (
    <section className='login'>
      <header className='login-header'>
        <Link href='/'>
          <ToggleLogo />
        </Link>
        <Link href={isSignUp ? '/sign-in' : '/sign-up'}>
          {isSignUp ? (
            <>
              Ya tienes una cuenta? <b className='gr font3'>Inicia sesión</b>
            </>
          ) : (
            <>
              No tienes una cuenta? <b className='gr font3'>Regístrate ahora</b>
            </>
          )}
        </Link>
      </header>
      {children}
    </section>
  )
}

export default Layout
