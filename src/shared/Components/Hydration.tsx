'use client'

import { type JSX, type ReactNode, useEffect, useRef } from 'react'

interface IHydration {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const Hydration = ({ children }: IHydration): JSX.Element => {
  const isHydrated = useRef(false)

  useEffect(() => {
    isHydrated.current = true
  }, [])

  return <>{isHydrated && children}</>
}

export default Hydration
