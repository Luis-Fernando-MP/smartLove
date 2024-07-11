import { IReservation } from 'services/reserve/reserve.service.types'
import { create } from 'zustand'

interface IUseReservationStore {
  reservation: IReservation | null
  setReservation: (reservation: IReservation | null) => void
}

export const useReservationStore = create<IUseReservationStore>(set => ({
  reservation: null,
  setReservation(reservation) {
    return set(() => ({ reservation }))
  }
}))

interface IUseReservationsStore {
  reservations: IReservation[]
  setReservations: (reservations: IReservation[]) => void
}

export const useReservationsStore = create<IUseReservationsStore>(set => {
  return {
    reservations: [],
    setReservations(reservations) {
      set({ reservations })
    }
  }
})
