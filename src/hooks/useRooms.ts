'use client'

import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { TFullDataRoom } from 'app/api/rooms/route'
import { getAllRooms, getRoomById } from 'services/room/getRoom.service'

export const ROOMS_NAME_CACHE = 'ROOMS'
export const ROOM_NAME_CACHE = 'ROOM'
export function useRooms() {
  const queryClient = useQueryClient()
  const cacheAllRooms = queryClient.getQueryData([ROOMS_NAME_CACHE]) as TFullDataRoom[]
  return useSuspenseQuery({
    queryKey: [ROOMS_NAME_CACHE],
    queryFn: getAllRooms,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 2,
    initialData: cacheAllRooms
  })
}
export function useRoom(id: string) {
  const queryClient = useQueryClient()
  const cacheAllRooms = (queryClient.getQueryData([ROOMS_NAME_CACHE]) as TFullDataRoom[]) || []

  return useSuspenseQuery({
    queryKey: [ROOM_NAME_CACHE, id],
    queryFn: async ({ queryKey }): Promise<TFullDataRoom> => {
      const [, id] = queryKey
      return await getRoomById(id)
    },

    staleTime: 500,
    retry: 2,
    initialDataUpdatedAt: 500,
    initialData:
      cacheAllRooms !== undefined ? cacheAllRooms.find(room => String(room.id) === id) : undefined
  })
}
