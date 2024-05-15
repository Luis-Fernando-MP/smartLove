import roomsData from '../room.data.json'

interface Params {
  id: string
}

export async function GET(request: Request, response: { params: Params }) {
  const { id } = response.params
  return Response.json({
    room: roomsData.find(({ codigo }) => {
      return codigo === id
    })
  })
}
