import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { sendPilotEmails } from '@/lib/resend'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, role, institution, email, challenge, locale } = body

  if (!name || !role || !institution || !email || !locale) {
    return NextResponse.json(
      { error: 'Missing required fields.' },
      { status: 400 }
    )
  }

  try {
    await sql`
      insert into pilot_institutions (name, role, institution, email, challenge, locale)
      values (${name}, ${role}, ${institution}, ${email}, ${challenge ?? null}, ${locale})
    `
  } catch (dbError: any) {
    if (dbError?.code === '23505') {
      // unique_violation — email already exists
      return NextResponse.json(
        { error: 'duplicate' },
        { status: 409 }
      )
    }
    console.error('[/api/pilot] DB error:', dbError)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }

  try {
    await sendPilotEmails({ name, email, role, institution, locale })
  } catch (emailError) {
    console.error('[/api/pilot] Email error:', emailError)
  }

  return NextResponse.json({ ok: true })
}
