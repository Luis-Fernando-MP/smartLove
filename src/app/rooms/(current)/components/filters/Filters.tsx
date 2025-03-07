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
import { FieldErrors, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import useFilters from '../../store/useFilters.store'
import './style.scss'

const Filters = (): JSX.Element => {
  const { filters, setFIlters } = useFilters()
  const { mutateAsync, isPending } = useFilterRooms()
  const queryClient = useQueryClient()

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
      const filterData = {
        pricing: data.pricing,
        classification: data.classification,
        capacity: data.capacity
      }

      const filteredRooms = (await mutateAsync(filterData)) ?? []
      queryClient.setQueryData([ROOMS_NAME_CACHE], filteredRooms)
      toast.success('Filtros aplicados con éxito', { id: toastId })
    } catch (error) {
      console.error('Error al aplicar filtros:', error)
      toast.error('Error al cargar los filtros', { id: toastId })
    }
    setFIlters(data)
  }

  const onErrors = (errors: FieldErrors<TFilterRoomsValidator>) => {
    toast.error('Todos los campos de filtrado son necesarios')
    console.error('error', errors)
  }

  const handleReset = async () => {
    const defaultFilters = { capacity: 'ALL', classification: 'ALL', pricing: 'ALL' }
    await onFormSubmit(defaultFilters)
    reset(defaultFilters)
  }

  return (
    <article className={`roomFilters ${switchClass(isPending, 'loading')}`}>
      <h3>Filtros de búsqueda</h3>
      <button className='roomFilters-reset' onClick={handleReset}>
        Reset
      </button>
      <form onSubmit={handleSubmit(onFormSubmit, onErrors)} className='roomFilters-form'>
        <button type='submit' className='btn roomFilters-submit'>
          Filtrar
        </button>

        <section className={`roomFilters-section ${switchClass(!!pricingError, 'error')}`}>
          <h5>Por precios:</h5>
          <p className='roomFilters-section__error'>{pricingError?.message?.toString()}</p>

          {pricingValues.map(({ value, name }, i) => {
            const idRelation = `pricing-${value}-${i}`
            return (
              <div className='roomFilters-section__option' key={idRelation}>
                <input {...register('pricing')} type='radio' id={idRelation} value={value} />
                <i />
                <label htmlFor={idRelation}>{name}</label>
              </div>
            )
          })}
        </section>

        <section className={`roomFilters-section ${switchClass(!!classyError, 'error')}`}>
          <h5>Por clasificación:</h5>
          <p className='roomFilters-section__error'>{classyError?.message?.toString()}</p>

          {classificationsValues.map(({ value, name }, i) => {
            const idRelation = `classification-${value}-${i}`

            return (
              <div className='roomFilters-section__option' key={idRelation}>
                <input {...register('classification')} type='radio' id={idRelation} value={value} />
                <i />
                <label htmlFor={idRelation}>{name}</label>
              </div>
            )
          })}
        </section>

        <section className={`roomFilters-section ${switchClass(!!capacityError, 'error')}`}>
          <h5>Por capacidad:</h5>
          <p className='roomFilters-section__error'>{capacityError?.message?.toString()}</p>

          {capacitiesValues.map(({ value, name }, i) => {
            const idRelation = `capacity-${value}-${i}`
            return (
              <div className='roomFilters-section__option' key={idRelation}>
                <input {...register('capacity')} type='radio' id={idRelation} value={value} />
                <i />
                <label htmlFor={idRelation}>{name}</label>
              </div>
            )
          })}
        </section>
      </form>
    </article>
  )
}

export default Filters
