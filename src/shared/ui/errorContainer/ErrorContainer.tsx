'use client'

import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { type JSX, type ReactNode, Suspense } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

import FallbackError from './FallbackError'

interface IErrorContainer {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  ErrorComponent: JSX.Element
  LoadingComponent: JSX.Element
}

const ErrorContainer = ({
  ErrorComponent,
  LoadingComponent,
  children
}: IErrorContainer): JSX.Element => {
  const onFallbackError = (errorProps: FallbackProps) => (
    <FallbackError errorProps={errorProps} ErrorComponent={ErrorComponent} />
  )

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => {
        return (
          <ErrorBoundary onReset={reset} fallbackRender={onFallbackError}>
            <Suspense fallback={LoadingComponent}>{children}</Suspense>
          </ErrorBoundary>
        )
      }}
    </QueryErrorResetBoundary>
  )
}

export default ErrorContainer
