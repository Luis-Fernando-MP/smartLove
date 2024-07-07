import dayjs from 'dayjs'
import { PanelTopCloseIcon, PanelTopOpenIcon } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { type JSX, useState } from 'react'
import { sansitaSwashed } from 'shared/fonts'
import { switchClass } from 'shared/helpers/switchClassName'

import { useRoomStore } from '../../store/room.store'
import CuteCalendar from '../cuteCalendar/CuteCalendar'

const BusyDays = (): JSX.Element | null => {
  const { room } = useRoomStore()
  const [active, setActive] = useState(false)
  if (!room) return null
  const today = dayjs().add(-1, 'day')
  const busyDays = room.fechas?.filter(f =>
    dayjs(f.fechaFin, 'YYYY-MM-DD HH:mm:ss.S').isAfter(today)
  )
  if (!busyDays || busyDays?.length < 1) return null

  return (
    <section className={`RBusyDays ${switchClass(active)}`}>
      <h2 className={`${sansitaSwashed.className}`}>
        Hay <b className='gr'>Días ocupados</b> para esta habitación
      </h2>
      <p>Revisa su disponibilidad antes de reservar</p>
      <Link href={`/rooms/${room?.codigo}/calendar`}>Véase el calendario de reservas</Link>
      <button onClick={() => setActive(!active)} className='btn RBusyDays-action'>
        {active ? <PanelTopCloseIcon /> : <PanelTopOpenIcon />}
        {active ? 'Contraer' : 'Extender'}
      </button>
      <CuteCalendar />
    </section>
  )
}

export default BusyDays
