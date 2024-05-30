/* eslint-disable @next/next/no-img-element */
import type { JSX } from 'react'

import { useRoomStore } from '../../store/room.store'
import './style.scss'

const Nav = (): JSX.Element | null => {
  const { room } = useRoomStore()

  return (
    <ul className='roomNav-images'>
      {room?.imagenesHabitacion.map(image => {
        const { urlImagen, idImgHabitacion, fechCreacion } = image

        return (
          <li key={idImgHabitacion} className='roomNav-item'>
            <img src={urlImagen} alt={fechCreacion.toString()} className='roomNav-image' />
          </li>
        )
      })}
    </ul>
  )
}

export default Nav
