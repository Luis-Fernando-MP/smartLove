'use client'

import { useReservations } from '@/hooks/useReservations'
import { type JSX, type ReactNode, useEffect, useLayoutEffect } from 'react'

import ReservationLoader from './components/Reservation/ReservationLoader'
import { useReservationsStore } from './store/reservation.store'
import './style.scss'

interface ILayoutController {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  userId: string | undefined
}

const LayoutController = ({ children, userId }: ILayoutController): JSX.Element | null => {
  const reservation = useReservations(userId)
  const { setReservations } = useReservationsStore()

  useEffect(() => {
    if (!reservation?.data) return
    setReservations(reservation?.data as any)
  }, [reservation?.data, setReservations])

  if (!reservation) return null

  const { data, isError, isLoading } = reservation
  if (isLoading) return <ReservationLoader />
  if (isError || !data) return null

  return <main className='dashboard-main reservation'>{children}</main>
}

export default LayoutController
