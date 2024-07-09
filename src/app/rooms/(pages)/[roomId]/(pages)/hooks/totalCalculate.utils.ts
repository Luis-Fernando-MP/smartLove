import dayjs from 'dayjs'
import { STAY_USER, discountByStay } from 'shared/helpers/stayUserCases'

export const IGV = 0.18
export const SURCHARGE = 0.1

export const calculateDaysDifference = (fromDate: string, toDate: string) =>
  dayjs(toDate).diff(dayjs(fromDate), 'day') + 1

export const calculateTotalAmount = (
  subtotal: number,
  totalIGV: number,
  totalSurcharge: number,
  stayUser: STAY_USER
) => {
  const tax = totalIGV + totalSurcharge
  const total = subtotal + tax
  const discount = discountByStay(stayUser)
  return total - subtotal * discount
}
