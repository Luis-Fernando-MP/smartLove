import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { CalendarClockIcon, LucideCalendarCheck } from 'lucide-react'
import type { JSX } from 'react'
import { v4 as uuid } from 'uuid'

import { useRoomStore } from '../../store/room.store'
import './style.scss'

dayjs.locale('es')

const CuteCalendar = (): JSX.Element | null => {
  const { room } = useRoomStore()
  if (!room) return null

  const today = dayjs().add(-1, 'day')
  const busyDays = room.fechas?.filter(f =>
    dayjs(f.fechaFin, 'YYYY-MM-DD HH:mm:ss.S').isAfter(today)
  )

  return (
    <article className='CCalendar'>
      {busyDays?.reverse().map(f => {
        const from = dayjs(f.fechaInicio)
        const to = dayjs(f.fechaFin)
        return (
          <section key={uuid()} className='CCalendar-data'>
            <div className='CCalendar-item'>
              <span>Desde:</span>
              <h5>{from.year()}</h5>
              <div className='CCalendar-item__sep'>
                <CalendarClockIcon />
                <h5>{from.format('dddd')}</h5>
                <h2>{from.format('DD')}</h2>
                <p>{from.format('MMMM')}</p>
              </div>
            </div>

            <div className='CCalendar-item'>
              <span>Hasta:</span>
              <h5>{to.year()}</h5>
              <div className='CCalendar-item__sep'>
                <LucideCalendarCheck />
                <h5>{to.format('dddd')}</h5>
                <h2>{to.format('DD')}</h2>
                <p>{to.format('MMMM')}</p>
              </div>
            </div>
          </section>
        )
      })}
    </article>
  )
}

export default CuteCalendar
