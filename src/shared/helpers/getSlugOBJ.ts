import { CircleOffIcon, HandHelpingIcon, Sparkles, TrophyIcon } from 'lucide-react'

interface ISlugOBJ {
  counter: number
  maxResults?: number
  onSale: boolean
  itsFull: boolean
}

export function getSlugOBJ({ onSale, counter, itsFull, maxResults = 10 }: ISlugOBJ) {
  let IconSlug = Sparkles
  let tagSlug = 'Tu mejor opción 🤝'
  let classSlug = 'bets-option'

  if (onSale) {
    IconSlug = HandHelpingIcon
    tagSlug = 'Precio en promoción 🍀'
    classSlug = 'on-sale'
  }
  if (counter >= maxResults) {
    IconSlug = TrophyIcon
    tagSlug = 'Opción muy elegida 🌟'
    classSlug = 'max-results'
  }
  if (!itsFull) {
    IconSlug = CircleOffIcon
    tagSlug = 'Esta habitación esta agotada ❌'
    classSlug = 'its-full'
  }
  return {
    className: classSlug,
    IconSlug,
    tag: tagSlug
  }
}
