import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schemeReservationResolver = z.object(
  {
    roomID: z.string().min(1, {
      message: 'Debe de escoger un ID valido'
    }),
    roomName: z.string().min(1, {
      message: 'Debe de escoger un nombre de habitación valido'
    }),
    comment: z
      .string()
      .regex(/^[a-zA-Z0-9\s]*[.,]?$/, {
        message: 'Solo se aceptan cadenas de texto, números, "," y "."'
      })
      .max(50, {
        message: 'El comentario debe de tener una extension maxima de 50 caracteres'
      })
      .nullable()
  },
  { description: 'filtros para la cancelación de una habitación' }
)

export type TReservationResolver = z.infer<typeof schemeReservationResolver>
export const reservationResolver = zodResolver(schemeReservationResolver)
