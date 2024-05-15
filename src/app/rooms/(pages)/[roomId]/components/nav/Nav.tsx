'use client'

import NavContainer from 'app/rooms/components/navContainer/NavContainer'
import { type JSX } from 'react'
import Back from 'shared/ui/back/Back'

import './style.scss'

const Nav = (): JSX.Element => {
  return (
    <NavContainer className='roomNav'>
      <Back />
    </NavContainer>
  )
}

export default Nav
