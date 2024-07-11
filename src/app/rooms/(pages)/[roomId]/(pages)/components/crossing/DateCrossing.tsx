import dayjs, { Dayjs } from 'dayjs'
import { JSX, memo } from 'react'
import { IRoomBusyDays } from 'services/room/room.service.types'
import { calculateDateCrossing, getDaysInMonth } from 'shared/helpers/roomDate'
import { switchClass } from 'shared/helpers/switchClassName'
import { v1 as uuid } from 'uuid'

import './style.scss'

interface IDateCrossing {
  dates: IRoomBusyDays[]
  selectFrom: string
  selectEnd: string
}

const DateCrossing = ({ dates, selectEnd, selectFrom }: IDateCrossing): JSX.Element => {
  const today = dayjs()
  const monthDays = getDaysInMonth(today.year(), today.month() + 1)
  const calendar = calculateDateCrossing({
    monthStringDays: monthDays,
    dates,
    selectEnd,
    selectFrom
  })
  return (
    <article className='TCDateCrossing'>
      <div className='TCDateCrossing-information'>
        <h2>
          <b className='gr'>CALENDARIO</b> de la reserva
        </h2>
        <h5>Verifica tus fechas seleccionadas</h5>
      </div>
      <section className='TCDateCrossing-container'>
        <h4>Estos días están ocupados 👩‍🏭</h4>
        <ul className='TCDateCrossing-dates'>
          {calendar.map(calendarItem => {
            const { day, isBusy, isCrossing, isSelect } = calendarItem

            return (
              <li
                key={uuid()}
                className={`TCDateCrossing-date 
                ${switchClass(isBusy, 'busy')} 
                ${switchClass(isSelect, 'select')} 
                ${switchClass(isCrossing, 'cross')}`}
              >
                <Round date={day} />
              </li>
            )
          })}
        </ul>
      </section>
    </article>
  )
}

interface IRound {
  date: Dayjs
  className?: string
}
const Round = ({ date, className }: IRound): JSX.Element => {
  return <h4 className={`TCDateCrossing-date__from ${className ?? ''}`}>{date.format('DD')}</h4>
}

export default memo(DateCrossing)
