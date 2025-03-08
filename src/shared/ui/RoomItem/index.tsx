/* eslint-disable @next/next/no-img-element */
import { TFullDataRoom } from '@/app/api/rooms/route'
import { sansitaSwashed } from '@/shared/fonts'
import parseServiceToIcon from '@/shared/helpers/parseServiceToIcon'
import { Image } from '@unpic/react'
import { ArrowUpRight, BanknoteIcon, CalendarRange } from 'lucide-react'
import { Link } from 'next-view-transitions'

import SlugRoom from '../slugRoom/slugRoom'
import './style.scss'

interface IRoomItem {
  room: TFullDataRoom
}

const RoomItem = ({ room }: IRoomItem) => {
  const { images, reservationCount, status, services, price, name, id } = room
  return (
    <li className='roomItem' key={id}>
      <SlugRoom counter={reservationCount} itsFull={status} />

      <header className='roomItem-header'>
        <Image src={images[0].imageUrl} alt={name} loading='lazy' className='roomItem-background' layout='fullWidth' />

        <section className='roomItem-images'>
          {images.map(image => {
            const { id, imageUrl } = image
            return (
              <div className='roomItem-image' key={id}>
                <Image src={imageUrl} alt={imageUrl} layout='constrained' width={80} height={80} />
              </div>
            )
          })}
        </section>
      </header>

      <article className='roomItem-details'>
        <h3 className={sansitaSwashed.className}>{name}</h3>
        <p>Servicios de la habitación:</p>

        <ul className='roomItem-services'>
          <li className='roomItem-service price'>
            <BanknoteIcon />
            <h5>{String(price)}xNoche</h5>
          </li>

          {services.map(service => {
            const { Icon } = parseServiceToIcon(service.imageUrl)
            return (
              <li key={service.id} className='roomItem-service'>
                <Icon /> <p>{service.serviceName}</p>
              </li>
            )
          })}
        </ul>
        <div className='roomItem-actions'>
          <Link href={`/rooms/${id}/calendar`} className='btn roomItem-action roomItem-calendar'>
            Ver calendario
            <CalendarRange />
          </Link>
          <Link href={`/rooms/${id}`} className='btn roomItem-action roomItem-reserve'>
            Quiero reservarlo
            <ArrowUpRight />
          </Link>
        </div>
      </article>
    </li>
  )
}

export default RoomItem
