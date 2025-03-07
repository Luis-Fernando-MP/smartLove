'use client'

import { useRooms } from '@/hooks/useRooms'
import { newKey } from '@/shared/key'
import type { JSX } from 'react'

import useFilters from '../../store/useFilters.store'
import CardRoom from '../cardRoom/cardRoom'
import RoomsLoader from './RoomsLoader'
import './style.scss'

const RoomsContainer = (): JSX.Element | null => {
  const { data, isLoading } = useRooms()
  const filters = useFilters(data => data.filters)
  if (isLoading) return <RoomsLoader />
  if (!data) return null

  const areFiltersApplied = filters.pricing !== 'ALL' || filters.classification !== 'ALL' || filters.capacity !== 'ALL'
  return (
    <article className='roomsContainer'>
      <h3>
        <b className='gr'>{data.length} Resultados</b> encontrados
      </h3>
      {areFiltersApplied && (
        <div className='roomsContainer-filtered'>
          <p>
            Para: <b className='gr'>{filters.pricing}</b>,
          </p>
          <p>
            clasificación <b className='gr'>{filters.classification}</b>,
          </p>
          <p>
            capacidad de <b className='gr'>{filters.capacity}</b> huéspedes
          </p>
        </div>
      )}

      <section className='roomsContainer-masonry'>
        {data.map(room => (
          <CardRoom data={room} key={newKey()} className='roomsContainer-masonry__item' />
        ))}
      </section>
    </article>
  )
}

export default RoomsContainer
