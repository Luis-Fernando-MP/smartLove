'use client'

import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { Link } from 'next-view-transitions'
import { useState } from 'react'
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { useRoomStore } from '../../store/room.store'
import CalendarItem from './CalendarItem'
import './style.scss'

dayjs.locale('es')

const localizer = dayjsLocalizer(dayjs)

const Page = (): JSX.Element | null => {
  const room = useRoomStore(store => store.room)
  const [view, setView] = useState(Views.MONTH)
  const [date, setDate] = useState(new Date())

  if (!room) return null
  const myEventsList =
    room?.fechas?.map(f => {
      return {
        title: 'Ocupado',
        start: dayjs(f.fechaInicio, 'YYYY-MM-DD').toDate(),
        end: dayjs(f.fechaFin, 'YYYY-MM-DD').add(1, 'day').toDate(),
        userId: f.idCliente
      }
    }) ?? []

  return (
    <article className='RCalendar'>
      <Link href={`/rooms/${room.codigo}/requirements`} className='btn bgr big'>
        Reservar ahora 🍀
      </Link>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        className='h-[500px] w-[800px]'
        defaultView='month'
        views={[Views.MONTH]}
        view={view}
        date={date}
        onView={(view: any) => setView(view)}
        onNavigate={date => {
          setDate(new Date(date))
        }}
        components={{
          event: ({ event }) => <CalendarItem userId={event.userId} title={event.title} />
        }}
      />
    </article>
  )
}

export default Page
