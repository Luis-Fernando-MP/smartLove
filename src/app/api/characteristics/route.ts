import Characteristics from './characteristics.json'

export const GET = async (req: Request, res: Response) => {
  return Response.json({ data: Characteristics })
  // try {
  //   // const body = await req.json()
  //   // return new NextResponse('MESSAGES ARE REQUIRED', { status: 400 })

  // } catch (error) {
  //   return new NextResponse('INTERNAL SERVER ERROR', { status: 501 })
  // }
}
