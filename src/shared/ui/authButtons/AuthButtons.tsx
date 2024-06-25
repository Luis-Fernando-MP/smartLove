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
import type { JSX } from 'react'

import ColorSchemeButton from '../colorSchemeButton/ColorSchemeButton'
import './style.scss'

const AuthButtons = (): JSX.Element => {
  return (
    <aside className='authOptions'>
      <ColorSchemeButton />
      <ClerkLoading>
        <div className='skeleton h-5 min-w-24 animate-pulse rounded ' />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton afterSignOutUrl='/' />
        </SignedIn>
        <SignedOut>
          <SignUpButton mode='modal' fallbackRedirectUrl='/rooms'>
            <button className='btn'>Regístrate</button>
          </SignUpButton>
          <SignInButton mode='modal' fallbackRedirectUrl='/rooms'>
            <button className='btn'>Ingresar</button>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
    </aside>
  )
}

export default AuthButtons
