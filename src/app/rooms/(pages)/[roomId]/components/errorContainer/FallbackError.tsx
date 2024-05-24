import type { JSX, ReactNode } from 'react'
import { FallbackProps } from 'react-error-boundary'
import { DismissErrorToast } from 'shared/ui/DismissErrorToast'

interface IFallbackError {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  errorProps: FallbackProps
}

const FallbackError = ({ errorProps }: IFallbackError): JSX.Element => {
  console.log(errorProps)

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

  return (
    <div>
      There was an error! <button onClick={() => resetErrorBoundary()}>Try again</button>
      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
    </div>
  )
}

export default FallbackError
