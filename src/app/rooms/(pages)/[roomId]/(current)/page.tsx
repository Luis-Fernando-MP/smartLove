'use client'

import Link from 'next/link'
import { type JSX } from 'react'

import useStepsRoom, { useRoomStore } from '../store/room.store'
import RecommendationController from './components/recommendation/RecommendationController'
import './style.scss'

const Page = (): JSX.Element => {
  const { setCurrentStep } = useStepsRoom()
  const roomID = useRoomStore(store => store.id)

  return (
    <>
      <Link
        href={`/rooms/${roomID}/requirements`}
        onClick={() => {
          setCurrentStep(2)
        }}
        className='btn currentRoom-continue'
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
