import { IRoom } from 'services/room/room.service.types'
import { create } from 'zustand'

interface IUseStepsRoom {
  currentStep: 1 | 2 | 3
  setCurrentStep: (currentStep: IUseStepsRoom['currentStep']) => void
}

const useStepsRoom = create<IUseStepsRoom>(set => ({
  currentStep: 1,
  setCurrentStep(currentStep) {
    return set(() => ({ currentStep }))
  }
}))

export default useStepsRoom

interface IUseRoomStore {
  id: string
  room: IRoom | null
  setID: (id: IUseRoomStore['id']) => void
  setRoom: (room: IUseRoomStore['room']) => void
}

export const useRoomStore = create<IUseRoomStore>(set => ({
  id: '',
  setID(id) {
    return set(() => ({ id }))
  },
  room: null,
  setRoom(room) {
    return set(() => ({ room }))
  }
}))
