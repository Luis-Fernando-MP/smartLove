import type { JSX, ReactNode } from 'react'
import { FallbackProps } from 'react-error-boundary'
import { DismissErrorToast } from 'shared/ui/DismissErrorToast'

interface IFallbackError {
  children?: Readonly<ReactNode[]> | null
  errorProps: FallbackProps
  ErrorComponent: JSX.Element
}

const FallbackError = ({ errorProps, ErrorComponent }: IFallbackError): JSX.Element => {
  const { error, resetErrorBoundary } = errorProps
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

  return ErrorComponent.props(resetErrorBoundary, error)
}

export default FallbackError
