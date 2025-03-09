'use client'

import type { JSX } from 'react'

import Details from './components/Details'
import Nav from './components/Nav'
import Reservations from './components/Reservation'

const Page = (): JSX.Element => {
  return (
    <>
      <Nav />
      <article className='dashboard-body'>
        <Reservations />
        <Details />
      </article>
    </>
  )
}

export default Page
