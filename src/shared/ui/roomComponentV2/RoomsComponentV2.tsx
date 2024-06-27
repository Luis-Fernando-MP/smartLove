/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight, BanknoteIcon, CalendarRange } from 'lucide-react'
import Link from 'next/link'
import type { JSX, ReactNode } from 'react'
import { IRoom } from 'services/room/room.service.types'
import { sansitaSwashed } from 'shared/fonts'
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
      <SlugRoom counter={contadorreserva} onSale={onSale} itsFull={estado} />
      <header className='roomComponentV2-header'>
        <img
          src={imagenesHabitacion[0].urlImagen}
          alt={nombre}
          loading='lazy'
          className='roomComponentV2-header__background'
        />
        <section className='roomComponentV2-header__images'>
          {imagenesHabitacion.map(image => {
            return (
              <img
                key={image.idImgHabitacion}
                src={image.urlImagen}
                alt={image.urlImagen}
                loading='lazy'
                className='roomComponentV2-header__image'
              />
            )
          })}
        </section>
      </header>
      <article className='roomComponentV2-details'>
        <h3 className={sansitaSwashed.className}>{nombre}</h3>
        <p>Servicios de la habitación:</p>
        <ul className='roomComponentV2-services'>
          <li className='roomComponentV2-service price'>
            <BanknoteIcon />
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
        <div className='roomComponentV2-actions'>
          <Link
            href={`/rooms/${codigo}/calendar`}
            className='btn  roomComponentV2-action roomComponentV2-calendar'
          >
            Ver calendario
            <CalendarRange />
          </Link>
          <Link
            href={`/rooms/${codigo}`}
            className='btn roomComponentV2-action roomComponentV2-reserve'
          >
            Quiero reservarlo
            <ArrowUpRight />
          </Link>
        </div>
      </article>
    </li>
  )
}

export default RoomComponentV2
