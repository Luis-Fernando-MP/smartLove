'use client'

import { newKey } from '@/shared/key'
import Footer from '@/shared/ui/footer/Footer'
import type { JSX } from 'react'

import { useReservationsStore } from '../../store/reservation.store'
import Reserve from '../reserve/Reserve'
import './style.scss'

const Reservations = (): JSX.Element | null => {
  const reservations = useReservationsStore(s => s.reservations)
  if (!reservations) return null

  return (
    <section className='reservations'>
      <div className='reservations-info'>
        <h2 className='font3'>
          Has realizado <b className='gr'> {reservations.length} Reservas</b>
        </h2>
        <h3>
          Ten encenta que la <b className='gr'>Cantidad de Reservas</b> de nuestros huéspedes son importantes...
          <br />
          En futuras versiones se aplicaran&nbsp;<b className='gr'>Promociones y Programas de lealtad</b> 🎉
        </h3>
      </div>

      <article className='reservations-list'>
        {reservations.map(r => {
          return <Reserve reserve={r} key={newKey()} />
        })}
      </article>
    </section>
  )
}

export default Reservations
