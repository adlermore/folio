import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  company: z.string().optional(),
  service: z.string().min(1),
  message: z.string().min(20),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as unknown
    const data = schema.parse(body)

    // In production: integrate Resend / SendGrid here
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({ from: '...', to: 'hello@foliostudio.co', ... })

    console.log('New enquiry:', data)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
