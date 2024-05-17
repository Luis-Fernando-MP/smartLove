'use client'

// import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query'
import { ROOMS_NAME_CACHE, useRoom } from 'hooks/useRooms'
import { type JSX, Suspense } from 'react'

import Details from './components/details/Details'
import Nav from './components/nav/Nav'
import './style.scss'

const Room = (context: { params: { roomId: string } }): JSX.Element => {
  return (
    <main className='dashboard-main room'>
      <Nav />
      <article className='dashboard-body'>
        <Suspense fallback={<p>cargando ...</p>}>
          <Details id={context.params.roomId} />
        </Suspense>
      </article>
    </main>
  )
}
export default Room
