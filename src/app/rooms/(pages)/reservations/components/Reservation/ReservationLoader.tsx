'use client'

import NavContainer from '@/app/rooms/components/navContainer/NavContainer'
import type { JSX } from 'react'

const ReservationLoader = (): JSX.Element => {
  return (
    <>
      <NavContainer className='reservationNav'>
        <h2>
          Estamos <b className='gr'>cangando</b> Las imágenes del hotel :D
        </h2>
        <p className='gr'>Cargando...</p>
        <span>Por favor espere</span>
      </NavContainer>
      <article className='dashboard-body'>
        <section className='reservations dashboard-body__reservations'>
          <h2>
            Estamos <b className='gr'>cangando</b> tus reservaciones
          </h2>
          <p className='gr'>Cargando...</p>
          <span>Por favor espere</span>
        </section>
        <aside className='RDetails dashboard-body__details'>
          <h2>
            Detalles <b className='gr'>cangando</b>
          </h2>
          <p className='gr'>Cargando...</p>
          <span>Por favor espere</span>
        </aside>
      </article>
    </>
  )
}

export default ReservationLoader
