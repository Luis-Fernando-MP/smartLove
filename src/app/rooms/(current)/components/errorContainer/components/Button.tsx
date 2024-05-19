import { useTransition } from 'react'

import Spinner from './Spinner'

export default function Button({ children, onClick }) {
  const [isPending, startTransition] = useTransition()

  const handleClick = e => {
    startTransition(() => {
      onClick(e)
    })
  }

  return (
    <>
      <button onClick={handleClick} disabled={isPending}>
        {children} {isPending ? <Spinner /> : null}
      </button>
    </>
  )
}
