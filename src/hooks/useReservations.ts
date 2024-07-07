'use client'

import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createReservation, getAllReservers } from 'services/reserve/reserve.service'

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
  const client = useQueryClient()
  const mutation = useMutation({
    mutationFn: createReservation,
    onError(error) {
      toast.error(error.message)
      return error
    },
    onSuccess(variables) {
      client.invalidateQueries({
        queryKey: [RESERVATIONS_NAME_CACHE]
      })
    },
    retry: 2
  })

  return mutation
}
