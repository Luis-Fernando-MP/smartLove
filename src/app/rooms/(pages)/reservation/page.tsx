import type { JSX } from 'react'

import Nav from './components/nav/Nav'
import './style.scss'
import './userMobile.scss'

const Reservation = (): JSX.Element => {
  return (
    <main className='dashboard-main'>
      <Nav />
      <article className='dashboard-body'>Reservation</article>
    </main>
  )
}
export default Reservation
