import { Reservation } from '@prisma/client'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/es'
import localeData from 'dayjs/plugin/localeData'

dayjs.locale('es')
dayjs.extend(localeData)
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
export const orderDates = (dates: Reservation[]) => {
  return dates.sort((a, b) => {
    const dateA = new Date(a.fromDate)
    const dateB = new Date(b.toDate)
    return dateA.getTime() - dateB.getTime()
  })
}

const isCrossDay = (day: Dayjs, from: Dayjs, end: Dayjs) => {
  return (day.isAfter(from) && day.isBefore(end)) || day.isSame(from) || day.isSame(end)
}

interface ICaaDCrossing {
  dates: any[]
  monthStringDays: string[]
  selectFrom: string
  selectEnd: string
}

// Calcula el cruce entre fechas reservadas y fechas seleccionas en un mes y año especificados
export const calculateDateCrossing = ({ selectFrom, selectEnd, monthStringDays, dates }: ICaaDCrossing) => {
  const firstDayOfMonth = dayjs(monthStringDays[0], 'YYYY-MM-DD')
  const firstDayOfWeek = firstDayOfMonth.day()
  const SEnd = dayjs(selectEnd, 'YYYY-MM-DD')
  const SFrom = dayjs(selectFrom, 'YYYY-MM-DD')
  // Creamos los días limpios del calendario
  const emptyDays: null[] = Array(firstDayOfWeek).fill(null)

  const daysOnMonth = monthStringDays.map(stringDate => {
    const day = dayjs(stringDate, 'YYYY-MM-DD')
    let isBusy = false
    let isCrossing = false
    const isSelect = isCrossDay(day, SFrom, SEnd)
    let userId: null | number = null
    let fullName: null | string = null

    dates.forEach(({ fromDate, toDate, client }) => {
      const from = dayjs(fromDate, 'YYYY-MM-DD')
      const to = dayjs(toDate, 'YYYY-MM-DD')
      const isBetween = day.isBetween(from, to, null, '[]')

      if (isBetween) {
        fullName = 'ejm'
        userId = client.clerkId
        isBusy = true
      }
      if (isSelect && isBetween) {
        isCrossing = true
      }
    })

    return {
      userId,
      fullName,
      isSelect,
      day,
      isBusy,
      isCrossing
    }
  })

  return [...emptyDays, ...daysOnMonth]
}
interface INoDRangeAvailable {
  dates: Reservation[]
  startDate: string
  endDate: string
}
// Si las fechas de inicio y salida están cruzándose con las fechas de reserva
export const noAvailableDateInRange = ({ dates, endDate, startDate }: INoDRangeAvailable): boolean => {
  return !!dates?.some(date => {
    const from = dayjs(date.fromDate, 'YYYY-MM-DD')
    const to = dayjs(date.toDate, 'YYYY-MM-DD')
    const start = dayjs(startDate, 'YYYY-MM-DD')
    const end = dayjs(endDate, 'YYYY-MM-DD')
    return (
      start.isBetween(from, to, null, '[]') || end.isBetween(from, to, null, '[]') || (start.isBefore(from) && end.isAfter(to))
    )
  })
}

// Si la fecha especificada se encuentre ya en un rango de reservas
// Similar al método de noAvailableDateInRange, pero menos rígido
export const isDateInRange = (dates: Reservation[], date: string): boolean => {
  return !!dates?.some(currentDate => {
    const from = dayjs(currentDate.fromDate, 'YYYY-MM-DD')
    const to = dayjs(currentDate.toDate, 'YYYY-MM-DD')
    return dayjs(date).isBetween(from, to, null, '[]')
  })
}

const shortWeekdays = dayjs.weekdaysShort()
// Ajustar formato a 'Lu', 'Ma', 'Mi', etc.
export const formattedShortWeekdays = shortWeekdays.map(day => {
  if (day.length > 2) {
    return day.charAt(0).toUpperCase() + day.charAt(1).toLowerCase()
  }
  return day
})
