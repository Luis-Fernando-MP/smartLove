import type { JSX } from 'react'

import Nav from './components/nav/Nav'
import './style.scss'

const Room = (): JSX.Element => {
  return (
    <main className='dashboard-main room'>
      <Nav />
      <article className='dashboard-body'>Nav content</article>
    </main>
  )
}
export default Room
