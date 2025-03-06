import Footer from '@/shared/ui/footer/Footer'
import NavContainer from 'app/rooms/components/navContainer/NavContainer'
import { useRoom } from 'hooks/useRooms'
import { type JSX, type ReactNode, useEffect } from 'react'

import Details from './components/details/Details'
import Nav from './components/nav/Nav'
import { useRoomStore } from './store/room.store'

interface ILayoutController {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  id: string
}

const LayoutController = ({ children, id }: ILayoutController): JSX.Element | null => {
  const { data, isError } = useRoom(id)
  const { setRoom } = useRoomStore()

  useEffect(() => {
    if (data === null) return
    setRoom(data)
  }, [data, isError, setRoom])

  if (!data || isError) return <p>loading...</p>

  return (
    <>
      <NavContainer className='roomNav'>
        <Nav />
      </NavContainer>
      <article className='dashboard-body'>
        <Details />
        {children}
        <Footer className='max-w-[900px]' />
      </article>
    </>
  )
}

export default LayoutController
