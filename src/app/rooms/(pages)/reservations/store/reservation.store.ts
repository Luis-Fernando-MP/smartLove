import { TClientReservation } from 'app/api/reservation/by-user/[idUser]/route'
import { create } from 'zustand'

interface IUseReservationStore {
  reservation: TClientReservation | null
  setReservation: (reservation: TClientReservation | null) => void
}

export const useReservationStore = create<IUseReservationStore>(set => ({
  reservation: null,
  setReservation(reservation) {
    return set(() => ({ reservation }))
  }
}))

interface IUseReservationsStore {
  reservations: TClientReservation[]
  setReservations: (reservations: TClientReservation[]) => void
}

export const useReservationsStore = create<IUseReservationsStore>(set => {
  return {
    reservations: [],
    setReservations(reservations) {
      set({ reservations })
    }
  }
})
