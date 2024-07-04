import { ISendReserveData } from 'services/reserve/reserve.service.types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IUsePayStore {
  tempPayData: ISendReserveData | null
  setTempPayData: (tempData: IUsePayStore['tempPayData']) => void
}

const usePayStore = create(
  persist<IUsePayStore>(
    set => ({
      tempPayData: null,

      setTempPayData: tempData => {
        set(prev => ({ ...prev, tempPayData: tempData }))
      }
    }),
    { name: 'payStore' }
  )
)

export default usePayStore
