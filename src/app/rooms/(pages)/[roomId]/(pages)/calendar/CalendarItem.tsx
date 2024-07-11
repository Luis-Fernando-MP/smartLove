import { CalendarOffIcon } from 'lucide-react'
import type { JSX, ReactNode } from 'react'

interface ICalendarItem {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  userId: number
  title: string
}

const CalendarItem = ({ userId }: ICalendarItem): JSX.Element => {
  return (
    <div className='flex items-center gap-1'>
      <CalendarOffIcon />
      {userId}
    </div>
  )
}

export default CalendarItem
