import {
  HeartHandshake,
  Hotel,
  LayoutDashboard,
  MapPin,
  Siren
} from 'lucide-react'

export const paths = [
  {
    name: 'dashboard',
    link: '/',
    Icon: LayoutDashboard
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
