/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight, Bed, DollarSign, InfoIcon } from 'lucide-react'
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
      <p className='cardRoom-slug'>
        <InfoIcon />
        Tu mejor opción
      </p>
      <img src={imagenesHabitacion[0].urlImagen} alt={nombre} className='cardRoom-image' />
      <h5>{nombre}</h5>
      <ul className='cardRoom-services'>
        {serviciosHabitacion.map(services => {
          const { nombreServicio, idServHabitacion } = services
          return (
            <li className='cardRoom-service' key={idServHabitacion}>
              <Bed />
              <p>{nombreServicio}</p>
            </li>
          )
        })}
        <li className='cardRoom-service'>
          <DollarSign />
          {precio}
        </li>
      </ul>
      <Link href={`/rooms/${codigo}`} className={`btn cardRoom-go ${estado ? '' : 'no-space'}`}>
        {estado ? 'Disponible' : 'Agotado'} <ArrowUpRight />
      </Link>
    </section>
  )
}

export default CardRoom
