import { Reservation } from '@prisma/client'
import { create } from 'zustand'

interface IUsePruneReserveStore {
  reservation: Reservation | null
  setReservation: (reservation: Reservation | null) => void
}

export const usePruneReserveStore = create<IUsePruneReserveStore>(set => ({
  reservation: null,
  setReservation(reservation) {
    return set(() => ({ reservation }))
  }
}))
