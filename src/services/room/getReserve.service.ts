/* eslint-disable @typescript-eslint/no-throw-literal */
import axios, { AxiosError } from 'axios'
import { API_URL } from 'shared/constants'

import { IError } from '../error.service.types'
import { IReservation } from './reserve.service.types'

const getAxiosReserve = axios.create({
  baseURL: `${API_URL}/reservas`,
  responseEncoding: 'utf8',
  responseType: 'json',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  httpsAgent: false
})

export const getAllReservers = async (id: string): Promise<IReservation[]> => {
  try {
    await new Promise(resolve =>
      setTimeout(() => {
        return resolve(true)
      }, 100)
    )
    const response = await getAxiosReserve(`/findReservasCliente/${id}`)
    if (!response.data) {
      throw new Error('No se recibieron datos válidos en la respuesta')
    }
    return response.data as IReservation[]
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
