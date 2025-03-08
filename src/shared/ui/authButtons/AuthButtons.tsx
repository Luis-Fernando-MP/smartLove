'use client'

import { ClerkLoaded, ClerkLoading, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { type JSX } from 'react'

import ColorSchemeButton from '../ColorSchemeButton'
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
          <UserButton showName afterSwitchSessionUrl={currentPath} />
        </SignedIn>
        <SignedOut>
          <SignInButton
            mode='modal'
            forceRedirectUrl={currentPath}
            fallbackRedirectUrl={currentPath}
            signUpFallbackRedirectUrl={currentPath}
            signUpForceRedirectUrl={currentPath}
          >
            <button className='btn'>Ingresar</button>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>
    </aside>
  )
}

export default AuthButtons
