import { Link } from 'next-view-transitions'
import type { FC, JSX, ReactNode } from 'react'

interface TLayout {
  children?: ReactNode[]
}
const Layout: FC<TLayout> = ({ children }): JSX.Element => {
  return (
    <section>
      <h2>Layout Auth</h2>
      <Link href='/'>Regresar</Link>
      {children}
    </section>
  )
}

export default Layout
