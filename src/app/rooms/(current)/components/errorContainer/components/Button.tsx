import Spinner from './Spinner'
import { useTransition } from 'react'


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
