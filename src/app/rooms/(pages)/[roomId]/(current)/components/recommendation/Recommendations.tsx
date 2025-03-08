'use client'

import { useRooms } from '@/hooks/useRooms'
import RoomItem from '@/shared/ui/RoomItem'
import type { JSX } from 'react'

import { useRoomStore } from '../../../store/room.store'
import RecommendationLoader from './recommendationLoader'
import './style.scss'

const Recommendations = (): JSX.Element | null => {
  const room = useRoomStore(store => store.room)
  const { data, isLoading } = useRooms()
  if (isLoading) return <RecommendationLoader />
  if (!data || room === null) return null

  return (
    <ul className='roomsRecommendations'>
      {data
        .filter(r => r.id !== room.id)
        .map(room => {
          return <RoomItem key={room.id} room={room} />
        })}
    </ul>
  )
}

export default Recommendations
