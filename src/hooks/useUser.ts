'use client'

import { createClient } from '@/services/users/setUser.service'
import { useMutation } from '@tanstack/react-query'

export const USER_NAME_CACHE = 'USERS'

export function useCreateClient() {
  const mutation = useMutation({
    mutationFn: createClient
  })

  return { ...mutation }
}
