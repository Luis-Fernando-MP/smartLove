import { type JSX } from 'react'

import ErrorContainer from './components/errorContainer/ErrorContainer'
import Nav from './components/nav/Nav'
import RoomsContainer from './components/roomsContainer/RoomsContainer'
import './style.scss'
import './userMobile.scss'

const Rooms = (): JSX.Element => {
  return (
    <main className='dashboard-main rooms'>
      <Nav />
      <ErrorContainer>
        <RoomsContainer />
      </ErrorContainer>
    </main>
  )
}

export default Rooms
