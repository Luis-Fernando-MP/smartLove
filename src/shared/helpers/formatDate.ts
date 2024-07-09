import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

export const breakDownDate = (date: Date) => {
  if (!dayjs(date).isValid()) throw new Error('Invalid Date')
  const dayjsDate = dayjs(date)
  const year = dayjsDate.year()
  const month = dayjsDate.format('MM')
  const day = dayjsDate.format('DD')
  const monthIndex = dayjsDate.month()
  const monthNames = [
    'ENE',
    'FEB',
    'MAR',
    'ABR',
    'MAY',
    'JUN',
    'JUL',
    'AGO',
    'SEP',
    'OCT',
    'NOV',
    'DIC'
  ]
  const monthAbbr = monthNames[monthIndex]
  return { year, month, day, monthAbbr }
}

type Comparable = number | Date
export const between = (value: Comparable, min: Comparable, max: Comparable): boolean => {
  if (value instanceof Date && min instanceof Date && max instanceof Date) {
    return value.getTime() >= min.getTime() && value.getTime() <= max.getTime()
  }
  if (typeof value === 'number' && typeof min === 'number' && typeof max === 'number') {
    return value >= min && value <= max
  }
  console.error('Los tipos de los parámetros deben ser consistentes.')
  return false
}

export const between2 = (value: Comparable, min: Comparable, max: Comparable): boolean => {
  if (dayjs(value).isValid() && dayjs(min).isValid() && dayjs(max).isValid()) {
    return dayjs(value).isBetween(min, max, null, '[]')
  }
  if (typeof value === 'number' && typeof min === 'number' && typeof max === 'number') {
    return value >= min && value <= max
  }
  console.error('Los tipos de los parámetros deben ser consistentes.')
  return false
}

export const cleanText = (text: string) => {
  const regex = /[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g
  const newText = text.match(regex)?.join('') ?? ''
  return newText
}
