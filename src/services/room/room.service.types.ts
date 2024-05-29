export enum APP_ROLES {
  ADMIN = 'admin',
  USER = 'user'
}

export interface IRoom {
  codigo: number
  nombre: string
  precio: number
  estado: boolean
  usrcreacion: string
  usredicion: string
  contadorreserva: number
  clasificacion: string
  cantidad: number
  onSale: boolean
  counter: number
  preciovalor: string
  serviciosHabitacion: IRoomService[]
  imagenesHabitacion: IRoomImages[]
}

export interface IRoomService {
  idServHabitacion: number
  nombreServicio: string
  urlImagen: string
  estado: boolean
  usrCreacion: string
  fechCreacion: string
  usrEdicion: string
  fechEdicion: string
}

export interface IRoomImages {
  idImgHabitacion: number
  urlImagen: string
  estado: boolean
  usrCreacion: string
  fechCreacion: string
  usrEdicion: string
  fechEdicion: string
}
