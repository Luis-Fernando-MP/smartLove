/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schemeRoomsValidator = z.object(
  {
    pricing: z.string({
      message: 'Debe de escoger uno de los precios'
    }),
    classification: z.string({
      message: 'Debe de escoger una de las clasificaciones'
    }),
    capacity: z.string({
      message: 'Debe de escoger una de las capacidades'
    })
  },
  { description: 'filtros para las habitaciones' }
)

export interface TFilterRoomsValidator {
  pricing: string
  classification: string
  capacity: string
}

export const roomsResolver = zodResolver(schemeRoomsValidator)

export const pricingValues = [
  {
    value: 'ALL',
    name: 'Todos'
  },
  {
    value: 'LESS_THAN_40',
    name: 'Menos de $40'
  },
  {
    value: 'BETWEEN_40_AND_89',
    name: 'Entre $50 a $90'
  },
  {
    value: 'BETWEEN_90_AND_140',
    name: 'Entre $90 a $140'
  },
  {
    value: 'MORE_THAN_140',
    name: 'Más de $140'
  }
]

export const classificationsValues = [
  {
    value: 'ALL',
    name: 'Todos'
  },
  {
    value: 'EXCELLENT',
    name: 'Excelente'
  },
  {
    value: 'VERY_GOOD',
    name: 'Muy bueno'
  },
  {
    value: 'GOOD',
    name: 'Bueno'
  }
]

export const capacitiesValues = [
  {
    value: 'ALL',
    name: 'Todos'
  },
  {
    value: 'LESS_THAN_TWO',
    name: 'apartamento personal'
  },
  {
    value: 'TWO_TO_THREE',
    name: 'De 1 a 2 huéspedes'
  },
  {
    value: 'FOUR_TO_SIX',
    name: 'De 4 a 6 huéspedes'
  },
  {
    value: 'MORE_THAN_SIX',
    name: 'Más de 6 huéspedes'
  }
]
