'use client'

/* eslint-disable @next/next/no-img-element */
import { TFullDataRoom } from '@/app/api/rooms/route'
import { sansitaSwashed } from '@/shared/fonts'
import parseServiceToIcon from '@/shared/helpers/parseServiceToIcon'
import SlugRoom from '@/shared/ui/slugRoom/slugRoom'
import { Image } from '@unpic/react'
import { BanknoteIcon, CalendarDaysIcon, ImagesIcon, KeyIcon, LandPlotIcon } from 'lucide-react'
import { Link } from 'next-view-transitions'
import type { JSX } from 'react'

import './style.scss'

interface ICardRoom {
  className?: string
  data: TFullDataRoom
}

const CardRoom = ({ data, className }: ICardRoom): JSX.Element => {
  const { reservationCount, status, name, description, price, id } = data
  const { images, services } = data

  return (
    <article className={`cardRoom ${className}`}>
      <SlugRoom counter={reservationCount} itsFull={status} />
      <section className='cardRoom-images'>
        <Image
          src={images[0].imageUrl}
          alt={`Habitación ${name}`}
          className='cardRoom-background'
          layout='fullWidth'
          fetchPriority='low'
        />
        {images.slice(0, 3).map(image => {
          return (
            <Image
              key={image.id}
              src={image.imageUrl}
              alt={image.imageUrl}
              className='cardRoom-image'
              layout='fullWidth'
              fetchPriority='low'
            />
          )
        })}
      </section>

      <div className='cardRoom-information'>
        <h4 className={sansitaSwashed.className}>{name}</h4>
        <p className='cardRoom-descriptions'>{description}</p>
      </div>

      <ul className='cardRoom-services'>
        <li className='cardRoom-service price'>
          <BanknoteIcon />
          {String(price)}
        </li>
        {services.map(service => {
          const { id, serviceName, imageUrl } = service
          const { Icon } = parseServiceToIcon(imageUrl)
          return (
            <li className='cardRoom-service' key={id}>
              <Icon />
              <span>{serviceName}</span>
            </li>
          )
        })}
      </ul>

      <section className='cardRoom-actions'>
        <Link href={`/rooms/${id}/calendar`} className='btn cardRoom-action'>
          <CalendarDaysIcon />
        </Link>
        <Link href={`/rooms/${id}`} className='btn cardRoom-action middle'>
          <KeyIcon />
        </Link>
        <Link href={`/rooms/${id}/images`} className='btn cardRoom-action'>
          <ImagesIcon />
        </Link>
      </section>
    </article>
  )
}

export default CardRoom
