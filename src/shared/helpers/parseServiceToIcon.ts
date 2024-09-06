import {
  AlertCircleIcon,
  BeerIcon,
  CalendarDaysIcon,
  CarFrontIcon,
  CoffeeIcon,
  DumbbellIcon,
  FeatherIcon,
  FishIcon,
  FlowerIcon,
  GlassesIcon,
  HandPlatterIcon,
  HotelIcon,
  LockKeyholeIcon,
  PlaneIcon,
  Squirrel,
  TheaterIcon,
  Tv,
  UtensilsIcon,
  WandSparklesIcon,
  WifiIcon,
  WineIcon
} from 'lucide-react'

export const listOfCharacteristicsIcon = [
  {
    value: 'Responsable',
    Icon: HandPlatterIcon
  },
  {
    value: 'Mascotas',
    Icon: Squirrel
  },
  {
    value: 'Parking',
    Icon: CarFrontIcon
  },
  {
    value: 'Wifi',
    Icon: WifiIcon
  },
  {
    value: 'Bar',
    Icon: BeerIcon
  },
  {
    value: '24/7',
    Icon: CalendarDaysIcon
  },
  {
    value: 'Desayuno',
    Icon: CoffeeIcon
  },
  {
    value: 'Habitaciones',
    Icon: HotelIcon
  },
  {
    value: 'Piscina',
    Icon: FishIcon
  },
  {
    value: 'Gimnasio',
    Icon: DumbbellIcon
  },
  {
    value: 'Accesible',
    Icon: GlassesIcon
  },
  {
    value: 'Transporte',
    Icon: PlaneIcon
  },
  {
    value: 'Spa',
    Icon: WandSparklesIcon
  },
  {
    value: 'Restaurante',
    Icon: UtensilsIcon
  },
  {
    value: 'Conferencias',
    Icon: TheaterIcon
  },
  {
    value: 'Lavandería',
    Icon: FlowerIcon
  },
  {
    value: 'A/C',
    Icon: FeatherIcon
  },
  {
    value: 'TV Cable',
    Icon: Tv
  },
  {
    value: 'Minibar',
    Icon: WineIcon
  },
  {
    value: 'Caja Fuerte',
    Icon: LockKeyholeIcon
  }
]

const parseServiceToIcon = (characterValue: string) => {
  const existIcon = listOfCharacteristicsIcon.find(item => {
    const iconName = `${item.Icon.displayName?.toLowerCase() ?? ''}icon`
    return (
      item.value.toLowerCase() === characterValue.toLowerCase() ||
      iconName === characterValue.toLowerCase()
    )
  })
  return existIcon ?? { value: 'default', Icon: AlertCircleIcon }
}
export default parseServiceToIcon
