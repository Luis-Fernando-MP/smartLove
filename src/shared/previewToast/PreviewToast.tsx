/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from 'react'
import toast, { Toast } from 'react-hot-toast'
import { sansitaSwashed } from 'shared/fonts'
import { v4 as uuidv4 } from 'uuid'

import './style.scss'

interface IPreviewToast {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  src: string
  title: string
  id?: string
  onClick?: () => void
  buttonTitle: string
}

const PreviewToast = ({ src, title, buttonTitle, onClick, id, children }: IPreviewToast) => {
  const handleClick = (t: Toast): void => {
    toast.dismiss(t.id)
    onClick?.()
  }

  toast(
    (t: Toast) => (
      <section className='PreviewToast'>
        <div className='PreviewToast-container'>
          <img
            className='PreviewToast-container__image'
            src={src}
            typeof='blob'
            alt='PDF preview'
          />
          <article className='PreviewToast-container__description'>
            <h5 className={`${sansitaSwashed.className} PreviewToast-title`}>{title}</h5>
            {children}
            <aside className='PreviewToast-actions'>
              <button className='PreviewToast-action' onClick={() => toast.dismiss(t.id)}>
                Cancelar
              </button>
              <button className='PreviewToast-action' onClick={() => handleClick(t)}>
                {buttonTitle}
              </button>
            </aside>
          </article>
        </div>
      </section>
    ),
    {
      id: id ?? uuidv4()
    }
  )
}

export default PreviewToast
