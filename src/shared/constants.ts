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
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'http://ec2-18-220-225-128.us-east-2.compute.amazonaws.com:8080/smartpro'

export const HOME_PATHS = {
  Resume: {
    name: 'Resumen',
    link: '/',
    Icon: BadgeInfo
  },
  Services: {
    name: 'Servicios',
    link: '/services',
    Icon: HeartHandshake
  },
  Maps: {
    name: 'Ubicación',
    link: '/plat',
    Icon: MapPin
  },
  Rooms: {
    name: 'Habitaciones',
    link: '/rooms',
    Icon: Hotel
  },
  Polices: {
    name: 'Políticas',
    link: '/polices',
    Icon: Siren
  }
}

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
