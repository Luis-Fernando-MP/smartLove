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
    tagSlug: 'No te lo puedes perder 🌟',
    classSlug: 'max-results'
  },
  {
    condition: onSale,
    IconSlug: HandHelpingIcon,
    slugDescription: 'Este habitación se encuentra en una promoción de precio especial',
    tagSlug: 'Aprovéchalo ahora 🍀',
    classSlug: 'on-sale'
  }
]

export function getSlugOBJ({ maxResults = 10, ...slugConditions }: ISlugOBJ) {
  const defaultSlug = {
    IconSlug: Sparkles,
    slugDescription: 'Este habitación te esta esperando!! no la desaproveches',
    tagSlug: 'Opción recomendada  🤝',
    classSlug: 'bets-option'
  }
  const slug = slugDictionary({ maxResults, ...slugConditions }).find(slug => slug.condition)
  if (slug) return { ...slug }

  return { ...defaultSlug }
}
