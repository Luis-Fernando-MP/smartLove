'use client'

import { useRooms } from 'hooks/useRooms'
import type { JSX } from 'react'
import { Masonry } from 'react-masonry'

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
      <Masonry>
        {data.map(room => {
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
      </Masonry>
    </article>
  )
}

export default RoomsContainer
