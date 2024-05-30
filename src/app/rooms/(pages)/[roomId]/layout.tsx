'use client'

import NavContainer from 'app/rooms/components/navContainer/NavContainer'
import { type JSX, ReactNode } from 'react'
import { FallbackProps } from 'react-error-boundary'
import ErrorContainer from 'shared/ui/errorContainer/ErrorContainer'

import LayoutController from './layoutController'
import './style.scss'

interface TLayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  params: { roomId: string }
}

const Layout = ({ params, children }: TLayout): JSX.Element => {
  return (
    <main className='dashboard-main room'>
      <ErrorContainer LoadingComponent={<LoaderComponent />} ErrorComponent={ErrorComponent}>
        <LayoutController id={params.roomId}>{children}</LayoutController>
      </ErrorContainer>
    </main>
  )
}

export default Layout

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
      <NavContainer className='roomNav'>
        <h2>
          Estamos <b className='gr'>cangando</b> Las imágenes del hotel :)
        </h2>
        <p className='gr'>Cargando...</p>
        <span>Por favor espere</span>
      </NavContainer>
      <article className='dashboard-body'>
        <h2>
          Estamos <b className='gr'>cangando</b> el contenido del hotel :)
        </h2>
        <p className='gr'>Cargando...</p>
        <span>Por favor espere</span>
      </article>
    </>
  )
}
