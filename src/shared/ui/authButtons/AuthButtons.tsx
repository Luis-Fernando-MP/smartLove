import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import type { JSX } from 'react'

import ColorSchemeButton from '../colorSchemeButton/ColorSchemeButton'
import './style.scss'

const AuthButtons = (): JSX.Element => {
  return (
    <aside className='authOptions'>
      <ColorSchemeButton />
      <ClerkLoading>
        <Loader className='text-muted-foreground h-5 w-5' />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton afterSignOutUrl='/' />
        </SignedIn>
        <SignedOut>
          <SignInButton mode='modal' forceRedirectUrl='/'>
            <button className='btn'>Ingresar</button>
          </SignInButton>
          <SignUpButton mode='modal' forceRedirectUrl='/'>
            <button className='btn'>Regístrate</button>
          </SignUpButton>
        </SignedOut>
      </ClerkLoaded>
    </aside>
  )
}

export default AuthButtons
