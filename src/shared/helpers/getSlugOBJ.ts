import { CircleOffIcon, Sparkles, TrophyIcon } from 'lucide-react'

interface ISlugOBJ {
  counter: number
  maxResults?: number
  itsFull: boolean
}

export const slugDictionary = ({ counter, itsFull, maxResults }: ISlugOBJ) => [
  {
    condition: itsFull,
    IconSlug: CircleOffIcon,
    slugDescription: 'Esta habitación esta ocupada estos días, revisa el calendario de la habitación',
    tagSlug: 'Agotado estos Dias ❌',
    classSlug: 'its-full'
  },
  {
    condition: counter >= maxResults!,
    IconSlug: TrophyIcon,
    slugDescription: `Esta habitación ha tendido una concurrencia de ${counter} reservas, los últimos días`,
    tagSlug: 'Alta concurrencia 🌟',
    classSlug: 'max-results'
  }
]

export function getSlugs({ maxResults = 10, ...slugConditions }: ISlugOBJ) {
  const defaultSlug = {
    IconSlug: Sparkles,
    slugDescription: 'Este habitación te esta esperando!! no la desaproveches',
    tagSlug: 'Opción recomendada  🤝',
    classSlug: 'bets-option'
  }
  return [defaultSlug]
  // const slugs = slugDictionary({ maxResults, ...slugConditions }).filter(slug => {
  //   return slug.condition
  // })
  // if (slugs.length >= 1) return [...slugs]
  // return [defaultSlug]
}
