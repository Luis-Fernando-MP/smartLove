'use client'

import { useRooms } from 'hooks/useRooms'
import type { JSX } from 'react'
import RoomComponentV2 from 'shared/ui/roomComponentV2/RoomsComponentV2'

import './style.scss'

const Recommendations = (): JSX.Element | null => {
  const { data } = useRooms()
  if (!data) return null

  return (
    <ul className='roomsRecommendations'>
      {data.map(room => {
        return <RoomComponentV2 key={room.codigo} room={room} />
      })}
    </ul>
  )
}

export default Recommendations
