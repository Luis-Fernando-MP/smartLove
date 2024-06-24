import { IGV, SURCHARGE } from 'app/rooms/(pages)/[roomId]/(pages)/hooks/useTotalCalculate'
import type { JSX, ReactNode } from 'react'
import { IReservation } from 'services/room/reserve.service.types'
import { round } from 'shared/helpers/round'
import ToggleLogo from 'shared/ui/colorSchemeButton/ToggleLogo'

import './style.scss'

interface IReserve {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  reserve: IReservation
}

const Reserve = ({ reserve }: IReserve): JSX.Element => {
  return (
    <article className='reserve'>
      <ToggleLogo />
      <section className='reserve-operations'>
        <div className='reserve-operation'>
          <h4>Operación</h4>
          <p>{reserve.idReserva}</p>
        </div>
        <div className='reserve-operation'>
          <h4>Hora</h4>
          <p>{reserve.fechaIngreso.slice(0, 10)}</p>
        </div>
        <div className='reserve-operation'>
          <h4>Fecha</h4>
          <p>{reserve.fechaSalida.slice(0, 10)}</p>
        </div>
      </section>
      <span className='reserve-room'>
        Habitación:&nbsp;
        <h3 className='gr'>{reserve.habitacion.nombre}</h3>
      </span>
      <ul className='reserve-details'>
        <li className='reserve-detail'>
          <h5>Cant. días</h5>
          <p>
            : {reserve.totalDias} diá{reserve.totalDias > 1 && 's'}
          </p>
        </li>
        <li className='reserve-detail'>
          <h5>precio</h5>
          <p>: PEN {reserve.total}</p>
        </li>
        <li className='reserve-detail'>
          <h5>IGV 18%</h5>
          <p>: PEN {round(reserve.total * IGV)}</p>
        </li>
        <li className='reserve-detail'>
          <h5>Rec. Servicios</h5>
          <p>: PEN {round(reserve.total * SURCHARGE)}</p>
        </li>
        <li className='reserve-detail'>
          <h5>Tot. Pago</h5>
          <h4>: PEN {reserve.total}</h4>
        </li>
        <li className='reserve-detail'>
          <h5>Forma pago</h5>
          <p>: Presencial</p>
        </li>
      </ul>
      <div className='reserve-extra'>
        <h5>Cliente</h5>
      </div>
    </article>
  )
}

export default Reserve
