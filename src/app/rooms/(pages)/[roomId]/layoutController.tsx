'use client'

import NavContainer from '@/app/rooms/components/navContainer/NavContainer'
import { useRoom } from '@/hooks/useRooms'
import Footer from '@/shared/ui/footer/Footer'
import { type JSX, type ReactNode, useLayoutEffect } from 'react'

import LoaderRoomPage from './LoaderRoomPage'
import Details from './components/details/Details'
import Nav from './components/nav/Nav'
import { useRoomStore } from './store/room.store'

interface ILayoutController {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  id: string
}

const LayoutController = ({ children, id }: ILayoutController): JSX.Element | null => {
  const { data, isError, isLoading } = useRoom(id)
  const { setRoom } = useRoomStore()

  useLayoutEffect(() => {
    if (data !== null) setRoom(data)
  }, [data, isError, setRoom])

  if (isLoading) return <LoaderRoomPage />
  if (isError || !data) return null

  return (
    <main className='dashboard-main room'>
      <NavContainer className='roomNav'>
        <Nav />
      </NavContainer>
      <article className='dashboard-body'>
        <Details />
        {children}
        <Footer />
      </article>
    </main>
  )
}

export default LayoutController
