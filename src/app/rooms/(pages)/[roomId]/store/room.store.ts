import { IRoom } from 'services/room/room.service.types'
import { create } from 'zustand'

interface IUseRoomStore {
  id: string
  room: IRoom
  setID: (id: IUseRoomStore['id']) => void
  setRoom: (room: IUseRoomStore['room']) => void
}

export const useRoomStore = create<IUseRoomStore>(set => ({
  id: '',
  setID(id) {
    return set(() => ({ id }))
  },
  room: null as any,
  setRoom(room) {
    return set(() => ({ room }))
  }
}))
