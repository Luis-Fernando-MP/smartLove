import {
  BadgeInfo,
  BedDouble,
  HeartHandshake,
  Hotel,
  LayoutDashboard,
  MapPin,
  Siren
} from 'lucide-react'

export const HOME_PATHS = [
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
    name: 'Políticas',
    link: '/polices',
    Icon: Siren
  }
]

export const DASHBOARD_PATHS = [
  {
    name: 'Dashboard',
    link: '/',
    Icon: LayoutDashboard
  },
  {
    name: 'Mis reservas',
    link: 'reservations',
    Icon: Hotel
  },
  {
    name: 'Mis cuartos',
    link: 'rooms',
    Icon: BedDouble
  }
]
