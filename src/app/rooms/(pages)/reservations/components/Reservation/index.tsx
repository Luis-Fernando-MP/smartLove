'use client'

import Footer from '@/shared/ui/footer/Footer'
import type { JSX } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { useReservationsStore } from '../../store/reservation.store'
import Reserve from '../reserve/Reserve'
import './style.scss'

const Reservations = (): JSX.Element | null => {
  const reservations = useReservationsStore(s => s.reservations)
  if (!reservations) return null

  return (
    <section className='reservations dashboard-body__reservations'>
      <h3>
        Has realizado <b className='gr'> {reservations.length} Reservas</b>
      </h3>
      <p>
        Ten encenta que la <b className='gr'>Cantidad de Reservas</b> de nuestros huéspedes son importantes... En futuras
        versiones se aplicaran&nbsp;
        <b className='gr'>Promociones y Programas de lealtad</b> 🎉
      </p>
      <article className='reservations-list'>
        {reservations.map(r => {
          return <Reserve reserve={r} key={uuidv4()} />
        })}
      </article>
      <Footer />
    </section>
  )
}

export default Reservations
