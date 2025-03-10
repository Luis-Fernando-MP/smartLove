'use client'

import Back from '@/shared/ui/back/Back'
import { Image } from '@unpic/react'
import type { JSX } from 'react'

import { useRoomStore } from '../../store/room.store'
import BusyDays from '../BusyDays'
import './style.scss'

const Nav = (): JSX.Element | null => {
  const { room } = useRoomStore()
  if (!room) return null
  const { images } = room

  const firstImage = images[0]
  return (
    <article className='roomNav-container'>
      <Back row />
      <BusyDays />
      <h2 className='font3'>
        <b className='gr'>Imágenes</b> de la habitación
      </h2>
      <section className='roomNav-background'>
        <Image src={firstImage.imageUrl} alt={firstImage.createdAt.toString()} layout='fullWidth' />
      </section>
      <section className='roomNav-images'>
        {images.slice(1).map(image => {
          const { id, createdAt, imageUrl } = image
          return (
            <li key={id} className='roomNav-image'>
              <Image src={imageUrl} alt={createdAt.toString()} layout='fullWidth' />
            </li>
          )
        })}
      </section>
    </article>
  )
}

export default Nav
