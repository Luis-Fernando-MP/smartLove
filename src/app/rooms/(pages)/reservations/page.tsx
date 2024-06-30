import type { JSX } from 'react'

import ReservationsController from './components/reservationController/ReservationController'
import './style.scss'

const Page = (): JSX.Element => {
  return (
    <main className='dashboard-main reservation'>
      <ReservationsController />
    </main>
  )
}

export default Page
