import axios from 'axios'
import { API_URL } from 'shared/constants'

import { IRoom } from './room.service.types'

const axiosRoom = axios.create({
  baseURL: API_URL
})

export const getAllRooms = async (): Promise<IRoom[]> => {
  try {
    const response = await axiosRoom('/habitacion')
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('No se recibieron datos válidos en la respuesta')
    }
    return response.data as IRoom[]
  } catch (error) {
    console.error('Error fetching rooms:', error)
    throw error
  }
}

export const getRoomById = async (id: string): Promise<IRoom> => {
  const response = await axiosRoom(`/habitacion/${id}`)
  return response.data.room
}
