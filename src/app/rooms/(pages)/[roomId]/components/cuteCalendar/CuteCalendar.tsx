import DayBox from '@/shared/ui/dayBox/DayBox'
import dayjs from 'dayjs'
import type { JSX } from 'react'
import { v4 as uuid } from 'uuid'

import { useRoomStore } from '../../store/room.store'
import './style.scss'

const CuteCalendar = (): JSX.Element | null => {
  const { room } = useRoomStore()
  if (!room) return null
  const { reservations } = room

  const today = dayjs().add(-1, 'day')
  const busyDays = reservations.filter(f => dayjs(f.toDate, 'YYYY-MM-DD HH:mm:ss.S').isAfter(today))

  return (
    <article className='CCalendar'>
      {busyDays.map(f => {
        const from = dayjs(f.fromDate)
        const to = dayjs(f.toDate)
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
