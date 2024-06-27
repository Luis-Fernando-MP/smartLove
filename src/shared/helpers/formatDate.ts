export const formatDate = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid Date')
  }
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const breakDownDate = (date: Date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid Date')
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  const monthIndex = date.getMonth()

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

export const addDays = (date: Date, days: number): Date => {
  const newDate = new Date(date.getTime())
  newDate.setDate(newDate.getDate() + days)
  return newDate
}

export const today = (): Date => {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60 * 1000 // Offset en milisegundos
  const localDate = new Date(now.getTime() - offset)
  return localDate
}

export const differenceDays = (from: Date, to: Date) => {
  const diff = to.getTime() - from.getTime()
  return Math.round(diff / (1000 * 3600 * 24))
}

export const stringToDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
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
