'use client'

import { type JSX, ReactNode } from 'react'
import { FallbackProps } from 'react-error-boundary'
import ErrorContainer from 'shared/ui/errorContainer/ErrorContainer'

import Nav from './Nav'

interface INavController {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  id: string
}

const NavController = ({ id }: INavController): JSX.Element => {
  return (
    <ErrorContainer LoadingComponent={<LoaderComponent />} ErrorComponent={ErrorComponent}>
      <Nav id={id} />
    </ErrorContainer>
  )
}

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
    <div>
      <h2>
        Estamos <b className='gr'>cangando</b> el contenido :)
      </h2>
      <p className='gr'>Cargando...</p>
      <span>Por favor espere</span>
    </div>
  )
}

export default NavController
