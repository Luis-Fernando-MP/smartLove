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
  'Menos de $40',
  'De $50 a $100',
  'De $100 a $150',
  'Más de $40'
]

export const classificationsValues = [
  'Todos',
  'Excelente',
  'Muy bueno',
  'Bueno'
]

export const capacitiesValues = [
  'apartamento personal',
  'De 1 a 2 huéspedes',
  'De 2 a 4 huéspedes',
  'Más de 4 huéspedes'
]
