'use client'

import { useRooms } from 'hooks/useRooms'
import type { JSX } from 'react'
import RoomsComponentV2 from 'shared/ui/rooms/RoomsComponentV2'

const Recommendations = (): JSX.Element | null => {
  const { data } = useRooms()
  if (!data) return null

  return (
    <ul className='roomsV2'>
      data
      {data.map(room => {
        return <RoomsComponentV2 key={room.codigo} room={room} />
      })}
    </ul>
  )
}

export default Recommendations
