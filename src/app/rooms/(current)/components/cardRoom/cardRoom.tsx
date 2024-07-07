'use client'

/* eslint-disable @next/next/no-img-element */
import { BanknoteIcon, CalendarDaysIcon, ImagesIcon, LandPlotIcon } from 'lucide-react'
import { Link } from 'next-view-transitions'
import type { JSX, ReactNode } from 'react'
import { IRoom } from 'services/room/room.service.types'
import { sansitaSwashed } from 'shared/fonts'
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
    contadorreserva,
    descripcion
  } = data
  return (
    <article className='cardRoom'>
      <SlugRoom counter={contadorreserva} itsFull={estado} />
      <section className='cardRoom-images'>
        {imagenesHabitacion.slice(0, 3).map(image => {
          return (
            <img
              key={image.idImgHabitacion}
              src={image.urlImagen}
              alt={image.urlImagen}
              className='cardRoom-image'
              loading='lazy'
            />
          )
        })}
        <img
          src={imagenesHabitacion[0].urlImagen}
          alt={nombre}
          className='cardRoom-images__background'
          loading='lazy'
        />
      </section>

      <div className='cardRoom-information'>
        <h4 className={sansitaSwashed.className}>{nombre}</h4>
        <p className='cardRoom-descriptions'>{descripcion}</p>
      </div>

      <ul className='cardRoom-services'>
        <li className='cardRoom-service price'>
          <BanknoteIcon />
          {precio}
        </li>
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
      </ul>

      <section className='cardRoom-actions'>
        <Link href={`/rooms/${codigo}/calendar`} className='btn cardRoom-action'>
          <CalendarDaysIcon />
        </Link>
        <Link href={`/rooms/${codigo}`} className='btn cardRoom-action'>
          <LandPlotIcon />
        </Link>
        <Link href={`/rooms/${codigo}/images`} className='btn cardRoom-action'>
          <ImagesIcon />
        </Link>
      </section>
    </article>
  )
}

export default CardRoom
