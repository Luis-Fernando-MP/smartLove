import axios from 'axios'
import { Beer, CalendarClock, Car, Check, PawPrint, Wifi } from 'lucide-react'
import { ICharacter } from 'shared/ui/characteristics/Characteristics'

export const listOfCharacteristicsComponent = {
  Check,
  PawPrint,
  Car,
  Wifi,
  Beer,
  CalendarClock
}

export const getCharacteristics = async (): Promise<ICharacter[]> => {
  const res = await axios('http://localhost:3000/api/characteristics')
  const { data } = res.data
  return data.map(({ title, icon }) => {
    return { title, Icon: listOfCharacteristicsComponent[icon] }
  })
}
