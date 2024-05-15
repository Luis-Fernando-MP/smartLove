'use client'

import type { JSX } from 'react'
import { FacebookProvider, Like } from 'react-facebook'

const FacebookContent = (): JSX.Element => {
  return (
    <div>
      algo de fb
      <FacebookProvider appId='1397933243846983'>
        <Like href='http://www.facebook.com' colorScheme='dark' showFaces share />
      </FacebookProvider>
    </div>
  )
}

export default FacebookContent
