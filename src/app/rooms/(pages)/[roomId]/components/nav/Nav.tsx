import NavContainer from 'app/rooms/components/navContainer/NavContainer'
import { useRoom } from 'hooks/useRooms'
import type { JSX, ReactNode } from 'react'
import Back from 'shared/ui/back/Back'

interface INav {
  children?: Readonly<ReactNode[]> | null | Readonly<ReactNode>
  id: string
}

const Nav = ({ id }: INav): JSX.Element => {
  const { data } = useRoom(id)

  return (
    <NavContainer className='roomNav'>
      <Back />
      <section>
        {data?.imagenesHabitacion.map(image => {
          const { urlImagen, estado, idImgHabitacion } = image
          return <img key={idImgHabitacion} src={urlImagen} alt={`${data.nombre}/${estado} room`} />
        })}
      </section>
    </NavContainer>
  )
}

export default Nav
