/* eslint-disable @next/next/no-img-element */
import { sansitaSwashed } from '@/shared/fonts'
import Back from '@/shared/ui/back/Back'
import type { JSX } from 'react'

import { useRoomStore } from '../../store/room.store'
import BusyDays from './BusyDays'
import './style.scss'

const Nav = (): JSX.Element | null => {
  const { room } = useRoomStore()
  if (!room) return null
  const { images } = room

  const firstImage = images[0]
  return (
    <div className='roomNav-container'>
      <Back row />
      <BusyDays />
      <h3 className={`${sansitaSwashed.className}`}>
        <b className='gr'>Imágenes</b> de la habitación
      </h3>
      <ul className='roomNav-images'>
        <li className='roomNav-item background'>
          <img src={firstImage.imageUrl} alt={firstImage.createdAt.toString()} className='roomNav-image first' />
        </li>
        {images.slice(1).map(image => {
          const { id, createdAt, imageUrl } = image
          return (
            <li key={id} className='roomNav-item'>
              <img src={imageUrl} alt={createdAt.toString()} className='roomNav-image' />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Nav
