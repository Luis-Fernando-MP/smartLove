import { DismissErrorToast } from '@/shared/ui/DismissErrorToast'
import type { JSX, ReactNode } from 'react'
import { FallbackProps } from 'react-error-boundary'

interface IFallbackError {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  errorProps: FallbackProps
}

const FallbackError = ({ errorProps, children }: IFallbackError): JSX.Element => {
  const { resetErrorBoundary } = errorProps
  DismissErrorToast({
    buttonTitle: 'Actualizar',
    id: 'errorCargaDeDatosToast',
    message: (
      <p>
        Estamos teniendo <b>Problemas</b> con la carga de la información
      </p>
    ),
    onclick: () => {
      resetErrorBoundary()
    }
  })

  return <>{children}</>
}

export default FallbackError
