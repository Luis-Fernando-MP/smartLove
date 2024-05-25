import {
  BadgeInfo,
  BedDouble,
  HeartHandshake,
  Hotel,
  LayoutDashboard,
  MapPin,
  Siren
} from 'lucide-react'

export const WHATSAPP_URL = 'https://wa.me/message/7HOKZ7Y6O6UBE1'
export const FACEBOOK_URL = 'https://www.facebook.com/Hotel.Smart.Love'
export const TIKTOK_URL = 'https://www.tiktok.com/@hotel.smart.love'
export const API_URL = "http://localhost:8097" //process.env.NEXT_PUBLIC_API_URL ?? ''

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

export const DASHBOARD_PATHS = [
  {
    name: 'Dashboard',
    link: '/',
    Icon: LayoutDashboard
  },
  {
    name: 'Mis reservas',
    link: 'reservation',
    Icon: Hotel
  },
  {
    name: 'Mis cuartos',
    link: 'rooms',
    Icon: BedDouble
  }
]
