import { ReactNode } from 'react'
import toast, { Toast } from 'react-hot-toast'

interface TDismissErrorToast {
  message: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  buttonTitle: string
  id?: string
  onclick: () => void
  icon?: string
}

export function DismissErrorToast({
  icon = '🤖',
  id,
  message,
  onclick,
  buttonTitle
}: TDismissErrorToast) {
  const handleClick = (t: Toast): void => {
    toast.dismiss(t.id)
    onclick()
  }

  toast(
    (t: Toast) => (
      <span>
        {message}
        <button
          className='btn'
          style={{ backgroundColor: 'var(--tn-primary)', color: 'white', marginTop: '5px' }}
          onClick={() => handleClick(t)}
        >
          {buttonTitle}
        </button>
      </span>
    ),
    {
      id: id ?? Date.now().toString()
    }
  )
}
