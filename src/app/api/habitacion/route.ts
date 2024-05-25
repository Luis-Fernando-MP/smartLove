import roomsData from './room.data.json'

export async function GET(request: Request) {
  return Response.json(roomsData)
}
