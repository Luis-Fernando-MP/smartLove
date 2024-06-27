import { IRoom } from './room.service.types'

export interface IReservation {
  idReserva: number
  fechaIngreso: string
  fechaSalida: string
  totalDias: number
  total: number
  estado: number
  habitacion: IRoom
  subtotal: number
  igv: number
  montoServicios: number
}
