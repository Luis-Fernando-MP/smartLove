export enum APP_ROLES {
  ADMIN = 'admin',
  USER = 'user'
}

export interface IRoom {
  codigo: string
  nombre: string
  precio: number
  estado: boolean
  counter: number
  onSale: boolean
  usrcreacion: APP_ROLES
  usredicion: APP_ROLES
  serviciosHabitacion: IRoomService[]
  imagenesHabitacion: IRoomImages[]
}

export interface IRoomService {
  idServHabitacion: string
  nombreServicio: string
  urlImagen: string
  estado: boolean
  usrCreacion: string
  fechCreacion: Date
  usrEdicion: APP_ROLES
  fechEdicion: Date
}

export interface IRoomImages {
  idImgHabitacion: string
  urlImagen: string
  estado: boolean
  usrCreacion: APP_ROLES
  fechCreacion: Date
  usrEdicion: APP_ROLES
  fechEdicion: Date
}
