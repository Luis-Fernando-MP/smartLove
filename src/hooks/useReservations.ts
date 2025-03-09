'use client'

import { createReservation, deleteReservation, getAllReservers } from '@/services/reserve/reserve.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const RESERVATIONS_NAME_CACHE = 'USER_RESERVATIONS'

export function useReservations(id?: string) {
  if (!id) return null
  const query = useQuery({
    queryKey: [RESERVATIONS_NAME_CACHE, id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey
      return await getAllReservers(id)
    },
    staleTime: 2000,
    retry: 5
  })
  return { ...query }
}

export function useCreateReservation() {
  const mutation = useMutation({
    mutationFn: createReservation,
    retry: 3
  })
  return mutation
}

export const useDeleteReservation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteReservation,
    onSuccess: ({ userId }) => {
      queryClient.invalidateQueries({
        queryKey: [RESERVATIONS_NAME_CACHE, userId]
      })
    },
    onError: error => {
      console.error('Error eliminando la reserva:', error)
    }
  })
}
