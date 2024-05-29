import {
  AlertCircleIcon,
  BanknoteIcon,
  BedSingleIcon,
  Beer,
  CalendarClock,
  Car,
  Check,
  Hotel,
  PawPrint,
  UsersRoundIcon,
  Wifi
} from 'lucide-react'

export const listOfCharacteristicsIcon = [
  {
    value: 'Mascota',
    Icon: PawPrint
  },
  {
    value: 'Estacionamiento',
    Icon: Car
  },

  {
    value: 'Wifi',
    Icon: Wifi
  },
  {
    value: 'VistaCiudad',
    Icon: Hotel
  },

  {
    value: 'Capacidad',
    Icon: UsersRoundIcon
  },
  {
    value: 'Sencilla',
    Icon: BedSingleIcon
  },
  {
    value: 'Estacionamiento',
    Icon: UsersRoundIcon
  },
  {
    value: 'NoReembolsable',
    Icon: BanknoteIcon
  }
]

const parseServiceToIcon = (characterValue: string) => {
  const existIcon = listOfCharacteristicsIcon.find(
    item => item.value.toLowerCase() === characterValue.toLocaleLowerCase()
  )
  return existIcon ?? { value: 'default', Icon: AlertCircleIcon }
}
export default parseServiceToIcon
