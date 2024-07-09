import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { IRoomBusyDays } from 'services/room/room.service.types'

dayjs.extend(isBetween)

// Obtiene los días de un mes y año especificados
export const getDaysInMonth = (year: number, month: number) => {
  const daysInMonth: string[] = []
  const days = dayjs(`${year}-${month}`).daysInMonth()
  for (let day = 1; day <= days; day++) {
    daysInMonth.push(dayjs(`${year}-${month}-${day}`).format('YYYY-MM-DD'))
  }
  return daysInMonth
}

// Ordena acendentemente las fechas de las reservas
export const orderDates = (dates: IRoomBusyDays[]) => {
  return dates.sort((a, b) => {
    const dateA = new Date(a.fechaInicio)
    const dateB = new Date(b.fechaInicio)
    return dateA.getTime() - dateB.getTime()
  })
}

interface ICaaDCrossing {
  dates: IRoomBusyDays[]
  monthStringDays: string[]
  selectFrom: string
  selectEnd: string
}
// Calcula el cruce entre fechas reservadas y fechas seleccionas en un mes y año especificados
export const calculateDateCrossing = ({
  selectFrom,
  selectEnd,
  monthStringDays,
  dates
}: ICaaDCrossing) => {
  const SFrom = dayjs(selectFrom, 'YYYY-MM-DD')
  const SEnd = dayjs(selectEnd, 'YYYY-MM-DD')

  return monthStringDays.map(stringDate => {
    const day = dayjs(stringDate)
    let isBusy = false
    let isCrossing = false
    let isSelect = false
    let clientId: null | number = null

    dates.forEach(({ fechaInicio, fechaFin, idCliente }) => {
      const from = dayjs(fechaInicio)
      const to = dayjs(fechaFin)
      isSelect = (day.isAfter(SFrom) && day.isBefore(SEnd)) || day.isSame(SFrom) || day.isSame(SEnd)
      const isBetween = day.isBetween(from, to, null, '[]')

      if (day.isBetween(from, to, null, '[]')) {
        clientId = idCliente
        isBusy = true
      }
      if (isSelect && isBetween) {
        isCrossing = true
      }
    })

    return {
      clientId,
      isSelect,
      day,
      isBusy,
      isCrossing
    }
  })
}

interface INoDRangeAvailable {
  dates: IRoomBusyDays[]
  startDate: string
  endDate: string
}
// Si las fechas de inicio y salida están cruzándose con las fechas de reserva
export const noAvailableDateInRange = ({
  dates,
  endDate,
  startDate
}: INoDRangeAvailable): boolean => {
  return !!dates?.some(date => {
    const from = dayjs(date.fechaInicio, 'YYYY-MM-DD')
    const to = dayjs(date.fechaFin, 'YYYY-MM-DD')
    const start = dayjs(startDate, 'YYYY-MM-DD')
    const end = dayjs(endDate, 'YYYY-MM-DD')
    return (
      start.isBetween(from, to, null, '[]') ||
      end.isBetween(from, to, null, '[]') ||
      (start.isBefore(from) && end.isAfter(to))
    )
  })
}

// Si la fecha especificada se encuentre ya en un rango de reservas
// Similar al método de noAvailableDateInRange, pero menos rígido
export const isDateInRange = (dates: IRoomBusyDays[], date: string): boolean => {
  return !!dates?.some(currentDate => {
    const from = dayjs(currentDate.fechaInicio, 'YYYY-MM-DD')
    const to = dayjs(currentDate.fechaFin, 'YYYY-MM-DD')
    return dayjs(date).isBetween(from, to, null, '[]')
  })
}
