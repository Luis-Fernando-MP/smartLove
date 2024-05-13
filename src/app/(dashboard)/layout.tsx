import type { JSX, ReactNode } from 'react'

import Header from './components/header/Header'
import './style.scss'
import './userMobile.scss'

interface ILayout {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
}

const Layout = ({ children }: ILayout): JSX.Element => {
  return (
    <section className='dashboard'>
      <Header />
      {children}
    </section>
  )
}

export default Layout
