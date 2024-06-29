'use client'

import NavContainer from 'app/rooms/components/navContainer/NavContainer'
import { useReservations } from 'hooks/useReservations'

import Details from '../details/Details'
import Nav from '../nav/Nav'
import Reservations from '../reservations/Reservations'

const Reservation = (): JSX.Element | null => {
  const { data, isError } = useReservations()
  if (!data || isError) return null
  return (
    <>
      <NavContainer className='reservationNav'>
        <Nav />
      </NavContainer>
      <article className='dashboard-body'>
        <Reservations />
        <Details />
      </article>
    </>
  )
}

export default Reservation
