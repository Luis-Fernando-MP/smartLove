'use client'

import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import {
  createReservation,
  deleteReservation,
  getAllReservers
} from 'services/reserve/reserve.service'

export const RESERVATIONS_NAME_CACHE = 'RESERVATIONS'

export function useReservations(id: string) {
  const query = useSuspenseQuery({
    queryKey: [RESERVATIONS_NAME_CACHE, id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey
      return await getAllReservers(id)
    },
    staleTime: 2000,
    retry: 2
  })
  return { ...query }
}

export function useCreateReservation() {
  const mutation = useMutation({
    mutationFn: createReservation,
    onError(error) {
      console.log(error)
    },
    retry: 2
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
