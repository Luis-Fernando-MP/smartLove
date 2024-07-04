/* eslint-disable @typescript-eslint/no-throw-literal */
import axios, { AxiosError, CreateAxiosDefaults } from 'axios'
import { API_URL } from 'shared/constants'
import { delay } from 'shared/helpers/delay'

import { IError } from '../error.service.types'
import { IReservation, ISendReserveData } from './reserve.service.types'

const defaultAxiosConfig: CreateAxiosDefaults = {
  responseEncoding: 'utf8',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  },
  httpsAgent: false
}

const getAxiosReserve = axios.create({
  ...defaultAxiosConfig,
  baseURL: `${API_URL}/reservas`,
  method: 'GET'
})

const postAxiosReserve = axios.create({
  ...defaultAxiosConfig,
  baseURL: `${API_URL}/reservas`,
  method: 'POST'
})

export const getAllReservers = async (id: string): Promise<IReservation[]> => {
  try {
    delay(1000)
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

export const createReservation = async (reserve: ISendReserveData) => {
  try {
    await delay(3000)
    const response = await postAxiosReserve.post('', reserve)
    if (!response.data) {
      throw new Error('Error al crear la reserva')
    }
    return response.data
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
