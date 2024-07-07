'use client'

import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useClerk
} from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { type JSX, useEffect } from 'react'

import ColorSchemeButton from '../colorSchemeButton/ColorSchemeButton'
import './style.scss'

const AuthButtons = (): JSX.Element => {
  const { addListener } = useClerk()
  const currentPath = usePathname()

  useEffect(() => {
    addListener(li => {
      console.log(li)
    })

    return () => {}
  }, [addListener])

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
