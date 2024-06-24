'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { getAllReservers } from 'services/room/getReserve.service'

export const RESERVATIONS_NAME_CACHE = 'RESERVATIONS'

export function useReservations() {
  const query = useSuspenseQuery({
    queryKey: [RESERVATIONS_NAME_CACHE],
    queryFn: getAllReservers,
    staleTime: 20 * 1000,
    retry: 1
  })
  return { ...query }
}
