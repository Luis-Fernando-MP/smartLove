'use client'

import { useRooms } from 'hooks/useRooms'
import type { JSX } from 'react'

import CardRoom from '../cardRoom/cardRoom'

const RoomsContainer = (): JSX.Element => {
  const { data } = useRooms()
  return (
    <>
      {data.map(room => {
        return <CardRoom data={room} key={room.codigo} />
      })}
    </>
  )
}

export default RoomsContainer
