import { switchClass } from '@/shared/helpers/switchClassName'
import dayjs from 'dayjs'
import { CalendarIcon, PanelTopCloseIcon, PanelTopOpenIcon } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { type FC, useState } from 'react'

import { useRoomStore } from '../../store/room.store'
import CuteCalendar from '../cuteCalendar/CuteCalendar'
import './style.scss'

const BusyDays: FC = () => {
  const { room } = useRoomStore()
  const [active, setActive] = useState(false)
  if (!room) return null

  const { reservations, id } = room
  const today = dayjs().add(-1, 'day')
  const busyDays = reservations?.filter(f => dayjs(f.toDate, 'YYYY-MM-DD HH:mm:ss.S').isAfter(today))
  if (!busyDays || busyDays?.length < 1) return null

  return (
    <section className={`busyDays ${switchClass(active)}`}>
      <h2 className='font3'>
        Hay <b className='gr'>Días ocupados</b> para esta habitación
      </h2>
      <p>Revisa su disponibilidad antes de reservar</p>

      <Link href={`/rooms/${id}/calendar`} className='busyDays-calendar'>
        <CalendarIcon />
        Véase el calendario
      </Link>

      {busyDays.length >= 2 && (
        <button onClick={() => setActive(!active)} className='btn busyDays-extend'>
          {active ? <PanelTopCloseIcon /> : <PanelTopOpenIcon />}
          {active ? 'Contraer' : 'Extender'}
        </button>
      )}

      <CuteCalendar className='busyDays-miniCalendar' />
    </section>
  )
}

export default BusyDays
