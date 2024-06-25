import type { JSX, ReactNode } from 'react'
import { getSlugs } from 'shared/helpers/getSlugOBJ'

import './style.scss'

interface ISlugRoom {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  counter: number
  maxResults?: number
  onSale: boolean
  itsFull: boolean
}

const SlugRoom = ({ ...slugOPT }: ISlugRoom): JSX.Element => {
  const slugs = getSlugs(slugOPT)
  return (
    <article className='roomSlugs'>
      {slugs.map(slug => {
        const { IconSlug, classSlug, tagSlug, slugDescription } = slug
        return (
          <section className={`roomSlug ${classSlug}`} key={tagSlug}>
            <details className='roomSlug-details'>
              <summary className='roomSlug-summary'>{tagSlug}</summary>
              <p>{slugDescription}</p>
            </details>
            <div className='roomSlug-icon'>
              <IconSlug />
            </div>
          </section>
        )
      })}
    </article>
  )
}

export default SlugRoom
