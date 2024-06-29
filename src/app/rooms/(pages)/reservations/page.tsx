import type { JSX } from 'react'

import ReservationsController from './components/reservationController/ReservationController'

const Page = (): JSX.Element => {
  return (
    <main className='dashboard-main reservation'>
      <ReservationsController />
    </main>
  )
}

export default Page
