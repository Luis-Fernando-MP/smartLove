'use client'

import { useRouter } from 'next/navigation'
import { type JSX, useEffect } from 'react'

import { useRoomStore } from '../../store/room.store'
import useRegisterStore from '../store/useRegisterStore'
import useRequirementsStore from '../store/useRequirementsStore'

const Page = (para): JSX.Element => {
  const { totalAmount, fromDate, toDate, nights } = useRequirementsStore()
  const { formData } = useRegisterStore()
  const roomID = useRoomStore(store => store.id)
  const router = useRouter()
  useEffect(() => {
    const incompleteData = [totalAmount, fromDate, toDate, nights, ...Object.values(formData)].some(
      (v: any) => {
        return v === '' || v < 0 || v === null || v === undefined
      }
    )

    // if (!roomID) router.replace(`/rooms/`)
    // if (incompleteData) router.replace(`/rooms/${roomID}`)
    return () => {}
  }, [formData, fromDate, nights, roomID, router, toDate, totalAmount])

  return (
    <section>
      <pre>{JSON.stringify(formData)}</pre>
      <pre>{JSON.stringify({ totalAmount, fromDate, toDate, nights })}</pre>
      <pre>{JSON.stringify(roomID)}</pre>
    </section>
  )
}

export default Page
