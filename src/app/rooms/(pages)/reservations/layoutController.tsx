import NavContainer from 'app/rooms/components/navContainer/NavContainer'
import { useReservations } from 'hooks/useReservations'
import { type JSX, type ReactNode, useEffect } from 'react'

import Nav from './components/nav/Nav'
import Reservations from './components/reservations/Reservations'
import { useReservationStore } from './store/reservation.store'

interface ILayoutController {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const LayoutController = ({ children }: ILayoutController): JSX.Element | null => {
  const { data, isError } = useReservations()
  const { setReservations } = useReservationStore()

  useEffect(() => {
    if (data === null || !isError) {
      setReservations(data)
    }
  }, [data, isError, setReservations])
  if (!data || isError) return null
  return (
    <>
      <NavContainer className='reservationNav'>
        <Nav />
      </NavContainer>
      <article className='dashboard-body'>
        <Reservations />
      </article>
    </>
  )
}

export default LayoutController
