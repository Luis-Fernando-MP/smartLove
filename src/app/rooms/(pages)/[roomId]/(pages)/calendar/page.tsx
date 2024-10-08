'use client'

import dayjs from 'dayjs'
import { Link } from 'next-view-transitions'
import { useState } from 'react'
import { Calendar, Views, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { useRoomStore } from '../../store/room.store'
import CalendarItem from './CalendarItem'
import './style.scss'

const localizer = dayjsLocalizer(dayjs)

const Page = (): JSX.Element | null => {
  const room = useRoomStore(store => store.room)
  const [view, setView] = useState(Views.MONTH)
  const [date, setDate] = useState(new Date())

  if (!room) return null
  const { reservations, id } = room

  const myEventsList =
    reservations?.map(f => {
      return {
        title: 'Ocupado',
        start: dayjs(f.fromDate, 'YYYY-MM-DD').toDate(),
        end: dayjs(f.toDate, 'YYYY-MM-DD').add(1, 'day').toDate(),
        userId: f.clientId
      }
    }) ?? []

  return (
    <article className='RCalendar'>
      <Link href={`/rooms/${id}/requirements`} className='btn bgr big'>
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
          event: ({ event }) => {
            return <CalendarItem userId={event.userId} title={event.title} />
          }
        }}
      />
    </article>
  )
}

export default Page
