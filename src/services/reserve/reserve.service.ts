/* eslint-disable @typescript-eslint/no-throw-literal */
import { TClientReservation } from 'app/api/reservation/by-user/[idUser]/route'
import axios, { AxiosError, CreateAxiosDefaults } from 'axios'
import { API_URL } from 'shared/constants'
import { delay } from 'shared/helpers/delay'

import { IError } from '../error.service.types'
import { ISendReserveData } from './reserve.service.types'

const defaultAxiosConfig: CreateAxiosDefaults = {
  responseEncoding: 'utf8',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
}

const getAxiosReserve = axios.create({
  ...defaultAxiosConfig,
  baseURL: `${API_URL}/reservation`,
  method: 'GET'
})

const postAxiosReserve = axios.create({
  ...defaultAxiosConfig,
  baseURL: `${API_URL}/reservation`,
  method: 'POST'
})

const deleteAxiosReserve = axios.create({
  ...defaultAxiosConfig,
  baseURL: `${API_URL}/reservation`,
  method: 'DELETE'
})

export const getAllReservers = async (id: string) => {
  try {
    const response = await getAxiosReserve(`/by-user/${id}`)
    console.log(response.data)

    if (!response.data) {
      throw new Error('No se recibieron datos válidos en la respuesta')
    }
    return response.data as TClientReservation[]
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

export interface IDeleteReservation {
  reservationId: string
  userId: string
}
export const deleteReservation = async ({ reservationId, userId }: IDeleteReservation) => {
  try {
    await delay(3000)
    const response = await deleteAxiosReserve.delete(`?id=${reservationId}`)
    return { res: response, userId }
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
