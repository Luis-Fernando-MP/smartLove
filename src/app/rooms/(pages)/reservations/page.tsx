'use client'

import Footer from '@/shared/ui/footer/Footer'
import type { JSX } from 'react'

import Details from './components/Details'
import Nav from './components/Nav'
import Reservations from './components/Reservation'

const Page = (): JSX.Element => {
  return (
    <>
      <Nav />
      <article className='dashboard-body reservations-container'>
        <Reservations />
        <Details />
        <Footer />
      </article>
    </>
  )
}

export default Page
