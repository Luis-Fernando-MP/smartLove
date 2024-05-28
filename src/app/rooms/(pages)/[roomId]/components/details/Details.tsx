import { useRoom } from 'hooks/useRooms'
import { DollarSignIcon, LucideBadgePlus } from 'lucide-react'
import Link from 'next/link'
import type { JSX, ReactNode } from 'react'
import Back from 'shared/ui/back/Back'

import Steps from '../steps/Steps'
import './style.scss'

interface IDetails {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  id: string
}

const Details = ({ id }: IDetails): JSX.Element | null => {
  const { data } = useRoom(id)
  if (!data) return null

  const { precio, nombre, contadorreserva, serviciosHabitacion } = data

  return (
    <>
      <Back row />
      <Steps total={precio} />
      <section className='roomDetails'>
        <h1>{nombre}</h1>
        <h4 className='roomDetails-characteristic'>
          <DollarSignIcon />
          <b>{precio}xNOCHE</b>
        </h4>
        <h5 className='roomDetails-characteristic'>
          <LucideBadgePlus />
          <b>{contadorreserva} Reservas</b>
        </h5>
        <ul className='roomDetails-services'>
          {serviciosHabitacion.map(service => {
            return (
              <li className='btn roomDetails-service' key={service.idServHabitacion}>
                {service.nombreServicio}
              </li>
            )
          })}
        </ul>
        <Link href={`${id}/requirements`} className='btn roomDetails-continue'>
          Continuar con la Reserva
        </Link>
      </section>
    </>
  )
}

export default Details
