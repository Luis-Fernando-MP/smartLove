import { TFullDataRoom } from '@/app/api/rooms/route'
import { create } from 'zustand'

interface IUseRoomStore {
  room: TFullDataRoom
  setRoom: (room: IUseRoomStore['room']) => void
}

export const useRoomStore = create<IUseRoomStore>(set => ({
  room: null as any,
  setRoom(room) {
    return set(() => ({ room }))
  }
}))
