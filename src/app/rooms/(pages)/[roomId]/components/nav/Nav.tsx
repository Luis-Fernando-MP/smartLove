/* eslint-disable @next/next/no-img-element */
import { useRoom } from 'hooks/useRooms'
import type { JSX } from 'react'

import './style.scss'

interface TNav {
  id: string
}
const Nav = ({ id }: TNav): JSX.Element | null => {
  const { data, isError } = useRoom(id)
  if (!data || isError) return null

  return (
    <ul className='roomNav-images'>
      {data?.imagenesHabitacion.map(image => {
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
