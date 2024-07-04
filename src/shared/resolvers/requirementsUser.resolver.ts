import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const onlyTextRegex = /^[a-zA-Z\s]*$/
const onlyNumberRegex = /^\d*$/g
const phoneNumberRegex = /^\d{9}$/
const locationRegex =
  /^(calle|av\.|jr\.|blvd\.|plaza|paseo|camino|ctra\.|carretera|autopista|via|carrera|vereda|sendero)[\w\s.,#\-/]*$/i

const schemeRequirementsUser = z.object({
  fullName: z
    .string()
    .regex(onlyTextRegex, {
      message: '❌ ¡Solo se permiten letras!'
    })
    .min(5, {
      message: '😃 ¡Necesitamos tus nombres completos! (mínimo 5 caracteres)'
    })
    .max(50, {
      message: '😃 ¡Tus nombres no pueden exceder los 50 caracteres!'
    }),
  lastName: z
    .string()
    .regex(onlyTextRegex, {
      message: '❌ ¡Solo se permiten letras!'
    })
    .min(10, {
      message: '🤔 ¡Tu apellido es obligatorio! (mínimo 10 caracteres)'
    })
    .max(80, {
      message: '😃 ¡Tus apellidos no pueden exceder los 80 caracteres!'
    }),
  country: z
    .string()
    .regex(onlyTextRegex, {
      message: '❌ ¡Solo se permiten letras!'
    })
    .min(3, {
      message: '🌍 ¡Necesitamos saber tu país!'
    }),
  location: z
    .string()
    .regex(locationRegex, {
      message: '❌ ¡Debe de empezar con Av., Jr., etc. y no tener caracteres especiales!'
    })
    .min(4, {
      message: '📍 ¡Ubicación necesaria! (mínimo 4 caracteres)'
    })
    .max(80, {
      message: '📍 ¡Tu ubicación no puede exceder los 80 caracteres!'
    }),
  passportOrID: z
    .string()
    .regex(onlyNumberRegex, {
      message: '❌ ¡Solo se permiten números!'
    })
    .min(5, {
      message: '🛂 ¡Pasaporte o DNI es requerido! (mínimo 5 caracteres)'
    })
    .max(10, {
      message: '🛂 ¡Pasaporte o DNI no puede exceder los 10 caracteres!'
    }),
  phone: z.string().regex(phoneNumberRegex, {
    message: '📱 ¡El número de celular debe tener exactamente 9 dígitos!'
  })
})

export type TRequirementsUser = z.infer<typeof schemeRequirementsUser>
export type TKeyRequirementsUser = keyof TRequirementsUser
export const requirementsUserResolver = zodResolver(schemeRequirementsUser)

export const keysValues = {
  Nombres: 'fullName',
  Apellidos: 'lastName',
  Ciudad: 'country',
  Dirección: 'location',
  'DNI o Carnet': 'passportOrID',
  Celular: 'phone'
}
