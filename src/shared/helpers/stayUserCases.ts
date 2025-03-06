import { between } from './formatDate'

export enum STAY_USER {
  SHORT = 'short-stay',
  MEDIUM = 'medium-stay-benefit',
  LONG = 'long-stay-discount',
  EXTENDED = 'extended-stay-premium'
}

export const stayCases = [
  { min: 1, max: 3, className: STAY_USER.SHORT },
  { min: 4, max: 6, className: STAY_USER.MEDIUM },
  { min: 7, max: 14, className: STAY_USER.LONG, discount: 0.039 },
  { min: 15, max: Infinity, className: STAY_USER.EXTENDED, discount: 0.045 }
]

export const currentClassCase = (day: number) => stayCases.find(({ min, max }) => between(day, min, max))?.className ?? ''

export const currentIndexCase = (day: number) => stayCases.findIndex(({ min, max }) => between(day, min, max))

export const discountByStay = (stay: STAY_USER): number => {
  const existUserStay = stayCases.find(({ className }) => className === stay)
  if (!existUserStay) return 0
  if (existUserStay.discount === undefined) return 0
  return existUserStay.discount
}
