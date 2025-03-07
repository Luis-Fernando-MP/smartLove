'use client'

import { TFullDataRoom } from '@/app/api/rooms/route'
import { filterRooms, getAllRooms, getRoomById } from '@/services/room/getRoom.service'
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

const HOUR_IN_MS = 1000 * 60 * 60

export const ROOMS_NAME_CACHE = 'ROOMS'
export const ROOM_NAME_CACHE = 'ROOM'
export function useRooms() {
  const queryClient = useQueryClient()
  const cacheAllRooms = queryClient.getQueryData([ROOMS_NAME_CACHE]) as TFullDataRoom[]

  return useQuery({
    queryKey: [ROOMS_NAME_CACHE],
    queryFn: getAllRooms,
    staleTime: HOUR_IN_MS,
    gcTime: HOUR_IN_MS * 2,
    initialData: cacheAllRooms,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 5,
    refetchOnMount: true
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
    retry: 5,
    initialDataUpdatedAt: 500,
    initialData: cacheAllRooms !== null ? cacheAllRooms.find(room => String(room.id) === id) : null
  })
}

export function useFilterRooms() {
  const mutation = useMutation({
    mutationFn: filterRooms,
    onError(error) {
      console.log(error)
    },
    retry: 5
  })
  return mutation
}
