'use client'

import { type JSX } from 'react'
import { FallbackProps } from 'react-error-boundary'
import ErrorContainer from 'shared/ui/errorContainer/ErrorContainer'
import { v4 as uuid } from 'uuid'

import RoomsContainer from './RoomsContainer'

const RoomsController = (): JSX.Element => {
  return (
    <ErrorContainer LoadingComponent={<LoaderComponent />} ErrorComponent={ErrorComponent}>
      <RoomsContainer />
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
    <div className='flex w-full flex-col gap-3'>
      <h3>
        Estamos <b className='gr'>cangando</b> el contenido :)
      </h3>
      <p className='skeleton h-5 w-1/3' />
      <p className='skeleton h-5 w-2/12' />
      <div className='flex flex-wrap gap-3 '>
        {new Array(10).fill(Math.random()).map(() => (
          <div key={uuid()} className='skeleton-co h-90 w-64 p-4'>
            <div className='skeleton h-32 w-full ' />
            <div className='skeleton m-auto mt-4 h-6 w-3/4 ' />
            <div className='mt-2 space-y-2'>
              <div className='skeleton h-4 w-full ' />
              <div className='skeleton h-4 w-5/6 ' />
              <div className='skeleton h-4 w-4/6 ' />
              <div className='skeleton h-4 w-4/12 ' />
            </div>
            <div className='skeleton mt-4 h-7 w-full ' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RoomsController
