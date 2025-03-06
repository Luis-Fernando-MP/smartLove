'use client'

import { ROOMS_NAME_CACHE, useFilterRooms } from '@/hooks/useRooms'
import { switchClass } from '@/shared/helpers/switchClassName'
import {
  TFilterRoomsValidator,
  capacitiesValues,
  classificationsValues,
  pricingValues,
  roomsResolver
} from '@/shared/resolvers/rooms.resolver'
import { useQueryClient } from '@tanstack/react-query'
import type { JSX } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import useFilters from '../../store/useFilters.store'
import './style.scss'

const Filters = (): JSX.Element => {
  const { filters, setFIlters } = useFilters()
  const { mutateAsync } = useFilterRooms()
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

  const onFormSubmit = async (data: TFilterRoomsValidator) => {
    const toastId = toast.loading('Cargando filtros', { id: 'toastFilters' })

    try {
      const filteredRooms = (await mutateAsync(data)) ?? []
      queryCLient.setQueryData([ROOMS_NAME_CACHE], filteredRooms)
      toast.success('Filtros aplicados con éxito', { id: toastId })
    } catch (error) {
      console.error('Error al aplicar filtros:', error)
      toast.error('Error al cargar los filtros', { id: toastId })
    } finally {
      toast.remove(toastId)
    }
    setFIlters(data)
  }

  const onErrors = errors => {
    toast.error('Todos los campos de filtrado son necesarios')
    console.error('error', errors)
  }

  const handleReset = async () => {
    await onFormSubmit({ capacity: 'ALL', classification: 'ALL', pricing: 'ALL' })
    reset()
  }

  return (
    <article className='roomFilters'>
      <h4>Filtros de búsqueda</h4>
      <button className='roomFilters-reset' onClick={handleReset}>
        Reset
      </button>
      <form onSubmit={handleSubmit(onFormSubmit, onErrors)} className='roomFilters-form'>
        <button type='submit' className='btn roomFilters-submit'>
          Filtrar
        </button>

        <section className={`roomFilters-section ${switchClass(pricingError, 'error')}`}>
          <h5>Por precios:</h5>
          <p className='roomFilters-section__error'>{String(pricingError?.message ?? '')}</p>
          {pricingValues.map(({ value, name }, i) => {
            const vl = String(value)
            const nm = String(name)
            return (
              <div className='roomFilters-section__option' key={`${vl}-${i}`}>
                <input type='radio' id={`${vl}-${i}`} value={value} {...register('pricing')} />
                <i />
                <label htmlFor={`${vl}-${i}`}>{nm}</label>
              </div>
            )
          })}
        </section>

        <section className={`roomFilters-section ${switchClass(classyError, 'error')}`}>
          <h5>Por clasificación:</h5>
          <p className='roomFilters-section__error'>{String(classyError?.message ?? '')}</p>
          {classificationsValues.map(({ value, name }, i) => {
            const vl = String(value)
            const nm = String(name)
            return (
              <div className='roomFilters-section__option' key={`${vl}-${i}`}>
                <input type='radio' id={`${vl}-${i}`} value={vl} {...register('classification')} />
                <i />
                <label htmlFor={`${vl}-${i}`}>{nm}</label>
              </div>
            )
          })}
        </section>

        <section className={`roomFilters-section ${switchClass(capacityError, 'error')}`}>
          <h5>Por capacidad:</h5>
          <p className='roomFilters-section__error'>{String(capacityError?.message)}</p>
          {capacitiesValues.map(({ value, name }, i) => {
            const vl = String(value)
            const nm = String(name)
            return (
              <div className='roomFilters-section__option' key={`${vl}-${i}`}>
                <input type='radio' id={`${vl}-${i}`} value={vl} {...register('capacity')} />
                <i />
                <label htmlFor={`${vl}-${i}`}>{nm}</label>
              </div>
            )
          })}
        </section>
      </form>
    </article>
  )
}

export default Filters
