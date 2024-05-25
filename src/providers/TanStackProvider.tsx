'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { type JSX, type ReactNode, useState } from 'react'

interface ITanStackProvider {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const TanStackProvider = ({ children }: ITanStackProvider): JSX.Element => {
  const state = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000
          }
        }
      })
  )

  return (
    <QueryClientProvider client={state[0]}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default TanStackProvider
