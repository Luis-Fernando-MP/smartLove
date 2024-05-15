import { API_URL } from 'shared/constants'

import { IRoom } from './room.service.types'

export const getAllRooms = async (): Promise<IRoom[]> => {
  const response = await fetch(`${API_URL}/rooms/`, {
    cache: 'no-cache'
  })
  const data = await response.json()

  return [...data.rooms, ...data.rooms, ...data.rooms]
}

export const getRoomById = async (id: string): Promise<IRoom> => {
  const response = await fetch(`${API_URL}/rooms/${id}`, {
    cache: 'no-cache'
  })
  const data = await response.json()

  return data
}
