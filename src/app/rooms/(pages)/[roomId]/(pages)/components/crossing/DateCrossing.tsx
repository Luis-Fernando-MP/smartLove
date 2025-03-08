import { calculateDateCrossing, formattedShortWeekdays, getDaysInMonth, noAvailableDateInRange } from '@/shared/helpers/roomDate'
import { switchClass } from '@/shared/helpers/switchClassName'
import { newKey } from '@/shared/key'
import { useUser } from '@clerk/nextjs'
import { Reservation } from '@prisma/client'
import { Image } from '@unpic/react'
import dayjs, { Dayjs } from 'dayjs'
import { JSX, memo } from 'react'

import './style.scss'

interface IDateCrossing {
  dates: Reservation[]
  selectFrom: string
  selectEnd: string
}

const DateCrossing = ({ dates, selectEnd, selectFrom }: IDateCrossing): JSX.Element => {
  const today = dayjs()
  const monthDays = getDaysInMonth(today.year(), today.month() + 1)
  const { user } = useUser()
  const calendar = calculateDateCrossing({
    monthStringDays: monthDays,
    dates,
    selectEnd,
    selectFrom
  })

  const notAvailable = noAvailableDateInRange({
    dates,
    endDate: selectEnd,
    startDate: selectFrom
  })
  return (
    <article className='TCDateCrossing'>
      <div className='TCDateCrossing-information'>
        <h2 className='font3'>
          <b className='gr'>Calendario</b> de la reserva
        </h2>
        <h4>Verifica tus fechas seleccionadas</h4>
      </div>

      <section className='TCDateCrossing-container'>
        {notAvailable && <h4>Hay un cruce en tus fechas 👩‍🏭</h4>}

        <ul className='TCDateCrossing-dates'>
          {formattedShortWeekdays.map(dayItem => {
            return (
              <li key={newKey()} className='TCDateCrossing-date day'>
                <h4>{dayItem}</h4>
              </li>
            )
          })}
          {calendar.map(calendarItem => {
            if (!calendarItem) return <li key={newKey()} />
            const { day, isBusy, isCrossing, isSelect, userId, fullName } = calendarItem
            return (
              <li
                key={newKey()}
                className={`TCDateCrossing-date ${switchClass(isBusy, 'busy')} ${switchClass(isSelect, 'select')} ${switchClass(isCrossing, 'cross')}`}
              >
                {userId === user?.id && (
                  <Image
                    src={user.imageUrl}
                    alt={`user ${fullName ?? ''}`}
                    className='TCDateCrossing-image'
                    title='Mi reserva'
                    width={20}
                    height={20}
                  />
                )}

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
  return <h4 className={`${className ?? ''}`}>{date.format('DD')}</h4>
}

export default memo(DateCrossing)
