import { useRoom } from 'hooks/useRooms'
import type { JSX, ReactNode } from 'react'

interface IDetails {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  id: string
}

const Details = ({ id }: IDetails): JSX.Element => {
  const { data } = useRoom(id)
  return (
    <>
      <img src={data?.imagenesHabitacion[0].urlImagen} width={500} />
      <p>{data?.nombre}</p>
      <span>{JSON.stringify(data)}</span>
    </>
  )
}

export default Details
