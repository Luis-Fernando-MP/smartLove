import { IReservation } from 'services/room/reserve.service.types'
import { create } from 'zustand'

interface IUseReservationsStore {
  selectReservationID: string
  reservations: IReservation[]
  setSelectReservationID: (id: string) => void
  setReservations: (reservations: IReservation[]) => void
}

export const useReservationStore = create<IUseReservationsStore>(set => ({
  selectReservationID: '',
  reservations: null as any,
  setSelectReservationID(id) {
    return set(() => ({ selectReservationID: id }))
  },
  setReservations(reservations) {
    return set(() => ({ reservations }))
  }
}))
