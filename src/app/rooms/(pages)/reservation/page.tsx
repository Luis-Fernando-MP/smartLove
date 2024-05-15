import type { JSX } from 'react'

import Nav from './components/nav/Nav'
import './style.scss'

const Reservation = (): JSX.Element => {
  return (
    <main className='dashboard-main reservation'>
      <Nav />
      <article className='dashboard-body'>Nav content</article>
    </main>
  )
}
export default Reservation
