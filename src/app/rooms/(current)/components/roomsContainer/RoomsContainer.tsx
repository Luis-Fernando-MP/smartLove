'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useRooms } from 'hooks/useRooms'
import type { JSX } from 'react'
import { Masonry } from 'react-masonry'

import useFilters from '../../store/useFilters.store'
import CardRoom from '../cardRoom/cardRoom'
import './style.scss'

const RoomsContainer = (): JSX.Element | null => {
  const { data } = useRooms()
  const filters = useFilters(data => data.filters)
  if (!data) return null
  console.log(data)

  return (
    <article className='roomsContainer'>
      <h3>{data.length} Resultados encontrados</h3>
      <p>
        Para: {filters.pricing}, clasificación {filters.classification}, capacidad de{' '}
        {filters.capacity} huéspedes
      </p>
      {/* <Masonry>
        {data.map(room => {export const getAllRooms = async (): Promise<IRoom[] | any> => {
  try {
    const response = await axiosRoom('/habitaciona')
    if (!response.data) {
      throw new Error('No se recibieron datos válidos en la respuesta')
    }
    return response.data as IRoom[]
  } catch (error: any) {
    if (!(error instanceof AxiosError)) {
      throw { message: error?.message }
    }
    const newError = {
      message: error.message,
      status: error.response?.status
    }
    throw newError
  }
}
          return (
            <div
              key={room.codigo + Date.now().toString() + room.nombre + String(Math.random() * 1000)}
            >
              <CardRoom data={room} />
            </div>
            // <div
            //   key={Math.random() * 1000000}
            //   style={{
            //     background: 'red',
            //     padding: '10px',
            //     maxWidth: '300px',
            //     margin: '10px',
            //     border: '1px solid black'
            //   }}
            // >
            //   {JSON.stringify(room)}
            // </div>
          )
        })}
      </Masonry> */}
    </article>
  )
}

export default RoomsContainer
