import { NextResponse } from 'next/server'

import roomsData from '../../room.data.json'

interface Params {
  id: string
}

export async function GET(request: Request, response: { params: Params }) {
  try {
    const { id } = response.params
    const existRoom = roomsData.find(({ codigo }) => {
      return String(codigo) === id
    })
    if (!existRoom) return new NextResponse('INVALID ROOM', { status: 400 })
    return Response.json(existRoom)
  } catch (error) {
    console.error(error)
    return new NextResponse('INTERNAL SERVER ERROR', { status: 501 })
  }
}
