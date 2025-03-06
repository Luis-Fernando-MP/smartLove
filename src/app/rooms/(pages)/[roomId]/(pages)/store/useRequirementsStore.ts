import { STAY_USER } from '@/shared/helpers/stayUserCases'
import dayjs from 'dayjs'
import { create } from 'zustand'

interface IUseStepsRoom {
  nights: number
  fromDate: string
  toDate: string
  totalAmount: number
  subtotal: number
  igv: number
  surcharge: number
  stayUser: STAY_USER
  setNights: (totalNights: IUseStepsRoom['nights']) => void
  setFromDate: (fromDate: Date) => void
  setToDate: (toDate: Date) => void
  setSubtotal: (subtotal: number) => void
  setIvg: (igv: number) => void
  setSurcharge: (surcharge: number) => void
  setTotalAmount: (totalAmount: IUseStepsRoom['totalAmount']) => void
  setStayUser: (stayUser: IUseStepsRoom['stayUser']) => void
}

const today = dayjs()

const useRequirementsStore = create<IUseStepsRoom>(set => ({
  nights: 1,
  fromDate: today.format('YYYY-MM-DD'),
  toDate: today.add(1, 'day').format('YYYY-MM-DD'),
  totalAmount: 0.0,
  stayUser: STAY_USER.SHORT,
  igv: 0.0,
  subtotal: 0.0,
  surcharge: 0.0,
  setNights: nights => {
    set(prevState => ({ ...prevState, nights }))
  },
  setFromDate: fromDate => {
    set(prevState => ({ ...prevState, fromDate: dayjs(fromDate).format('YYYY-MM-DD') }))
  },
  setToDate: toDate => {
    set(prevState => ({ ...prevState, toDate: dayjs(toDate).format('YYYY-MM-DD') }))
  },
  setTotalAmount: totalAmount => {
    set(prevState => ({ ...prevState, totalAmount }))
  },
  setStayUser: stayUser => {
    set(prevState => ({ ...prevState, stayUser }))
  },
  setIvg: igv => {
    set(prev => ({ ...prev, igv }))
  },
  setSubtotal: subtotal => {
    set(prev => ({ ...prev, subtotal }))
  },
  setSurcharge: surcharge => {
    set(prev => ({ ...prev, surcharge }))
  }
}))

export default useRequirementsStore
