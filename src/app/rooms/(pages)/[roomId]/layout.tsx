import { ReactNode } from 'react'

import LayoutController from './layoutController'
import './style.scss'

interface TLayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  params: { roomId: string }
}

const Layout = async ({ params, children }: TLayout) => {
  const roomId = params.roomId
  return <LayoutController id={roomId}>{children}</LayoutController>
}

export default Layout
