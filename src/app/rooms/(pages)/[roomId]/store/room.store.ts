import { IRoom } from 'services/room/room.service.types'
import { create } from 'zustand'

interface IUseSelectRoom {
  roomID: string
  setRoomID: (id: string) => void
  room: IRoom | null
  setRoom: (room: IRoom) => void
}

const useSelectRoom = create<IUseSelectRoom>(set => ({
  roomID: '',
  room: null,
  setRoomID: id => set(() => ({ roomID: id })),
  setRoom: room => set(() => ({ room, roomID: String(room.codigo) }))
}))

export default useSelectRoom
