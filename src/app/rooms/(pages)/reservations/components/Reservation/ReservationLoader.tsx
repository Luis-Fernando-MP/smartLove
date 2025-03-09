'use client'

import NavContainer from '@/app/rooms/components/navContainer/NavContainer'
import type { JSX } from 'react'

const ReservationLoader = (): JSX.Element => {
  return (
    <main className='dashboard-main reservation'>
      <NavContainer className='skeleton-co h-fit w-[400px] min-w-[400px]'>
        <div className='skeleton h-8 w-20' />
        <h2 className='skeleton gr font3 h-10 w-1/2'>Cargando ...</h2>
        <h4 className='skeleton h-14 w-2/3' />

        <form className='skeleton h-full'>
          <section className='rounded-md p-3'>
            <h5 className='skeleton gr font3 h-6 w-1/3' />
            <div className='skeleton mt-2 h-10 w-full' />
          </section>

          <section className='rounded-md p-3'>
            <h5 className='skeleton h-6 w-1/2' />
            <span className='skeleton mt-1 h-5 w-3/4' />
            <div className='skeleton mt-2 h-10 w-full' />
          </section>

          <section className='rounded-md p-3'>
            <h5 className='skeleton h-6 w-1/3' />
            <span className='skeleton mt-1 h-5 w-3/4' />
            <div className='skeleton mt-2 h-32 w-full' />
          </section>

          <div className='skeleton mt-4 h-12 w-full' />
        </form>
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
    </main>
  )
}

export default ReservationLoader
