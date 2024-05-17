'use client'

import { type JSX, Suspense } from 'react'

import Details from './components/details/Details'
import Nav from './components/nav/Nav'
import './style.scss'

const Room = (context: { params: { roomId: string } }): JSX.Element => {
  return (
    <main className='dashboard-main room'>
      <Suspense fallback={<p>cargando ...</p>}>
        <Nav id={context.params.roomId} />
        <article className='dashboard-body'>
          <Details id={context.params.roomId} />
        </article>
      </Suspense>
    </main>
  )
}
export default Room
