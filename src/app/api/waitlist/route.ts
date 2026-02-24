import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendWaitlistEmails } from '@/lib/resend'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, school, frustration, locale } = body

  if (!name || !email || !school || !locale) {
    return NextResponse.json(
      { error: 'Missing required fields.' },
      { status: 400 }
    )
  }

  const { error: dbError } = await supabase
    .from('waitlist_students')
    .insert({ name, email, school, frustration: frustration ?? null, locale })

  if (dbError) {
    if (dbError.code === '23505') {
      // unique_violation — email already exists
      return NextResponse.json(
        { error: 'duplicate' },
        { status: 409 }
      )
    }
    console.error('[/api/waitlist] DB error:', dbError)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }

  try {
    await sendWaitlistEmails({ name, email, school, locale })
  } catch (emailError) {
    // Don't fail the request if email fails — data is already saved
    console.error('[/api/waitlist] Email error:', emailError)
  }

  return NextResponse.json({ ok: true })
}
