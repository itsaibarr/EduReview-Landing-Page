import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

const FROM = process.env.RESEND_FROM_EMAIL!
const ADMIN = 'hello@sharedureview.site'

export async function sendWaitlistEmails({
  name,
  email,
  school,
  locale,
}: {
  name: string
  email: string
  school: string
  locale: string
}) {
  await Promise.all([
    // Confirmation to student
    resend.emails.send({
      from: FROM,
      to: email,
      subject: "You're on the EduReview waitlist",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for joining the EduReview waitlist! We're building something we think you'll love.</p>
        <p>We'll keep you updated as we grow — and we promise we will never spam you.</p>
        <p>— The EduReview Team</p>
      `,
    }),
    // Admin notification
    resend.emails.send({
      from: FROM,
      to: ADMIN,
      subject: 'New waitlist signup',
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>School:</strong> ${school}</p>
        <p><strong>Locale:</strong> ${locale}</p>
      `,
    }),
  ])
}

export async function sendPilotEmails({
  name,
  email,
  role,
  institution,
  locale,
}: {
  name: string
  email: string
  role: string
  institution: string
  locale: string
}) {
  await Promise.all([
    // Confirmation to institution contact
    resend.emails.send({
      from: FROM,
      to: email,
      subject: 'Your EduReview pilot application',
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for applying to the EduReview pilot programme. We've received your application.</p>
        <p>We'll review it and reach out within 48 hours.</p>
        <p>— The EduReview Team</p>
      `,
    }),
    // Admin notification
    resend.emails.send({
      from: FROM,
      to: ADMIN,
      subject: 'New pilot application',
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Institution:</strong> ${institution}</p>
        <p><strong>Locale:</strong> ${locale}</p>
      `,
    }),
  ])
}
