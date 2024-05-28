'use client'

import { useRooms } from 'hooks/useRooms'
import type { JSX } from 'react'

const RoomsComponentV2 = (): JSX.Element | null => {
  const rooms = useRooms()
  console.log(rooms)

  // if (data === undefined) return null
  return (
    <ul className='roomsV2'>
      {/* {data.map(room => {
        const { codigo, nombre } = room
        return (
          <li className='roomsV2-room' key={codigo}>
            <h4>{nombre}</h4>
          </li>
        )
      })} */}
    </ul>
  )
}

export default RoomsComponentV2
