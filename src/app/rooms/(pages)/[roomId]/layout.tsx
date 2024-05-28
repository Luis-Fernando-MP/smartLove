'use client'

import NavContainer from 'app/rooms/components/navContainer/NavContainer'
import { type JSX, ReactNode } from 'react'

import DetailsController from './components/details/DetailsController'
import NavController from './components/nav/NavController'
import './style.scss'

interface TLayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  params: { roomId: string }
}

const Layout = ({ params, children }: TLayout): JSX.Element => {
  return (
    <main className='dashboard-main room'>
      <NavContainer className='roomNav'>
        <NavController id={params.roomId} />
      </NavContainer>
      <article className='dashboard-body'>
        <DetailsController id={params.roomId} />
        {children}
      </article>
    </main>
  )
}
export default Layout
