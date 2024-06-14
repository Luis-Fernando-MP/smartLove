import { CalendarClockIcon } from 'lucide-react'
import { type JSX, type ReactNode } from 'react'
import { moneyConfetti, startsConfetti } from 'shared/helpers/customConfetis'
import { STAY_USER, currentClassCase } from 'shared/helpers/stayUserCases'

import './style.scss'

interface IConditionalDayButton {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  days: number
  oneNight: boolean
}

const ConditionalDayButton = ({ days, oneNight }: IConditionalDayButton): JSX.Element => {
  const classUserStatus = currentClassCase(days)
  if (classUserStatus === STAY_USER.LONG) startsConfetti()
  if (classUserStatus === STAY_USER.EXTENDED) moneyConfetti()

  return (
    <button className={`btn conditionalDayButton ${currentClassCase(days)}`}>
      <CalendarClockIcon />
      <p>
        {days} Noche{!oneNight && 's'}
      </p>
    </button>
  )
}

export default ConditionalDayButton
