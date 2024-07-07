export enum APP_ROLES {
  ADMIN = 'admin',
  USER = 'user'
}

export interface IRoom {
  codigo: number
  nombre: string
  precio: number
  estado: boolean
  contadorreserva: number
  clasificacion: 'Estandar'
  cantidad: number
  counter: number
  preciovalor: 'estandar'
  descripcion: string
  serviciosHabitacion: IRoomService[]
  imagenesHabitacion: IRoomImages[]
  fechas?: IRoomBusyDays[]
}

export interface IRoomService {
  idServHabitacion: number
  nombreServicio: string
  urlImagen: string
  estado: boolean
  usrCreacion: string
}

export interface IRoomImages {
  idImgHabitacion: number
  urlImagen: string
  estado: boolean
  fechCreacion: string
}

export interface IRoomBusyDays {
  fechaInicio: string
  fechaFin: string
}
