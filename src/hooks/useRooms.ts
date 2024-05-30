'use client'

import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { getAllRooms, getRoomById } from 'services/room/getRoom.service'
import { IRoom } from 'services/room/room.service.types'

export const ROOMS_NAME_CACHE = 'ROOMS'
export const ROOM_NAME_CACHE = 'ROOM'

export function useRooms() {
  const query = useSuspenseQuery({
    queryKey: [ROOMS_NAME_CACHE],
    queryFn: getAllRooms,
    staleTime: 20 * 1000,
    retry: 1
  })
  return { ...query }
}

export function useRoom(id: string) {
  const queryClient = useQueryClient()
  const cacheAllRooms = (queryClient.getQueryData([ROOMS_NAME_CACHE]) as IRoom[]) || []

  const query = useSuspenseQuery({
    queryKey: [ROOM_NAME_CACHE, id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey
      return await getRoomById(id)
    },
    staleTime: 20 * 1000,
    retry: 1,
    initialData:
      cacheAllRooms !== undefined ? cacheAllRooms.find(room => String(room.codigo) === id) : null
  })
  return { ...query }
}
