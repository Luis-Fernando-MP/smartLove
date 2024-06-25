import Link from 'next/link'
import type { JSX, FC, ReactNode } from 'react'

type TLayout = {
	children?: ReactNode[]
}
const Layout: FC<TLayout> = ({ children }): JSX.Element => {
	return (
		<section>
			<h2>Layout Auth</h2>
			<Link href={'/'}>Regresar</Link>
			{children}
		</section>
	)
}

export default Layout
