'use client'

import { sansitaSwashed } from '@/shared/fonts'
import { switchClass } from '@/shared/helpers/switchClassName'
import LittleBox from '@/shared/ui/LittleBox'
import DayBox from '@/shared/ui/dayBox/DayBox'
import dayjs from 'dayjs'
import { PanelRightClose } from 'lucide-react'
import { useMemo } from 'react'
import { v1 as uuid } from 'uuid'

import { useReservationStore } from '../../store/reservation.store'
import { littleBoxData } from '../Reserve/useReserve'
import './style.scss'

const Details = () => {
  const { reservation, setReservation } = useReservationStore()

  const handleCloseDetails = (): void => {
    setReservation(null)
  }

  const littleBoxItem = useMemo(() => (reservation ? littleBoxData(reservation) : []), [reservation])

  if (!reservation) return null

  const fromDay = dayjs(reservation.checkIn)
  const toDay = dayjs(reservation.checkOut)
  const diffDays = toDay.diff(fromDay, 'day')

  return (
    <article className={`RDetails dashboard-body__details ${switchClass(!!reservation)}`}>
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
        <h3 className={sansitaSwashed.className}>{reservation.room.name}</h3>
        <div className='RDImages-container'>
          {reservation.room.images.length > 0 && (
            <img
              className='RDImages-container__background'
              src={reservation.room.images[0].imageUrl}
              alt={reservation.room.name}
            />
          )}
          <div className='RDImages-container__images'>
            {reservation.room.images.slice(1).map(img => (
              <img className='RDImages-container__image' src={img.imageUrl} alt={img.imageUrl} key={uuid()} />
            ))}
          </div>
        </div>
      </section>
      <h4>
        <b>COSTOS</b> por la reserva:
      </h4>
      <section className='RDLittleBoxes'>
        {littleBoxItem.map(i => {
          const { Icon, subtitle, title } = i
          return <LittleBox key={i.title} Icon={Icon} subtitle={subtitle} title={title} />
        })}
      </section>
    </article>
  )
}

export default Details
