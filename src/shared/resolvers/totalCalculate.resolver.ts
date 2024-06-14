import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schemeTotalCalculateResolver = z.object(
  {
    days: z.number().max(30, {
      message: 'La cantidad de días de reservas es necesario'
    }),
    fromDate: z.coerce.date({
      message: 'Fecha de inicio invalida'
    }),
    toDate: z.coerce.date({
      message: 'Fecha de salida invalida'
    }),
    total: z.number({
      message: 'El total de pago, no es valido'
    })
  },
  { description: 'filtros para la validar el calculo de costo total/tiempo' }
)

export type TTotalCalculateResolver = z.infer<typeof schemeTotalCalculateResolver>
export const totalCalculateResolver = zodResolver(schemeTotalCalculateResolver)
