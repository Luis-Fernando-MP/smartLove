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
  console.log(data)

  return (
    <section className='dashboard-body'>
      <article className='roomsContainer'>
        <h3>{data.length} Resultados encontrados</h3>
        <p>
          Para: {filters.pricing}, clasificación {filters.classification}, capacidad de{' '}
          {filters.capacity} huéspedes
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
      </article>
    </section>
  )
}

export default RoomsContainer
