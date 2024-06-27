import { IReservation } from 'services/room/reserve.service.types'
import { create } from 'zustand'

interface IUseReservationsStore {
  reservation: IReservation | null
  setReservation: (reservation: IReservation | null) => void
}

export const useReservationStore = create<IUseReservationsStore>(set => ({
  reservation: null,
  setReservation(reservation) {
    return set(() => ({ reservation }))
  }
}))
