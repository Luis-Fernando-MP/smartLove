import { useRoom } from 'hooks/useRooms'
import type { JSX, ReactNode } from 'react'
import Back from 'shared/ui/back/Back'

import Steps from '../steps/Steps'

interface IDetails {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  id: string
}

const Details = ({ id }: IDetails): JSX.Element | null => {
  const { data } = useRoom(id)
  if (!data) return null

  return (
    <>
      <Back row />
      <Steps total={data.precio} />
      <p>{data?.nombre}</p>
      <span>{JSON.stringify(data)}</span>
    </>
  )
}

export default Details
