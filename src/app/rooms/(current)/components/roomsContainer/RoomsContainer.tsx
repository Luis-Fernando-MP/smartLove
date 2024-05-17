'use client'

import { useRooms } from 'hooks/useRooms'
import type { JSX } from 'react'

import useFilters from '../../store/useFilters.store'
import CardRoom from '../cardRoom/cardRoom'
import './style.scss'

const RoomsContainer = (): JSX.Element => {
  const { data } = useRooms()
  const filters = useFilters(data => data.filters)

  return (
    <article className='roomsContainer'>
      <h3>{data.length} Resultados encontrados</h3>
      <p>
        Para: {filters.pricing}, clasificación {filters.classification}, capacidad de{' '}
        {filters.capacity} huéspedes
      </p>
      <article className='roomsContainer-items'>
        {data.map(room => {
          return <CardRoom data={room} key={room.codigo} />
        })}
      </article>
    </article>
  )
}

export default RoomsContainer
