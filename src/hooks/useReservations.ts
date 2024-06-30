'use client'

import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { getAllReservers } from 'services/room/getReserve.service'
import { IReservation } from 'services/room/reserve.service.types'

export const RESERVATIONS_NAME_CACHE = 'RESERVATIONS'

export function useReservations(id: string) {
  const query = useSuspenseQuery({
    queryKey: [RESERVATIONS_NAME_CACHE, id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey
      return await getAllReservers(id)
    },
    staleTime: 20 * 1000,
    retry: 1
  })
  return { ...query }
}

export function useGetReservations() {
  const queryClient = useQueryClient()
  const cacheAllRooms = queryClient.getQueryData([RESERVATIONS_NAME_CACHE]) as IReservation[]
  return cacheAllRooms ?? []
}
