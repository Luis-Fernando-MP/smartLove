'use client'

import { switchClass } from '@/shared/helpers/switchClassName'
import { newKey } from '@/shared/key'
import { Image } from '@unpic/react'
import { ClipboardList, Clock, Home, Info, Scroll } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import { useRoomStore } from '../../store/room.store'
import './style.scss'

const Page = () => {
  const [isNewPay, _setIsNewPay, removeIsNewPay] = useLocalStorage('newPay', null)
  const { room } = useRoomStore()
  const { roomId } = useParams()
  const isReserved = useRef(!!isNewPay)

  useEffect(() => {
    removeIsNewPay()
  }, [removeIsNewPay])

  if (!room) return null

  return (
    <article className={`pay ${switchClass(isReserved.current, 'success')}`}>
      <section className='pay-images'>
        {room.images.map(image => (
          <div className='pay-image' key={newKey()}>
            <Image src={image.imageUrl} alt={room.name} layout='fullWidth' />
          </div>
        ))}
      </section>

      <h2 className='pay-title font3'>{isReserved.current ? '🍀 ¡Reserva Exitosa!' : '🔍 Gestión de Reservas'}</h2>
      <h3 className='success-subtitle'>
        {isReserved.current ? 'Su reserva ha sido registrada correctamente' : 'Verifique todas sus Reservas'}
      </h3>

      <section className='pay-info'>
        <div className='pay-info__item'>
          <Clock />
          <p>
            {isReserved.current
              ? 'La confirmación será enviada a su correo electrónico'
              : 'Acceda a su historial completo de reservas'}
          </p>
        </div>

        <div className='pay-info__item'>
          <Info />
          <p>
            {isReserved.current
              ? 'Guarde su número de reserva para futuras referencias'
              : 'Consulte detalles y estados de sus reservaciones'}
          </p>
        </div>
      </section>

      <div className='pay-actions'>
        <Link href={`/rooms/${roomId}`} className='pay-link'>
          <Home />
          <h3>Ver detalles de la habitación</h3>
        </Link>

        <Link href='/rooms/reservations' className='pay-link tn1'>
          {isReserved.current ? <Scroll /> : <ClipboardList />}
          <h3>{isReserved.current ? 'Ver Mis Reservas' : 'Gestionar Mis Reservas'}</h3>
        </Link>
      </div>
    </article>
  )
}

export default Page
