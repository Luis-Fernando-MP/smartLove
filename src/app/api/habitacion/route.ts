import { NextResponse } from 'next/server'

import roomsData from './room.data.json'

export async function GET() {
  try {
    return Response.json(roomsData)
  } catch (error) {
    return new NextResponse('INTERNAL SERVER ERROR', { status: 501 })
  }
}
