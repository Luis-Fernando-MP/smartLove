import { CircleOffIcon, HandHelpingIcon, Sparkles, TrophyIcon } from 'lucide-react'

interface ISlugOBJ {
  counter: number
  maxResults?: number
  onSale: boolean
  itsFull: boolean
}

const slugDictionary = ({ onSale, counter, itsFull, maxResults }: ISlugOBJ) => [
  {
    condition: itsFull,
    IconSlug: CircleOffIcon,
    slugDescription:
      'Esta habitación esta ocupada estos días, revisa el calendario de la habitación',
    tagSlug: 'Agotado estos Dias ❌',
    classSlug: 'its-full'
  },
  {
    condition: counter >= maxResults!,
    IconSlug: TrophyIcon,
    slugDescription: `Esta habitación ha tendido una concurrencia de ${counter} reservas, los últimos días`,
    tagSlug: 'Alta concurrencia 🌟',
    classSlug: 'max-results'
  },
  {
    condition: onSale,
    IconSlug: HandHelpingIcon,
    slugDescription:
      'Este habitación se encuentra en una promoción de precio especial, solo para fechas festivas o días especiales',
    tagSlug: 'En promoción 🍀',
    classSlug: 'on-sale'
  }
]

export function getSlugs({ maxResults = 10, ...slugConditions }: ISlugOBJ) {
  const defaultSlug = {
    IconSlug: Sparkles,
    slugDescription: 'Este habitación te esta esperando!! no la desaproveches',
    tagSlug: 'Opción recomendada  🤝',
    classSlug: 'bets-option'
  }
  const slugs = slugDictionary({ maxResults, ...slugConditions }).filter(slug => {
    return slug.condition
  })
  console.log(slugs)
  if (slugs.length >= 1) return [...slugs]
  return [defaultSlug]
}
