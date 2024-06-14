import type { JSX, ReactNode } from 'react'
import { getSlugOBJ } from 'shared/helpers/getSlugOBJ'

import './style.scss'

interface ISlugRoom {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  counter: number
  maxResults?: number
  onSale: boolean
  itsFull: boolean
}

const SlugRoom = ({ ...slugOPT }: ISlugRoom): JSX.Element => {
  const { IconSlug, className, tag } = getSlugOBJ(slugOPT)
  return (
    <section className={`roomSlug ${className}`}>
      <IconSlug />
      {tag}
    </section>
  )
}

export default SlugRoom
