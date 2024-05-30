'use client'

import { useRouter } from 'next/navigation'
import { type JSX, useEffect } from 'react'

import useStepsRoom, { useRoomStore } from '../../store/room.store'

const Page = (): JSX.Element => {
  const { replace } = useRouter()

  const { currentStep } = useStepsRoom()

  const roomID = useRoomStore(store => store.id)

  useEffect(() => {
    if (currentStep < 2) {
      replace(`/rooms/${roomID}/`)
    }
    return () => {}
  }, [currentStep, replace, roomID])

  return <section>Requerimientos</section>
}

export default Page
