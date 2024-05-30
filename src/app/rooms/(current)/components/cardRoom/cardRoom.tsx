'use client'

/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight, DollarSign } from 'lucide-react'
import Link from 'next/link'
import type { JSX, ReactNode } from 'react'
import { IRoom } from 'services/room/room.service.types'
import parseServiceToIcon from 'shared/helpers/parseServiceToIcon'
import SlugRoom from 'shared/ui/slugRoom/slugRoom'

import './style.scss'

interface ICardRoom {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  data: IRoom
}

const CardRoom = ({ data }: ICardRoom): JSX.Element => {
  const {
    codigo,
    estado,
    imagenesHabitacion,
    nombre,
    precio,
    serviciosHabitacion,
    onSale,
    contadorreserva
  } = data
  return (
    <section className='cardRoom'>
      <SlugRoom counter={contadorreserva} onSale={onSale} itsFull={estado} />
      <img
        src={imagenesHabitacion[0].urlImagen}
        alt={nombre}
        className='cardRoom-image'
        height={100}
        loading='lazy'
      />
      <h5>{nombre}</h5>
      <ul className='cardRoom-services'>
        {serviciosHabitacion.map(services => {
          const { nombreServicio, idServHabitacion } = services

          const { Icon } = parseServiceToIcon(services.urlImagen)
          return (
            <li className='cardRoom-service' key={idServHabitacion}>
              <Icon />
              <span>{nombreServicio}</span>
            </li>
          )
        })}
        <li className='cardRoom-service'>
          <DollarSign />
          {precio}
        </li>
      </ul>
      <Link href={`/rooms/${codigo}`} className={`btn cardRoom-go ${onSale ? '' : 'no-space'}`}>
        {onSale ? 'Disponible' : 'Agotado'} <ArrowUpRight />
      </Link>
    </section>
  )
}

export default CardRoom
