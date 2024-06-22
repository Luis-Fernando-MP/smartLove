import type { JSX } from 'react'

import './style.scss'

interface ISlugTooltip {
  className: string
  description: string
  tag: string
}

const SlugTooltip = ({ description, tag, className }: ISlugTooltip): JSX.Element => {
  return (
    <div className={`tooltip-container ${className}`}>
      <span className='tooltip-tag'>{tag}</span>
      <p className='tooltip-float'>{description}</p>
    </div>
  )
}

export default SlugTooltip
