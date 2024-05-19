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

export type TFilterRoomsValidator = z.infer<typeof schemeRoomsValidator>
export const roomsResolver = zodResolver(schemeRoomsValidator)

export const pricingValues = [
  {
    value: '<40',
    name: 'Menos de $40'
  },
  {
    value: '[50, 100]',
    name: 'De $50 a $100'
  },
  {
    value: '[100, 150]',
    name: 'De $100 a $150'
  },
  {
    value: '>40',
    name: 'Más de $40'
  }
]

export const classificationsValues = [
  {
    value: 'all',
    name: 'Todos'
  },
  {
    value: 'excellent',
    name: 'Excelente'
  },
  {
    value: 'veryGood',
    name: 'Muy bueno'
  },
  {
    value: 'good',
    name: 'Bueno'
  }
]

export const capacitiesValues = [
  {
    value: '1',
    name: 'apartamento personal'
  },
  {
    value: '[1, 2]',
    name: 'De 1 a 2 huéspedes'
  },
  {
    value: '[2, 4]',
    name: 'apartamento personal'
  },
  {
    value: '>4',
    name: 'Más de 4 huéspedes'
  }
]
