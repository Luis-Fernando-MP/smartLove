'use client'

import type { JSX } from 'react'

import NavContainer from '../../components/navContainer/NavContainer'
import Details from './components/Details'
import Nav from './components/Nav'
import Reservations from './components/Reservation'

const Page = (): JSX.Element => {
  return (
    <>
      <NavContainer className='reservationNav'>
        <Nav />
      </NavContainer>
      <article className='dashboard-body'>
        <Reservations />
        <Details />
      </article>
    </>
  )
}

export default Page
