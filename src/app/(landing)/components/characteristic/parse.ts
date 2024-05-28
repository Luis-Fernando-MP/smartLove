import { AlertCircleIcon, Beer, CalendarClock, Car, Check, PawPrint, Wifi } from 'lucide-react'

export const listOfCharacteristicsIcon = [
  {
    value: 'Check',
    Icon: Check
  },
  {
    value: 'Paw',
    Icon: PawPrint
  },
  {
    value: 'Car',
    Icon: Car
  },
  {
    value: 'Wifi',
    Icon: Wifi
  },
  {
    value: 'Beer',
    Icon: Beer
  },
  {
    value: 'Calendar',
    Icon: CalendarClock
  }
]

export const parseCharacteristics = (characterValue: string) => {
  const existIcon = listOfCharacteristicsIcon.find(item => item.value === characterValue)
  return existIcon ?? { value: 'default', Icon: AlertCircleIcon }
}
