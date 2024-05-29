/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight, DollarSignIcon } from 'lucide-react'
import Link from 'next/link'
import type { JSX, ReactNode } from 'react'
import { IRoom } from 'services/room/room.service.types'
import parseServiceToIcon from 'shared/helpers/parseServiceToIcon'

import SlugRoom from '../slugRoom/slugRoom'
import './style.scss'

interface IRoomsComponentV2 {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  room: IRoom
}

const RoomComponentV2 = ({ room }: IRoomsComponentV2): JSX.Element => {
  const {
    codigo,
    nombre,
    imagenesHabitacion,
    contadorreserva,
    onSale,
    estado,
    serviciosHabitacion,
    precio
  } = room
  return (
    <li className='roomComponentV2' key={codigo}>
      <article className='roomComponentV2-details'>
        <h3>{nombre}</h3>
        <ul className='roomComponentV2-services'>
          <li className='roomComponentV2-service price'>
            <DollarSignIcon />
            <h5>{precio}xNoche</h5>
          </li>
          {serviciosHabitacion.map(service => {
            const { Icon } = parseServiceToIcon(service.urlImagen)
            return (
              <li key={service.idServHabitacion} className='roomComponentV2-service'>
                <Icon /> <p>{service.nombreServicio}</p>
              </li>
            )
          })}
        </ul>
        <Link href={`/rooms/${codigo}`} className='btn roomComponentV2-go'>
          Disponible <ArrowUpRight />
        </Link>
      </article>
      <section className='roomComponentV2-more'>
        <SlugRoom counter={contadorreserva} onSale={onSale} itsFull={estado} />
        <img
          src={imagenesHabitacion[0].urlImagen}
          alt={nombre}
          loading='lazy'
          className='roomComponentV2-image'
        />
      </section>
    </li>
  )
}

export default RoomComponentV2
