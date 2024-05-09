import { BadgeInfo, HeartHandshake, Hotel, MapPin, Siren } from 'lucide-react'

export const paths = [
  {
    name: 'Resumen',
    link: '/',
    Icon: BadgeInfo
  },
  {
    name: 'Servicios',
    link: '/services',
    Icon: HeartHandshake
  },
  {
    name: 'Ubicación',
    link: '/map',
    Icon: MapPin
  },
  {
    name: 'Habitaciones',
    link: '/rooms',
    Icon: Hotel
  },
  {
    name: 'Políticas',
    link: '/polices',
    Icon: Siren
  }
]
