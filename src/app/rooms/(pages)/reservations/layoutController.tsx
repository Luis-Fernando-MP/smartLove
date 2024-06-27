'use client'

import NavContainer from 'app/rooms/components/navContainer/NavContainer'
import { useReservations } from 'hooks/useReservations'
import { type JSX, type ReactNode } from 'react'

import Nav from './components/nav/Nav'
import Reservations from './components/reservations/Reservations'

interface ILayoutController {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const LayoutController = ({ children }: ILayoutController): JSX.Element | null => {
  const { data, isError } = useReservations()
  if (!data || isError) return null
  return (
    <>
      <NavContainer className='reservationNav'>
        <Nav />
      </NavContainer>
      <article className='dashboard-body'>
        <Reservations />
        <aside className='dashboard-body__details'>details</aside>
      </article>
    </>
  )
}

export default LayoutController
