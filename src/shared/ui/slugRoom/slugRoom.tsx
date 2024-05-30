import { CircleOffIcon, HandHelpingIcon, Sparkles, TrophyIcon } from 'lucide-react'
import type { JSX, ReactNode } from 'react'

import './style.scss'

interface ISlugRoom {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  counter: number
  maxResults?: number
  onSale: boolean
  itsFull: boolean
}

const SlugRoom = ({ counter, maxResults = 10, onSale, itsFull }: ISlugRoom): JSX.Element => {
  let IconSlug = Sparkles
  let tagSlug = 'Tu mejor opción'
  let classSlug = 'bets-option'

  if (onSale) {
    IconSlug = HandHelpingIcon
    tagSlug = 'Precio en promoción'
    classSlug = 'on-sale'
  }
  if (counter >= maxResults) {
    IconSlug = TrophyIcon
    tagSlug = 'Opción muy elegida'
    classSlug = 'max-results'
  }
  if (!itsFull) {
    IconSlug = CircleOffIcon
    tagSlug = 'Esta habitación esta agotada'
    classSlug = 'its-full'
  }
  return (
    <section className={`roomSlug ${classSlug}`}>
      <IconSlug />
      {tagSlug}
    </section>
  )
}

export default SlugRoom
