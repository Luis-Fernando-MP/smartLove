'use client'

import NavContainer from 'app/rooms/components/navContainer/NavContainer'
import { type JSX, ReactNode } from 'react'

import Details from './components/details/Details'
import ErrorContainer from './components/errorContainer/ErrorContainer'
import ErrorNavContainer from './components/errorNavContainer/ErrorNavContainer'
import Nav from './components/nav/Nav'
import './style.scss'

interface TLayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  params: { roomId: string }
}

const Layout = ({ params, children }: TLayout): JSX.Element => {
  return (
    <main className='dashboard-main room'>
      <NavContainer className='roomNav'>
        <ErrorNavContainer>
          <Nav id={params.roomId} />
        </ErrorNavContainer>
      </NavContainer>
      <ErrorContainer>
        <article className='dashboard-body'>
          <Details id={params.roomId} />
          {children}
        </article>
      </ErrorContainer>
    </main>
  )
}
export default Layout
