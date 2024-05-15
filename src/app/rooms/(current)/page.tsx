import type { JSX } from 'react'
import { getAllRooms } from 'services/room/getRoom.service'

import CardRoom from './components/cardRoom/cardRoom'
import Nav from './components/nav/Nav'
import './style.scss'
import './userMobile.scss'

const Rooms = async (): Promise<JSX.Element> => {
  const rooms = await getAllRooms()

  return (
    <main className='dashboard-main rooms'>
      <Nav />
      <article className='dashboard-body'>
        <section className='room-container'>
          {rooms.map(room => {
            return <CardRoom key={room.codigo} data={room} />
          })}
        </section>
      </article>
    </main>
  )
}

export default Rooms
