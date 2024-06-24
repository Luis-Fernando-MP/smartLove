'use client'

import NavContainer from 'app/rooms/components/navContainer/NavContainer'
import type { JSX } from 'react'
import { FallbackProps } from 'react-error-boundary'
import ErrorContainer from 'shared/ui/errorContainer/ErrorContainer'

import LayoutController from './layoutController'
import './style.scss'

const Reservation = (): JSX.Element => {
  return (
    <main className='dashboard-main reservation'>
      <ErrorContainer LoadingComponent={<LoaderComponent />} ErrorComponent={ErrorComponent}>
        <LayoutController />
      </ErrorContainer>
    </main>
  )
}
export default Reservation

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
          Estamos <b className='gr'>cangando</b> Las imágenes del hotel :)
        </h2>
        <p className='gr'>Cargando...</p>
        <span>Por favor espere</span>
      </NavContainer>
      <article className='dashboard-body'>
        {/* <ReservationsController /> */}
        <h2>
          Estamos <b className='gr'>cangando</b> el contenido del hotel :)
        </h2>
        <p className='gr'>Cargando...</p>
        <span>Por favor espere</span>
      </article>
    </>
  )
}
