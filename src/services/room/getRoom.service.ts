/* eslint-disable @typescript-eslint/no-throw-literal */
import { TFullDataRoom } from 'app/api/rooms/route'
import axios, { AxiosError } from 'axios'

import { IError } from '../error.service.types'

const axiosRoom = axios.create({
  baseURL: `/api/rooms`,
  responseEncoding: 'utf8',
  responseType: 'json',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getAllRooms = async () => {
  try {
    const response = await axiosRoom('')
    const { data } = response
    if (!data) {
      throw new Error('No se recibieron datos válidos en la respuesta')
    }
    return data as TFullDataRoom[]
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
export const getRoomById = async (id: string) => {
  try {
    const response = await axiosRoom(`/${id}`)
    if (!response.data) {
      throw new Error('No se recibieron datos válidos en la respuesta')
    }
    return response.data as TFullDataRoom
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
