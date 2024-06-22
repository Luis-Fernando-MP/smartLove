import type { JSX, ReactNode } from 'react'
import { getSlugOBJ } from 'shared/helpers/getSlugOBJ'

import './style.scss'

interface ISlugRoom {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  counter: number
  maxResults?: number
  onSale: boolean
  itsFull: boolean
  name: string
}

const SlugRoom = ({ ...slugOPT }: ISlugRoom): JSX.Element => {
  const { IconSlug, classSlug, tagSlug } = getSlugOBJ(slugOPT)
  return (
    <section className={`roomSlug ${classSlug}`}>
      <IconSlug />
      {tagSlug}
    </section>
  )
}

export default SlugRoom
