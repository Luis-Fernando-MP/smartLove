'use client'

import { sansitaSwashed } from '@/shared/fonts'
import { switchClass } from '@/shared/helpers/switchClassName'
import CuteLittleBox from '@/shared/ui/cuteLittleBox/CuteLittleBox'
import DayBox from '@/shared/ui/dayBox/DayBox'
import dayjs from 'dayjs'
import { PanelRightClose } from 'lucide-react'
import type { JSX } from 'react'
import { v1 as uuid } from 'uuid'

import { useReservationStore } from '../../store/reservation.store'
import { littleBoxData } from '../reserve/useReserve'
import './style.scss'

const Details = () => {
  const { reservation: r, setReservation } = useReservationStore()

  if (!r) return null

  const handleCloseDetails = (): void => {
    setReservation(null)
  }

  const fromDay = dayjs(r?.checkIn).add(1, 'days')
  const toDay = dayjs(r?.checkOut).add(1, 'days')
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
        <h3 className={sansitaSwashed.className}>{r?.room.name}</h3>
        <div className='RDImages-container'>
          <img className='RDImages-container__background' src={r?.room.images[0].imageUrl} alt={r?.room.name} />
          <div className='RDImages-container__images'>
            {r.room.images.slice(1).map((img: any) => {
              return <img className='RDImages-container__image' src={img.imageUrl} alt={img.imageUrl} key={uuid()} />
            })}
          </div>
        </div>
      </section>
      <h4>
        <b>COSTOS</b> por la reserva:
      </h4>
      <section className='RDLittleBoxes'>
        {!!r &&
          littleBoxData(r).map(i => {
            const { Icon, subtitle, title, active } = i
            return <CuteLittleBox key={i.title} Icon={Icon} subtitle={Number(subtitle)} title={title} active={active} />
          })}
      </section>
    </article>
  )
}

export default Details
