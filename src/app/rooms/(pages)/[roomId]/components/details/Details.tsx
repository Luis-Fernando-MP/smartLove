import { useRoom } from 'hooks/useRooms'
import { DollarSignIcon, LucideBadgePlus } from 'lucide-react'
import type { JSX, ReactNode } from 'react'
import parseServiceToIcon from 'shared/helpers/parseServiceToIcon'
import Back from 'shared/ui/back/Back'

import Steps from '../steps/Steps'
import './style.scss'

interface IDetails {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  id: string
}

const Details = ({ id }: IDetails): JSX.Element | null => {
  const { data, isError } = useRoom(id)
  if (!data || isError) return null

  const { precio, nombre, contadorreserva, serviciosHabitacion } = data

  return (
    <>
      <Back row />
      <Steps total={precio} id={id} />
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
