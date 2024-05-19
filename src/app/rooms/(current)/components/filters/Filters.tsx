'use client'

import { useQueryClient } from '@tanstack/react-query'
import { ROOMS_NAME_CACHE } from 'hooks/useRooms'
import type { JSX } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  TFilterRoomsValidator,
  capacitiesValues,
  classificationsValues,
  pricingValues,
  roomsResolver
} from 'shared/resolvers/rooms.resolver'

import useFilters from '../../store/useFilters.store'
import './style.scss'

const Filters = (): JSX.Element => {
  const { filters, setFIlters } = useFilters()
  const queryCLient = useQueryClient()

  const hookForm = useForm<TFilterRoomsValidator>({
    resolver: roomsResolver,
    defaultValues: {
      pricing: filters.pricing,
      classification: filters.classification,
      capacity: filters.capacity
    }
  })

  const { register, handleSubmit, reset, formState } = hookForm
  const { errors } = formState
  const { capacity: capacityError, classification: classyError, pricing: pricingError } = errors

  const onFormSubmit = (data: TFilterRoomsValidator) => {
    setFIlters(data)
    queryCLient.invalidateQueries({
      queryKey: [ROOMS_NAME_CACHE]
    })
    toast.success('Cargando filtros')
  }

  const onErrors = errors => {
    toast.error('Todos los campos de filtrado son necesarios')
    console.error('error', errors)
  }

  return (
    <article className='roomFilters'>
      <h4>Filtros de búsqueda</h4>
      <button className='roomFilters-reset' onClick={() => reset()}>
        Reset
      </button>
      <form onSubmit={handleSubmit(onFormSubmit, onErrors)} className='roomFilters-form'>
        <button type='submit' className='btn roomFilters-submit'>
          Filtrar
        </button>

        <section className={`roomFilters-section ${pricingError ? 'error' : ''}`}>
          <h5>Por precios:</h5>
          <p className='roomFilters-section__error'>{pricingError?.message}</p>
          {pricingValues.map(({ value, name }, i) => {
            return (
              <div className='roomFilters-section__option' key={`${value}-${i}`}>
                <input type='radio' id={`${value}-${i}`} value={value} {...register('pricing')} />
                <i />
                <label htmlFor={`${value}-${i}`}>{name}</label>
              </div>
            )
          })}
        </section>

        <section className={`roomFilters-section ${classyError ? 'error' : ''}`}>
          <h5>Por clasificación:</h5>
          <p className='roomFilters-section__error'>{classyError?.message}</p>
          {classificationsValues.map(({ value, name }, i) => {
            return (
              <div className='roomFilters-section__option' key={`${value}-${i}`}>
                <input
                  type='radio'
                  id={`${value}-${i}`}
                  value={value}
                  {...register('classification')}
                />
                <i />
                <label htmlFor={`${value}-${i}`}>{name}</label>
              </div>
            )
          })}
        </section>

        <section className={`roomFilters-section ${capacityError ? 'error' : ''}`}>
          <h5>Por capacidad:</h5>
          <p className='roomFilters-section__error'>{capacityError?.message}</p>
          {capacitiesValues.map(({ value, name }, i) => {
            return (
              <div className='roomFilters-section__option' key={`${value}-${i}`}>
                <input type='radio' id={`${value}-${i}`} value={value} {...register('capacity')} />
                <i />
                <label htmlFor={`${value}-${i}`}>{name}</label>
              </div>
            )
          })}
        </section>
      </form>
    </article>
  )
}

export default Filters
