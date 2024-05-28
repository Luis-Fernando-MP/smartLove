/* eslint-disable @typescript-eslint/no-throw-literal */
import axios, { AxiosError } from 'axios'
import { API_URL } from 'shared/constants'

import { IRoom } from './room.service.types'

const axiosRoom = axios.create({
  baseURL: API_URL
})

export const getAllRooms = async (): Promise<IRoom[] | any> => {
  try {
    // await new Promise(resolve =>
    //   setInterval(() => {
    //     return resolve()
    //   }, 2000)
    // )
    const response = await axiosRoom('/habitaciona')
    if (!response.data) {
      throw new Error('No se recibieron datos válidos en la respuesta')
    }
    return response.data as IRoom[]
  } catch (error: any) {
    if (!(error instanceof AxiosError)) throw { message: error?.message }
    const newError = {
      message: error.message,
      status: error.response?.status
    }
    throw newError
  }
}

export const getRoomById = async (id: string): Promise<IRoom> => {
  const response = await axiosRoom(`/habitacion/${id}`)
  return response.data.room
}
