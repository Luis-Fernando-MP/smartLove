/* eslint-disable @next/next/no-img-element */
import type { JSX } from 'react'
import { sansitaSwashed } from 'shared/fonts'
import Back from 'shared/ui/back/Back'

import { useRoomStore } from '../../store/room.store'
import './style.scss'

const Nav = (): JSX.Element | null => {
  const { room } = useRoomStore()
  if (!room) return null
  const firstImage = room?.imagenesHabitacion[0]
  return (
    <div className='roomNav-container'>
      <Back row />
      <h3 className={`${sansitaSwashed.className}`}>Imágenes de la habitación</h3>
      <ul className='roomNav-images'>
        <li className='roomNav-item background'>
          <img
            src={firstImage.urlImagen}
            alt={firstImage.fechCreacion.toString()}
            className='roomNav-image'
          />
        </li>
        {room?.imagenesHabitacion.map(image => {
          const { urlImagen, idImgHabitacion, fechCreacion } = image
          return (
            <li key={idImgHabitacion} className='roomNav-item'>
              <img src={urlImagen} alt={fechCreacion.toString()} className='roomNav-image' />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Nav
