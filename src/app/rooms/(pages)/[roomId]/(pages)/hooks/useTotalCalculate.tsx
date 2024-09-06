import { TFullDataRoom } from 'app/api/rooms/route'
import dayjs from 'dayjs'
import { useCallback, useEffect, useMemo } from 'react'
import { round } from 'shared/helpers/round'
import { STAY_USER, currentClassCase } from 'shared/helpers/stayUserCases'

import useRequirementsStore from '../store/useRequirementsStore'
import { calculateDaysDifference, calculateTotalAmount } from './totalCalculate.utils'

interface TProps {
  room?: TFullDataRoom
}

export const IGV = 0.18
export const SURCHARGE = 0.1

const useUseTotalCalculate = ({ room }: TProps) => {
  const {
    fromDate,
    stayUser,
    toDate,
    setFromDate,
    setToDate,
    setNights,
    setTotalAmount,
    setStayUser,
    setIvg,
    setSubtotal,
    setSurcharge
  } = useRequirementsStore()

  const roomPrice = Number(room?.price ?? 0)

  const diffDays = useMemo(() => calculateDaysDifference(fromDate, toDate), [fromDate, toDate])

  const subtotal = useMemo(() => roomPrice * diffDays, [roomPrice, diffDays])
  const totalIGV = useMemo(() => subtotal * IGV, [subtotal])
  const totalSurcharge = useMemo(() => subtotal * SURCHARGE, [subtotal])

  const totalAmount = useMemo(
    () => calculateTotalAmount(subtotal, totalIGV, totalSurcharge, stayUser),
    [subtotal, totalIGV, totalSurcharge, stayUser]
  )

  const handleChangeNights = useCallback(
    (total: number) => {
      if (diffDays === total) return
      const newToDate = dayjs(fromDate).add(total, 'day').toDate()
      setToDate(newToDate)
    },
    [diffDays, fromDate, setToDate]
  )

  useEffect(() => {
    setNights(diffDays)
    setTotalAmount(totalAmount)
    setStayUser(currentClassCase(diffDays) as STAY_USER)
    setIvg(totalIGV)
    setSubtotal(subtotal)
    setSurcharge(totalSurcharge)
  }, [
    diffDays,
    totalAmount,
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

  useEffect(() => {
    if (!room) return
    const { reservations } = room

    const reverseDates = structuredClone(reservations ?? [])?.reverse()
    for (const date of reverseDates) {
      const from = dayjs(date.fromDate, 'YYYY-MM-DD')
      const to = dayjs(date.toDate, 'YYYY-MM-DD')
      const stateFrom = dayjs(fromDate, 'YYYY-MM-DD')
      const stateTo = dayjs(toDate, 'YYYY-MM-DD')
      if (stateFrom.isBetween(from, to, null, '[]') || stateTo.isBetween(from, to, null, '[]')) {
        const newToDate = to.add(1, 'day').toDate()
        setFromDate(newToDate)
        setToDate(newToDate)
        break
      }
    }
  }, [fromDate, room, setFromDate, setToDate, toDate])

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
