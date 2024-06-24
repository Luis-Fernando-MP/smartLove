'use client'

import type { JSX } from 'react'
import { Masonry } from 'react-masonry'

import { useReservationStore } from '../../store/reservation.store'
import Reserve from '../reserve/Reserve'
import './style.scss'

const Reservations = (): JSX.Element | null => {
  const { reservations } = useReservationStore()
  if (!reservations) return null

  return (
    <section className='reservations'>
      <Masonry>
        {reservations.map(r => {
          return (
            <div key={r.idReserva}>
              <Reserve reserve={r} />
            </div>
          )
        })}
      </Masonry>
    </section>
  )
}

export default Reservations
