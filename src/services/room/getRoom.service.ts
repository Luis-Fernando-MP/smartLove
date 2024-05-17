import axios from 'axios'
import { API_URL } from 'shared/constants'

import { IRoom } from './room.service.types'

const axiosRoom = axios.create({
  baseURL: `${API_URL}/rooms`
})

export const getAllRooms = async (): Promise<IRoom[]> => {
  const response = await axiosRoom('/')
  return response.data.rooms
}

export const getRoomById = async (id: string): Promise<IRoom> => {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
  console.log('no cache')

  const response = await axiosRoom(`/${id}`)
  return response.data.room
}
