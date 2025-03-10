import { BadgeInfo, Hotel, LayoutDashboard, Siren } from 'lucide-react'

export const WHATSAPP_URL = 'https://wa.me/message/7HOKZ7Y6O6UBE1'
export const FACEBOOK_URL = 'https://www.facebook.com/Hotel.Smart.Love'
export const TIKTOK_URL = 'https://www.tiktok.com/@hotel.smart.love'

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:300/api'
export const IS_PRODUCTION = process.env.NEXT_PUBLIC_PRODUCTION !== 'false'
export const USER_WEBHOOK = IS_PRODUCTION ? process.env.CLERK_WEBHOOK_USER_EVENTS! : process.env.CLERK_WEBHOOK_USER_EVENTS_DEV!

export const SHUN_DEV = 'https://luisjp.vercel.app'

export const HOME_PATHS = {
  Resume: {
    name: 'Resumen',
    link: '/',
    Icon: BadgeInfo
  },
  Rooms: {
    name: 'Habitaciones',
    link: '/rooms/#section-view',
    Icon: Hotel
  },
  Polices: {
    name: 'Políticas',
    link: '/polices/#section-view',
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
  }
]
