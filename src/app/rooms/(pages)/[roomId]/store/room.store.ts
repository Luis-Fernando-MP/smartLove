import { IRoom } from 'services/room/room.service.types'
import { create } from 'zustand'

interface IUseRoomStore {
  room: IRoom
  setRoom: (room: IUseRoomStore['room']) => void
}

export const useRoomStore = create<IUseRoomStore>(set => ({
  room: null as any,
  setRoom(room) {
    return set(() => ({ room }))
  }
}))
