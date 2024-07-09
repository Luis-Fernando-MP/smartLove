'use client'

import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { CalendarOffIcon } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { useRoomStore } from '../../store/room.store'
import './style.scss'

dayjs.locale('es')

const localizer = dayjsLocalizer(dayjs)

const Page = (): JSX.Element | null => {
  const room = useRoomStore(store => store.room)
  if (!room) return null
  const myEventsList =
    room?.fechas?.map(f => {
      return {
        title: 'Ocupado',
        start: dayjs(f.fechaInicio, 'YYYY-MM-DD').toDate(),
        end: dayjs(f.fechaFin, 'YYYY-MM-DD').add(1, 'day').toDate()
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
        toolbar={false}
        components={{
          event: props => {
            return (
              <div className='flex items-center gap-1'>
                <CalendarOffIcon /> {props.title}
              </div>
            )
          }
        }}
      />
    </article>
  )
}

export default Page
