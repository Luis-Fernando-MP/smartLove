import { switchClass } from '@/shared/helpers/switchClassName'
import { useUser } from '@clerk/nextjs'
import { Image } from '@unpic/react'
import { CalendarOffIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface ICalendarItem {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  userId: number
  title: string
}

const CalendarItem = ({ userId, title }: ICalendarItem) => {
  const { user } = useUser()
  if (!user) return null
  const isOwner = user?.id === userId.toString()

  return (
    <div className={`calendarItem ${switchClass(isOwner, 'owner')}`}>
      {isOwner ? (
        <Image src={user?.imageUrl} alt='user' width={20} height={20} className='calendarItem-avatar' />
      ) : (
        <CalendarOffIcon />
      )}
      <h5>{title}</h5>
    </div>
  )
}

export default CalendarItem
