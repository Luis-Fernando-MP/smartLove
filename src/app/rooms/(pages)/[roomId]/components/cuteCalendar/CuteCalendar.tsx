import dayjs from 'dayjs'
import type { JSX } from 'react'
import DayBox from 'shared/ui/dayBox/DayBox'
import { v4 as uuid } from 'uuid'

import { useRoomStore } from '../../store/room.store'
import './style.scss'

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
            <DayBox day={from} />
            <DayBox day={to} isFrom={false} />
          </section>
        )
      })}
    </article>
  )
}

export default CuteCalendar
