'use client'

import ErrorContainer from '@/shared/ui/errorContainer/ErrorContainer'
import NavContainer from 'app/rooms/components/navContainer/NavContainer'
import { type JSX, ReactNode } from 'react'
import { FallbackProps } from 'react-error-boundary'
import { v4 as uuid } from 'uuid'

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
        <h3 className='text-center'>
          <b className='gr'>Cangando</b> las imágenes
        </h3>
        <div className='flex w-full flex-wrap gap-2'>
          {new Array(5).fill(Math.random()).map(key => (
            <div key={uuid()} className='skeleton-co -lg flex h-96 w-64 flex-col gap-1 p-4'>
              <div className='skeleton -md h-full w-full' />
              <div className='skeleton mt-4 h-7 w-full' />
            </div>
          ))}
        </div>
      </NavContainer>
      <article className='dashboard-body'>
        <div className='h-full w-full'>
          <button className='skeleton mt-2 h-8 w-20' />
          <div className='skeleton mx-auto mt-2 h-10 w-1/2' />
          <div className='skeleton mx-auto mt-3 h-14 w-1/3' role='none' />
          <p className='skeleton mx-auto mt-2 h-5 w-1/6' role='none' />
          <p className='skeleton mx-auto mt-2 h-5 w-1/6' role='none' />
          <div className='skeleton mx-auto mt-5 h-24 w-1/2' />
          <div className='skeleton mx-auto mt-2 h-8 w-32' />
          <p className='skeleton mx-auto mt-2 h-5 w-1/6' role='none' />
        </div>
      </article>
    </>
  )
}
