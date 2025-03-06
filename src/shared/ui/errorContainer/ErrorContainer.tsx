'use client'

import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { type JSX, type ReactNode, Suspense } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

import FallbackError from './FallbackError'

interface IErrorContainer {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  ErrorComponent: React.ComponentType<FallbackProps>
  LoadingComponent: ReactNode
}

const ErrorContainer = ({ ErrorComponent, LoadingComponent, children }: IErrorContainer): JSX.Element => {
  const onFallbackError = (errorProps: FallbackProps) => {
    return (
      <FallbackError errorProps={errorProps}>
        <ErrorComponent {...errorProps} />
      </FallbackError>
    )
  }

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallbackRender={onFallbackError} onReset={reset} onError={error => console.error('Error: ', error)}>
          <Suspense fallback={LoadingComponent}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}

export default ErrorContainer
