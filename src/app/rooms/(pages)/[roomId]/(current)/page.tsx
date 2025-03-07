'use client'

import parseServiceToIcon from '@/shared/helpers/parseServiceToIcon'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { type JSX } from 'react'

import { useRoomStore } from '../store/room.store'
import RecommendationController from './components/recommendation/RecommendationController'
import './style.scss'

const Page = (): JSX.Element | null => {
  const room = useRoomStore(store => store.room)
  if (!room) return null
  const { id, services } = room
  return (
    <>
      <ul className='currentRoom-services'>
        {services.map(service => {
          const { Icon } = parseServiceToIcon(service.imageUrl)
          return (
            <li className='btn currentRoom-service' key={service.id}>
              <Icon />
              <p>{service.serviceName}</p>
            </li>
          )
        })}
      </ul>
      <Link href={`/rooms/${id}/requirements`} className='currentRoom-continue'>
        Reservar ahora 🍀
        <ArrowUpRight />
      </Link>
      <h3 className='font3 text-center'>
        <b className='gr'>Otras Habitaciones</b> Recomendadas 🛎️
      </h3>
      <RecommendationController />
    </>
  )
}

export default Page
