'use client'

import { type JSX } from 'react'

import { useRoomStore } from '../../store/room.store'
import useRegisterStore from '../store/useRegisterStore'
import useRequirementsStore from '../store/useRequirementsStore'

const Page = (): JSX.Element => {
  const { totalAmount, fromDate, toDate, nights } = useRequirementsStore()
  const { formData } = useRegisterStore()
  const roomID = useRoomStore(store => store.id)

  return (
    <section>
      <pre>{JSON.stringify(formData)}</pre>
      <pre>{JSON.stringify({ totalAmount, fromDate, toDate, nights })}</pre>
      <pre>{JSON.stringify(roomID)}</pre>
    </section>
  )
}

export default Page
