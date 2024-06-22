/* eslint-disable @next/next/no-img-element */
import type { JSX } from 'react'
import { sansitaSwashed } from 'shared/fonts'

import { useRoomStore } from '../../store/room.store'
import './style.scss'

const Nav = (): JSX.Element | null => {
  const { room } = useRoomStore()

  return (
    <div className='roomNav-container'>
      <h3 className={`${sansitaSwashed.className}`}>Imágenes de la habitación</h3>
      <ul className='roomNav-images'>
        {room?.imagenesHabitacion.map(image => {
          const { urlImagen, idImgHabitacion, fechEdicion } = image
          return (
            <li key={idImgHabitacion} className='roomNav-item'>
              <img src={urlImagen} alt={fechEdicion.toString()} className='roomNav-image' />
              <p>{fechEdicion}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Nav
