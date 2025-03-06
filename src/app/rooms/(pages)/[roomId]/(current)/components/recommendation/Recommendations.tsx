'use client'

import RoomComponentV2 from '@/shared/ui/roomComponentV2/RoomsComponentV2'
import { useRooms } from 'hooks/useRooms'
import type { JSX } from 'react'

import { useRoomStore } from '../../../store/room.store'
import './style.scss'

const Recommendations = (): JSX.Element | null => {
  const room = useRoomStore(store => store.room)
  const { data } = useRooms()
  if (!data || room === null) return null

  return (
    <ul className='roomsRecommendations'>
      {data
        .filter(r => r.id !== room.id)
        .map(room => {
          return <RoomComponentV2 key={room.id} room={room} />
        })}
    </ul>
  )
}

export default Recommendations
