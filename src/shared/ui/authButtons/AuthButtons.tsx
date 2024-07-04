'use client'

import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import type { JSX } from 'react'

import ColorSchemeButton from '../colorSchemeButton/ColorSchemeButton'
import './style.scss'

const AuthButtons = (): JSX.Element => {
  const currentPath = usePathname()
  return (
    <aside className='authOptions'>
      <ColorSchemeButton />
      <ClerkLoading>
        <div className='skeleton h-12 w-32' />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton showName afterSignOutUrl={currentPath} />
        </SignedIn>
        <SignedOut>
          <SignUpButton mode='modal' forceRedirectUrl={currentPath}>
            <button className='btn'>Regístrate</button>
          </SignUpButton>
          <SignInButton mode='modal' forceRedirectUrl={currentPath}>
            <button className='btn'>Ingresar</button>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
    </aside>
  )
}

export default AuthButtons
