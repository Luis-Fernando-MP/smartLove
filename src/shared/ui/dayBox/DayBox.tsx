import { Dayjs } from 'dayjs'
import { CalendarClockIcon, LucideCalendarCheck } from 'lucide-react'
import type { JSX, ReactNode } from 'react'

import './style.scss'

interface IDayBox {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  day: Dayjs
  isFrom?: boolean
}

const DayBox = ({ day, isFrom = true }: IDayBox): JSX.Element => {
  return (
    <div className='dayBox'>
      <span>{isFrom ? 'Desde' : 'Hasta'}:</span>
      <h5>{day.year()}</h5>
      <div className='dayBox-sep'>
        {isFrom ? <CalendarClockIcon /> : <LucideCalendarCheck />}
        <h5>{day.format('dddd')}</h5>
        <h2>{day.format('DD')}</h2>
        <p>{day.format('MMMM')}</p>
      </div>
    </div>
  )
}

export default DayBox
