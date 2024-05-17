'use client'

import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { type JSX, type ReactNode, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import FallbackError from './FallbackError'
import FallbackLoading from './FallbackLoading'

interface IErrorContainer {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const ErrorContainer = ({ children }: IErrorContainer): JSX.Element => {
  return (
    <section className='dashboard-body'>
      <QueryErrorResetBoundary>
        {({ reset }) => {
          return (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={errorProps => <FallbackError errorProps={errorProps} />}
            >
              <Suspense fallback={<FallbackLoading />}>{children}</Suspense>
            </ErrorBoundary>
          )
        }}
      </QueryErrorResetBoundary>
    </section>
  )
}

export default ErrorContainer
