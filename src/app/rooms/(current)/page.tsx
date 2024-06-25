import { type JSX } from 'react'

import Nav from './components/nav/Nav'
import RoomsController from './components/roomsContainer/RoomsController'
import './style.scss'
import './userMobile.scss'

const Rooms = (): JSX.Element => {
  return (
    <main className='dashboard-main rooms'>
      <Nav />
      <section className='dashboard-body'>
        <article className='roomsContainer'>
          <RoomsController />
        </article>
      </section>
    </main>
  )
}

export default Rooms
