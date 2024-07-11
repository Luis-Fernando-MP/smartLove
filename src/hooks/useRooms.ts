'use client'

import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { getAllRooms, getRoomById } from 'services/room/getRoom.service'
import { IRoom } from 'services/room/room.service.types'

export const ROOMS_NAME_CACHE = 'ROOMS'
export const ROOM_NAME_CACHE = 'ROOM'
export function useRooms() {
  return useSuspenseQuery({
    queryKey: [ROOMS_NAME_CACHE],
    queryFn: getAllRooms,
    staleTime: 5000,
    refetchInterval: 4000,
    retry: 2
  })
}
export function useRoom(id: string) {
  const queryClient = useQueryClient()
  const cacheAllRooms = (queryClient.getQueryData([ROOMS_NAME_CACHE]) as IRoom[]) || []

  return useSuspenseQuery({
    queryKey: [ROOM_NAME_CACHE, id],
    queryFn: async ({ queryKey }): Promise<IRoom> => {
      const [, id] = queryKey
      return await getRoomById(id)
    },

    staleTime: 500,
    retry: 2,
    initialDataUpdatedAt: 500,
    initialData:
      cacheAllRooms !== undefined
        ? cacheAllRooms.find(room => String(room.codigo) === id)
        : undefined
  })
}
