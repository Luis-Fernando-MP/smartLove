'use client'

import { useGetReservations } from 'hooks/useReservations'
import type { JSX } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Reserve from '../reserve/Reserve'
import './style.scss'

const Reservations = (): JSX.Element | null => {
  const reservations = useGetReservations()
  console.log('ini: ', reservations)

  if (!reservations) return null

  // console.log(reservations)

  return (
    <section className='reservations'>
      <h3>
        Has realizado <b className='gr'> {reservations.length} Reservas</b>
      </h3>
      <p>
        Ten encenta que la <b className='gr'>Cantidad de Reservas</b> de nuestros huéspedes son
        importantes... En futuras versiones se aplicaran&nbsp;
        <b className='gr'>Promociones y Programas de lealtad</b> 🎉
      </p>

      <article className='reservations-list'>
        {reservations.map(r => {
          return <Reserve reserve={r} key={uuidv4()} />
        })}
      </article>
    </section>
  )
}

export default Reservations
