/* eslint-disable @next/next/no-img-element */
import type { JSX } from 'react'
import { mada, sansitaSwashed } from 'shared/fonts'

import { useRoomStore } from '../../store/room.store'
import './style.scss'

const Nav = (): JSX.Element | null => {
  const { room } = useRoomStore()

  return (
    <div className='roomNav-container'>
      <h3 className={`${sansitaSwashed.className}`}>Imágenes de la habitación</h3>
      <ul className='roomNav-images'>
        {room?.imagenesHabitacion.map(image => {
          const { urlImagen, idImgHabitacion, fechCreacion } = image
          return (
            <li key={idImgHabitacion} className='roomNav-item'>
              <img src={urlImagen} alt={fechCreacion.toString()} className='roomNav-image' />
              <p className={mada.className}>{fechCreacion}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Nav
