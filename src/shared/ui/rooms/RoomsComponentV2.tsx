import type { JSX, ReactNode } from 'react'
import { IRoom } from 'services/room/room.service.types'

interface IRoomsComponentV2 {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  room: IRoom
}

const RoomsComponentV2 = ({ room }: IRoomsComponentV2): JSX.Element => {
  const { codigo, nombre } = room
  return (
    <li className='roomsV2-room' key={codigo}>
      <h4>{nombre}</h4>
    </li>
  )
}

export default RoomsComponentV2
