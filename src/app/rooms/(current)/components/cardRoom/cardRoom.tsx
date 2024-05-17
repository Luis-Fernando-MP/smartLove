/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import type { JSX, ReactNode } from 'react'
import { IRoom } from 'services/room/room.service.types'

import './style.scss'

interface ICardRoom {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  data: IRoom
}

const CardRoom = ({ data }: ICardRoom): JSX.Element => {
  const { codigo, estado, imagenesHabitacion, nombre, precio, serviciosHabitacion } = data
  return (
    <section className='cardRoom'>
      <Link href={`/rooms/${codigo}`}>Detalle</Link>
      <img src={imagenesHabitacion[0].urlImagen} alt={nombre} />
      <h4>{nombre}</h4>
    </section>
  )
}

export default CardRoom
