import { addDays, formatDate, today } from 'shared/helpers/formatDate'
import { STAY_USER } from 'shared/helpers/stayUserCases'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

const useRequirementsStore = create(
  persist<IUseStepsRoom>(
    set => ({
      nights: 1,
      fromDate: formatDate(today()),
      toDate: formatDate(addDays(today(), 1)),
      totalAmount: 0.0,
      stayUser: STAY_USER.SHORT,
      igv: 0.0,
      subtotal: 0.0,
      surcharge: 0.0,
      setNights: nights => {
        set(prevState => ({ ...prevState, nights }))
      },
      setFromDate: fromDate => {
        set(prevState => ({ ...prevState, fromDate: formatDate(fromDate) }))
      },
      setToDate: toDate => {
        set(prevState => ({ ...prevState, toDate: formatDate(toDate) }))
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
    }),
    {
      name: 'howDays'
    }
  )
)

export default useRequirementsStore
