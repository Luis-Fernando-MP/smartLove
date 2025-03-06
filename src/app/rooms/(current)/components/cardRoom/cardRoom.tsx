'use client'

/* eslint-disable @next/next/no-img-element */
import { sansitaSwashed } from '@/shared/fonts'
import parseServiceToIcon from '@/shared/helpers/parseServiceToIcon'
import SlugRoom from '@/shared/ui/slugRoom/slugRoom'
import { TFullDataRoom } from 'app/api/rooms/route'
import { BanknoteIcon, CalendarDaysIcon, ImagesIcon, LandPlotIcon } from 'lucide-react'
import { Link } from 'next-view-transitions'
import type { JSX, ReactNode } from 'react'

import './style.scss'

interface ICardRoom {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  data: TFullDataRoom
}

const CardRoom = ({ data }: ICardRoom): JSX.Element => {
  const { reservationCount, status, name, description, price, id } = data
  const { images, services } = data

  return (
    <article className='cardRoom'>
      <SlugRoom counter={reservationCount} itsFull={status} />
      <section className='cardRoom-images'>
        {images.slice(0, 3).map(image => {
          return <img key={image.id} src={image.imageUrl} alt={image.imageUrl} className='cardRoom-image' loading='lazy' />
        })}
        <img src={images[0].imageUrl} alt={`Habitación ${name}`} className='cardRoom-images__background' loading='lazy' />
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
        <Link href={`/rooms/${id}`} className='btn cardRoom-action'>
          <LandPlotIcon />
        </Link>
        <Link href={`/rooms/${id}/images`} className='btn cardRoom-action'>
          <ImagesIcon />
        </Link>
      </section>
    </article>
  )
}

export default CardRoom
