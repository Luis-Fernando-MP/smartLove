'use client'

import { Link } from 'next-view-transitions'
import { type JSX } from 'react'
import parseServiceToIcon from 'shared/helpers/parseServiceToIcon'

import { useRoomStore } from '../store/room.store'
import RecommendationController from './components/recommendation/RecommendationController'
import './style.scss'

const Page = (): JSX.Element | null => {
  const room = useRoomStore(store => store.room)
  if (!room) return null
  const { codigo, serviciosHabitacion } = room
  return (
    <>
      <ul className='currentRoom-services'>
        {serviciosHabitacion.map(service => {
          const { Icon } = parseServiceToIcon(service.urlImagen)
          return (
            <li className='btn currentRoom-service' key={service.idServHabitacion}>
              <Icon />
              <p>{service.nombreServicio}</p>
            </li>
          )
        })}
      </ul>
      <Link href={`/rooms/${codigo}/requirements`} className='btn currentRoom-continue bgr big'>
        Reservar ahora 🍀
      </Link>
      <h3 className='text-center'>
        <b className='gr'>Otras Habitaciones</b> Recomendadas 🛎️
      </h3>
      <RecommendationController />
    </>
  )
}

export default Page
