'use client'

import { type JSX } from 'react'
import { FallbackProps } from 'react-error-boundary'
import ErrorContainer from 'shared/ui/errorContainer/ErrorContainer'

import Recommendations from './Recommendations'

const RecommendationsController = (): JSX.Element => {
  return (
    <ErrorContainer LoadingComponent={<LoaderComponent />} ErrorComponent={ErrorComponent}>
      <Recommendations />
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
    <div className='skeleton-co flex w-[900px] flex-col items-center gap-3'>
      <h5>
        Estamos <b className='gr'>cangando</b> el contenido 🏙️
      </h5>
      {new Array(10).fill(Math.random()).map(key => (
        <section
          key={key}
          className='skeleton h-90 flex w-[750px] flex-col items-center justify-center gap-2 p-4'
        >
          <div className='skeleton-co mx-auto mb-1 h-[100px] w-full' />
          <div className='skeleton-co mx-auto mb-1 h-6 w-3/4' />
          <div className='skeleton-co mx-auto mb-1 h-6 w-2/5' />
          <div className='skeleton-co mx-auto mb-2 h-[80px] w-full' />
          <div className='m-auto flex justify-center gap-1'>
            <div className='skeleton-co h-7 w-[100px]' />
            <div className='skeleton-co h-7 w-[100px]' />
          </div>
        </section>
      ))}
    </div>
  )
}

export default RecommendationsController
