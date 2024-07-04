import { useCallback, useEffect, useMemo } from 'react'
import { IRoom } from 'services/room/room.service.types'
import { addDays, differenceDays, stringToDate } from 'shared/helpers/formatDate'
import { round } from 'shared/helpers/round'
import { STAY_USER, currentClassCase, discountByStay } from 'shared/helpers/stayUserCases'

import useRequirementsStore from '../store/useRequirementsStore'

interface TProps {
  room?: IRoom
}

export const IGV = 0.18
export const SURCHARGE = 0.1

const useUseTotalCalculate = ({ room }: TProps) => {
  const { fromDate, stayUser, toDate, totalAmount } = useRequirementsStore()
  const {
    setFromDate,
    setToDate,
    setNights,
    setTotalAmount,
    setStayUser,
    setIvg,
    setSubtotal,
    setSurcharge
  } = useRequirementsStore()

  const roomPrice = useMemo(() => room?.precio ?? 0, [room])
  const diffDays = useMemo(
    () => differenceDays(stringToDate(fromDate), stringToDate(toDate)),
    [fromDate, toDate]
  )
  const subtotal = useMemo(() => roomPrice * diffDays, [roomPrice, diffDays])
  const totalIGV = useMemo(() => subtotal * IGV, [subtotal])
  const totalSurcharge = useMemo(() => subtotal * SURCHARGE, [subtotal])

  const calculateTotalAmount = useMemo(() => {
    const tax = totalIGV + totalSurcharge
    const total = subtotal + tax
    const discount = discountByStay(stayUser)
    return total - subtotal * discount
  }, [totalIGV, totalSurcharge, subtotal, stayUser])

  useEffect(() => {
    setNights(diffDays)
    setTotalAmount(calculateTotalAmount)
    setStayUser(currentClassCase(diffDays) as STAY_USER)
    setIvg(totalIGV)
    setSubtotal(subtotal)
    setSurcharge(totalSurcharge)
  }, [
    diffDays,
    calculateTotalAmount,
    setNights,
    setTotalAmount,
    setStayUser,
    setIvg,
    totalIGV,
    setSubtotal,
    subtotal,
    setSurcharge,
    totalSurcharge
  ])

  const handleChangeNights = useCallback(
    (total: number) => {
      if (diffDays === total) return
      const newToDate = addDays(stringToDate(fromDate), total)
      setToDate(newToDate)
    },
    [diffDays, fromDate, setToDate]
  )

  if (!room) return null

  return {
    subtotal: round(subtotal),
    totalIGV: round(totalIGV),
    totalSurcharge: round(totalSurcharge),
    totalAmount: round(totalAmount),
    roomPrice,
    diffDays,
    toDate,
    fromDate,
    stayUser,
    currentUserStay: currentClassCase(diffDays),
    setToDate,
    setFromDate,
    handleChangeNights
  }
}

export default useUseTotalCalculate
