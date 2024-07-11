'use client'

import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { PanelRightClose } from 'lucide-react'
import type { JSX } from 'react'
import { sansitaSwashed } from 'shared/fonts'
import { switchClass } from 'shared/helpers/switchClassName'
import CuteLittleBox from 'shared/ui/cuteLittleBox/CuteLittleBox'
import DayBox from 'shared/ui/dayBox/DayBox'
import { v1 as uuid } from 'uuid'

import { useReservationStore } from '../../store/reservation.store'
import { littleBoxData } from '../reserve/useReserve'
import './style.scss'

dayjs.locale('es')

const Details = (): JSX.Element | null => {
  const { reservation: r, setReservation } = useReservationStore()

  const handleCloseDetails = (): void => {
    setReservation(null)
  }

  const fromDay = dayjs(r?.fechaIngreso)
  const toDay = dayjs(r?.fechaSalida)
  const diffDays = toDay.diff(fromDay, 'day') + 1

  return (
    <article className={`RDetails dashboard-body__details ${switchClass(!!r)}`}>
      <button className='RDetails-close btn' onClick={handleCloseDetails}>
        <PanelRightClose />
      </button>
      <h4>
        <b>DETALLES</b> de la Reserva:
      </h4>
      <section className='RDDays'>
        <DayBox day={fromDay} />
        <div className='RDDays-info'>
          <h4>
            <b className='gr'>
              {diffDays} DÍA{diffDays > 1 && 'S'}
            </b>
            &nbsp;de
            <br />
            &nbsp;hospedaje
          </h4>
        </div>
        <DayBox day={toDay} isFrom={false} />
      </section>
      <h4>
        <b>HABITACIÓN</b> reservada:
      </h4>
      <section className='RDImages'>
        <h3 className={sansitaSwashed.className}>{r?.habitacion.nombre}</h3>
        <div className='RDImages-container'>
          <img
            className='RDImages-container__background'
            src={r?.habitacion.imagenesHabitacion[0].urlImagen}
            alt={r?.habitacion.nombre}
          />
          <div className='RDImages-container__images'>
            {r?.habitacion.imagenesHabitacion.slice(1).map(img => {
              return (
                <img
                  className='RDImages-container__image'
                  src={img.urlImagen}
                  alt={img.urlImagen}
                  key={uuid()}
                />
              )
            })}
          </div>
        </div>
      </section>
      <h4>
        <b>COSTOS</b> por la reserva:
      </h4>
      <section className='RDLittleBoxes'>
        {!!r && littleBoxData(r).map(i => <CuteLittleBox key={i.title} {...i} />)}
      </section>
    </article>
  )
}

export default Details
