'use client'

import { useMutation } from '@tanstack/react-query'
import { createClient } from 'services/users/setUser.service'

export const USER_NAME_CACHE = 'USERS'

export function useCreateClient() {
  const mutation = useMutation({
    mutationFn: createClient
  })

  return { ...mutation }
}
