import { type JSX } from 'react'
import ErrorContainer from 'shared/ui/errorContainer/ErrorContainer'
import RoomsComponentV2 from 'shared/ui/rooms/RoomsComponentV2'

const Page = (): JSX.Element => {
  return (
    <>
      <h5>Otras habitaciones recomendadas</h5>
      <ErrorContainer ErrorComponent={<p>error</p>} LoadingComponent={<p>loading...</p>}>
        <RoomsComponentV2 />
      </ErrorContainer>
    </>
  )
}

export default Page
