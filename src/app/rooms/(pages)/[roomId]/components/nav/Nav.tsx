/* eslint-disable @next/next/no-img-element */
import { useRoom } from 'hooks/useRooms'
import type { JSX, ReactNode } from 'react'

import './style.scss'

interface INav {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  id: string
}

const Nav = ({ id }: INav): JSX.Element | null => {
  const { data } = useRoom(id)
  if (!data) return null

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
