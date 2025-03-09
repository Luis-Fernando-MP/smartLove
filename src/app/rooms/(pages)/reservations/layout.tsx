import { currentUser } from '@clerk/nextjs/server'
import { ReactNode } from 'react'

import LayoutController from './layoutController'

interface TLayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const Layout = async ({ children }: TLayout) => {
  const user = await currentUser()
  return <LayoutController userId={user?.id}>{children}</LayoutController>
}

export default Layout
