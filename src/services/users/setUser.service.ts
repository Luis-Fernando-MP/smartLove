/* eslint-disable @typescript-eslint/no-throw-literal */
import { API_URL } from '@/shared/constants'
import axios, { AxiosError } from 'axios'
import { IError } from 'services/error.service.types'

import { IClient, IUser } from './user.service.types'

const UserAxios = axios.create({
  baseURL: `${API_URL}/usuarios`,
  responseEncoding: 'utf8',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const createUser = async (userData: IUser) => {
  try {
    const response = await UserAxios.post('', { ...userData })
    if (!response.data) {
      throw new Error('Error al guardar el usuario')
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

export const createClient = async (clientData: IClient) => {
  try {
    // const response = await UserAxios.post('', { clientData })
    // if (!response.data) {
    //   throw new Error('Error al guardar el usuario')
    // }
    // return response.data
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
