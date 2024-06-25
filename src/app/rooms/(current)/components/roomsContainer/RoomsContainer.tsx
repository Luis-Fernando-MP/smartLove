'use client'

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

  return (
    <>
      <h3>
        <b className='gr'>{data.length} Resultados</b> encontrados
      </h3>
      <p>
        Para: <b className='gr'>{filters.pricing}</b>, clasificación
        <b className='gr'>{filters.classification}</b>, capacidad de
        <b className='gr'>{filters.capacity}</b> huéspedes
      </p>
      <Masonry>
        {data.map(room => (
          <div
            key={room.codigo + Date.now().toString() + room.nombre + String(Math.random() * 1000)}
          >
            <CardRoom data={room} />
          </div>
        ))}
      </Masonry>
    </>
  )
}

export default RoomsContainer
