import { IReservation } from 'services/room/reserve.service.types'
import { create } from 'zustand'

interface IUseReservationStore {
  reservation: IReservation | null
  selectedReservationId: string | null
  setReservation: (reservation: IReservation | null) => void
  selectReservation: (id: string) => void
  deselectReservation: () => void
}

export const useReservationStore = create<IUseReservationStore>(set => ({
  reservation: null,
  selectedReservationId: null,
  setReservation(reservation) {
    return set(() => ({ reservation }))
  },
  selectReservation: id => set({ selectedReservationId: id }),
  deselectReservation: () => set({ selectedReservationId: null, reservation: null })
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
