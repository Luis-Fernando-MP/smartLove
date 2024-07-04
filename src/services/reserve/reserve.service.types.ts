import { Client } from '../room/client.service.types'
import { IRoom } from '../room/room.service.types'

export interface IReservation {
  idReserva: number
  fechaIngreso: string
  fechaSalida: string
  totalDias: number
  total: number
  estado: number
  habitacion: IRoom
  cliente: Client
  subtotal: number
  igv: number
  montoServicios: number
}

export interface ISendReserveData {
  cliente: {
    fullName: string
    lastName: string
    email: string
    country: string
    location: string
    passportOrID: string
    phone: string
  }
  habitacion: { codigo: number }
  fechaIngreso: string
  fechaSalida: string
  totalDias: number
  subtotal: number
  igv: number
  total: number
  estado: number
  id: string
}
