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
    retry: 2
  })

  return { ...query }
}

export function useRoom(id: string) {
  const queryClient = useQueryClient()
  const data = (queryClient.getQueryData([ROOMS_NAME_CACHE]) as IRoom[]) || []
  if (data) {
    const result = data.find(room => room.codigo === id)
    console.log('cache: ', result)
  }

  const query = useSuspenseQuery({
    queryKey: [ROOM_NAME_CACHE, id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey
      return await getRoomById(id)
    },
    staleTime: 20 * 1000,
    retry: 2,
    initialData: data !== undefined ? data.find(room => room.codigo === id) : null
  })

  return { ...query }
}
