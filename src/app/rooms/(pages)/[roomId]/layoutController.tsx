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
  const { setID, setRoom } = useRoomStore()

  useEffect(() => {
    if (isError) return
    if (data === null) return
    setRoom(data)
    setID(String(data?.codigo))
  }, [data, isError, setID, setRoom])

  if (!data || isError) return null

  return (
    <>
      <NavContainer className='roomNav'>
        <Nav />
      </NavContainer>
      <article className='dashboard-body'>
        <Details />
        {children}
      </article>
    </>
  )
}

export default LayoutController
