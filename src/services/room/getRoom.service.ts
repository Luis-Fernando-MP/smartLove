/* eslint-disable @typescript-eslint/no-throw-literal */
import axios, { AxiosError } from 'axios'
import { API_URL } from 'shared/constants'
import { delay } from 'shared/helpers/delay'

import { IError } from '../error.service.types'
import { IRoom } from './room.service.types'

const axiosRoom = axios.create({
  baseURL: `${API_URL}/habitacion`,
  responseEncoding: 'utf8',
  responseType: 'json',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getAllRooms = async (): Promise<IRoom[]> => {
  try {
    await delay(500)
    const response = await axiosRoom('')
    const { data } = response
    if (!data) {
      throw new Error('No se recibieron datos válidos en la respuesta')
    }
    return data as IRoom[]
  } catch (error: any) {
    let errorEvent: IError = {
      message: error?.message,
      status: 500
    }
    if (!(error instanceof AxiosError)) throw errorEvent
    errorEvent = {
      message: error.message,
      status: error.response?.status ?? 500
    }
    throw errorEvent
  }
}
export const getRoomById = async (id: string): Promise<IRoom> => {
  try {
    await delay(800)
    const response = await axiosRoom(`/findById/${id}`)
    if (!response.data) {
      throw new Error('No se recibieron datos válidos en la respuesta')
    }
    return response.data as IRoom
  } catch (error: any) {
    let errorEvent: IError = {
      message: error?.message,
      status: 500
    }
    if (!(error instanceof AxiosError)) throw errorEvent
    errorEvent = {
      message: error.message,
      status: error.response?.status ?? 500
    }
    throw errorEvent
  }
}
