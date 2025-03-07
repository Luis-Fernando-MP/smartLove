/* eslint-disable @next/next/no-img-element */
import { TFullDataRoom } from '@/app/api/rooms/route'
import { sansitaSwashed } from '@/shared/fonts'
import parseServiceToIcon from '@/shared/helpers/parseServiceToIcon'
import { ArrowUpRight, BanknoteIcon, CalendarRange } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { ReactNode } from 'react'

import SlugRoom from '../slugRoom/slugRoom'
import './style.scss'

interface IRoomsComponentV2 {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  room: TFullDataRoom
}

const RoomComponentV2 = ({ room }: IRoomsComponentV2): JSX.Element => {
  const { images, reservationCount, status, services, price, name, id } = room
  return (
    <li className='roomComponentV2' key={id}>
      <SlugRoom counter={reservationCount} itsFull={status} />
      <header className='roomComponentV2-header'>
        <img src={images[0].imageUrl} alt={name} loading='lazy' className='roomComponentV2-header__background' />
        <section className='roomComponentV2-header__images'>
          {images.map(image => {
            const { id, imageUrl } = image
            return <img key={id} src={imageUrl} alt={imageUrl} loading='lazy' className='roomComponentV2-header__image' />
          })}
        </section>
      </header>
      <article className='roomComponentV2-details'>
        <h3 className={sansitaSwashed.className}>{name}</h3>
        <p>Servicios de la habitación:</p>
        <ul className='roomComponentV2-services'>
          <li className='roomComponentV2-service price'>
            <BanknoteIcon />
            <h5>{String(price)}xNoche</h5>
          </li>
          {services.map(service => {
            const { Icon } = parseServiceToIcon(service.imageUrl)
            return (
              <li key={service.id} className='roomComponentV2-service'>
                <Icon /> <p>{service.serviceName}</p>
              </li>
            )
          })}
        </ul>
        <div className='roomComponentV2-actions'>
          <Link href={`/rooms/${id}/calendar`} className='btn roomComponentV2-action roomComponentV2-calendar'>
            Ver calendario
            <CalendarRange />
          </Link>
          <Link href={`/rooms/${id}`} className='btn roomComponentV2-action roomComponentV2-reserve'>
            Quiero reservarlo
            <ArrowUpRight />
          </Link>
        </div>
      </article>
    </li>
  )
}

export default RoomComponentV2
