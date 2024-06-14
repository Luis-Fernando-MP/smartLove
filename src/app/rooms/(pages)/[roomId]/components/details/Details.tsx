import { DollarSignIcon, LucideBadgePlus } from 'lucide-react'
import type { JSX } from 'react'
import { sansitaSwashed } from 'shared/fonts'
import { getSlugOBJ } from 'shared/helpers/getSlugOBJ'
import parseServiceToIcon from 'shared/helpers/parseServiceToIcon'
import Back from 'shared/ui/back/Back'

import { useRoomStore } from '../../store/room.store'
import Steps from '../steps/Steps'
import './style.scss'

const Details = (): JSX.Element | null => {
  const { id, room } = useRoomStore()
  if (!room) return null
  const { contadorreserva, onSale, estado, precio, nombre, serviciosHabitacion } = room
  const { className, tag } = getSlugOBJ({ counter: contadorreserva, onSale, itsFull: estado })

  return (
    <>
      <Back row />
      <Steps total={precio} id={id} />
      <section className={`roomDetails ${className}`}>
        <h1 className={`${sansitaSwashed.className} title`} data-slug={tag}>
          {nombre}
        </h1>
        <h4 className='roomDetails-characteristic'>
          roomDetails
          <DollarSignIcon />
          <b>{precio}xNOCHE</b>
        </h4>
        <h5 className='roomDetails-characteristic'>
          <LucideBadgePlus />
          <b>{contadorreserva} Reservas</b>
        </h5>
        <ul className='roomDetails-services'>
          {serviciosHabitacion.map(service => {
            const { Icon } = parseServiceToIcon(service.urlImagen)
            return (
              <li className='btn roomDetails-service' key={service.idServHabitacion}>
                <Icon />
                <p>{service.nombreServicio}</p>
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}

export default Details
