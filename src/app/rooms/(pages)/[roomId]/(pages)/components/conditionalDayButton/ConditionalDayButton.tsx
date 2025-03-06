import { currentClassCase } from '@/shared/helpers/stayUserCases'
import { CalendarRange } from 'lucide-react'
import { type JSX, type ReactNode } from 'react'

import './style.scss'

interface IConditionalDayButton {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  days: number
  oneNight: boolean
}

const ConditionalDayButton = ({ days, oneNight }: IConditionalDayButton): JSX.Element => {
  return (
    <button className={`btn conditionalDayButton ${currentClassCase(days)}`}>
      <CalendarRange />
      <p>
        {days} Noche{!oneNight && 's'}
      </p>
    </button>
  )
}

export default ConditionalDayButton
