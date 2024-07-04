import { IReservation } from 'services/reserve/reserve.service.types'
import { create } from 'zustand'

interface IUsePruneReserveStore {
  reservation: IReservation | null
  setReservation: (reservation: IReservation | null) => void
}

export const usePruneReserveStore = create<IUsePruneReserveStore>(set => ({
  reservation: null,
  setReservation(reservation) {
    return set(() => ({ reservation }))
  }
}))
