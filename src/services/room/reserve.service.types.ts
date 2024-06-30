import { IRoom } from '../../shared/room.service.types'
import { Client } from './client.service.types'

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
