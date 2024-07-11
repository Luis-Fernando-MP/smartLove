import dayjs, { Dayjs } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

const fechas = [
  // {
  //   fechaInicio: '2024-07-20 00:00:00.0',
  //   fechaFin: '2024-07-25 00:00:00.0',
  //   idCliente: 9
  // },
  // {
  //   fechaInicio: '2024-07-01 00:00:00.0',
  //   fechaFin: '2024-07-06 00:00:00.0',
  //   idCliente: 5
  // },
  // {
  //   fechaInicio: '2024-07-12 00:00:00.0',
  //   fechaFin: '2024-07-15 00:00:00.0',
  //   idCliente: 3
  // }
]

const getDaysInMonth = (year: number, month: number) => {
  const daysInMonth: string[] = []
  const days = dayjs(`${year}-${month}`).daysInMonth()
  for (let day = 1; day <= days; day++) {
    daysInMonth.push(dayjs(`${year}-${month}-${day}`).format('YYYY-MM-DD'))
  }
  return daysInMonth
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
const calculateDateCrossing = ({
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

    console.log(stringDate)
    console.log(isCrossDay(day, SFrom, SEnd))

    dates.forEach(({ fechaInicio, fechaFin, idCliente }) => {
      const from = dayjs(fechaInicio)
      const to = dayjs(fechaFin)
      const isCrossDay =
        (day.isAfter(SFrom) && day.isBefore(SEnd)) || day.isSame(SFrom) || day.isSame(SEnd)
      const isBetween = day.isBetween(from, to, null, '[]')

      if (day.isBetween(from, to, null, '[]')) {
        clientId = idCliente
        isBusy = true
      }
      if (isCrossDay && isBetween) {
        isCrossing = true
      }
      console.log(stringDate)

      isSelect = isCrossDay
    })

    return {
      // clientId,
      date: stringDate,
      isBusy,
      isSelect
      // isCrossing
    }
  })
}

// Ejemplo de uso
const startDate = '2024-07-11'
const endDate = '2024-07-16'
// const result = calculateDateCrossing(startDate, endDate, 2024, 07)
const result = calculateDateCrossing({
  selectFrom: startDate,
  selectEnd: endDate,
  monthStringDays: getDaysInMonth(2024, 7),
  dates: fechas
})
// console.log(result)
