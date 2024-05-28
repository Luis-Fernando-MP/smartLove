'use client'

import { type JSX } from 'react'
import { FallbackProps } from 'react-error-boundary'
import ErrorContainer from 'shared/ui/errorContainer/ErrorContainer'

import RoomsContainer from './RoomsContainer'

const RoomsController = (): JSX.Element => {
  return (
    <ErrorContainer LoadingComponent={<LoaderComponent />} ErrorComponent={ErrorComponent}>
      <RoomsContainer />
    </ErrorContainer>
  )
}

const ErrorComponent = ({ error, resetErrorBoundary }: FallbackProps): JSX.Element => {
  console.log(resetErrorBoundary)

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
    <div>
      <h2>
        Estamos <b className='gr'>cangando</b> el contenido :)
      </h2>
      <p className='gr'>Cargando...</p>
      <span>Por favor espere</span>
    </div>
  )
}

export default RoomsController
