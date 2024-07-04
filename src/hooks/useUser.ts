'use client'

import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { createReservation, getAllReservers } from 'services/reserve/reserve.service'
import { createClient } from 'services/users/setUser.service'

export const USER_NAME_CACHE = 'USERS'

export function useCreateClient() {
  const mutation = useMutation({
    mutationFn: createClient
  })

  return { ...mutation }
}
