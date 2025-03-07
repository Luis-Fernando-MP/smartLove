'use client'

import { ClerkLoaded, ClerkLoading, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { type JSX } from 'react'

import './style.scss'

const ColorSchemeButton = dynamic(() => import('../colorSchemeButton/ColorSchemeButton'), {
  ssr: false
})

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
