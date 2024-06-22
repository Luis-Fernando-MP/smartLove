'use client'

import Link from 'next/link'
import { type JSX } from 'react'
import parseServiceToIcon from 'shared/helpers/parseServiceToIcon'

import useStepsRoom, { useRoomStore } from '../store/room.store'
import RecommendationController from './components/recommendation/RecommendationController'
import './style.scss'

const Page = (): JSX.Element | null => {
  const { setCurrentStep } = useStepsRoom()
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
      <Link
        href={`/rooms/${codigo}/requirements`}
        onClick={() => {
          setCurrentStep(2)
        }}
        className='btn currentRoom-continue bgr'
      >
        Continuar con la Reserva
      </Link>
      <h4 className='text-center'>
        Otras <b className='gr'>Recomendaciones</b>
      </h4>
      <RecommendationController />
    </>
  )
}

export default Page
