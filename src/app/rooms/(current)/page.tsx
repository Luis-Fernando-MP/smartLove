import type { JSX } from 'react'

import Nav from './components/nav/Nav'
import './style.scss'
import './userMobile.scss'

const Rooms = (): JSX.Element => {
  return (
    <main className='dashboard-main rooms'>
      <Nav />
      <article className='dashboard-body'>content</article>
    </main>
  )
}

export default Rooms
