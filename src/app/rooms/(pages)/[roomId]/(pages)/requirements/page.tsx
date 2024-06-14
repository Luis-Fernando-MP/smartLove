'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type JSX, useEffect } from 'react'

import useStepsRoom, { useRoomStore } from '../../store/room.store'
import TotalCalculate from '../components/totalCalculate/TotalCalculate'
import './style.scss'

const Page = (): JSX.Element => {
  const { replace } = useRouter()
  const { currentStep } = useStepsRoom()
  const roomID = useRoomStore(store => store.id)

  // useEffect(() => {
  //   if (currentStep < 2) {
  //     replace(`/rooms/${roomID}/`)
  //   }
  //   return () => {}
  // }, [currentStep, replace, roomID])

  return (
    <section className='requirementsRoom'>
      <div className='requirementsRoom-actions'>
        <Link href={`/rooms/${roomID}/`} className='btn'>
          Regresar a los detalles
        </Link>
        <Link href={`/rooms/${roomID}/pay`} className='btn continue'>
          Continuar con la reserva
        </Link>
      </div>
      <TotalCalculate />
    </section>
  )
}

export default Page
