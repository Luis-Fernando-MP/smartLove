import { NextResponse } from 'next/server'

import Characteristics from './characteristics.json'

export async function GET() {
  try {
    return Response.json(Characteristics)
  } catch (error) {
    return new NextResponse('INTERNAL SERVER ERROR', { status: 501 })
  }
}
