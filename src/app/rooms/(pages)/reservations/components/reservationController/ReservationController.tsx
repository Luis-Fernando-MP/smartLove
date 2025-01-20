'use client'

import NavContainer from 'app/rooms/components/navContainer/NavContainer'
import type { JSX } from 'react'
import { FallbackProps } from 'react-error-boundary'
import ErrorContainer from 'shared/ui/errorContainer/ErrorContainer'

import Reservation from './Reservation'
import './style.scss'

const ReservationsController = (): JSX.Element => {
  return (
    <ErrorContainer LoadingComponent={<LoaderComponent />} ErrorComponent={ErrorComponent}>
      <Reservation />
    </ErrorContainer>
  )
}
export default ReservationsController

const ErrorComponent = ({ error, resetErrorBoundary }: FallbackProps): JSX.Element => {
  return (
    <p>
      <h2>Ha ocurrido un error</h2>
      <pre>{JSON.stringify(error)}</pre>
      <button className='btn gr' onClick={resetErrorBoundary}>
        reset
      </button>
    </p>
  )
}

const LoaderComponent = (): JSX.Element => {
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
