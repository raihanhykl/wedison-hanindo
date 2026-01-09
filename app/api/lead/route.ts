import { NextRequest, NextResponse } from 'next/server'
import { CONTACT } from '@/utils/constants'

// Cloudflare Pages requires Edge Runtime for API routes
// For local development, you can comment this out to use Node.js runtime
// Uncomment before deploying to Cloudflare
export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, location, program } = body

    // Validate required fields
    if (!name || !phone || !location || !program) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Format email content
    const emailSubject = `New Lead from Wedison Landing Page - ${name}`
    
    // Edge Runtime compatible date formatting
    const now = new Date()
    const dateFormatter = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    const formattedDate = dateFormatter.format(now)
    
    const emailBody = `
New Lead Submission from Wedison Landing Page

Customer Information:
- Name: ${name}
- Phone: ${phone}
- Location: ${location}
- Program Interest: ${program}

Submitted at: ${formattedDate}
    `.trim()

    // TODO: Integrate with email service (Nodemailer, SendGrid, Resend, etc.)
    // For now, we'll log it to console and return success
    // In production, replace this with actual email sending service
    console.log('=== NEW LEAD SUBMISSION ===')
    console.log(emailSubject)
    console.log(emailBody)
    console.log('===========================')

    // Example email service integration (uncomment and configure):
    /*
    import nodemailer from 'nodemailer'
    // or
    import { Resend } from 'resend'
    // or
    import sgMail from '@sendgrid/mail'

    // Send email to Wedison team
    await sendEmail({
      to: CONTACT.email, // or specific email like 'leads@wedison.co'
      subject: emailSubject,
      text: emailBody,
    })
    */

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Terima kasih! Tim Wedison akan menghubungi Anda segera.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing lead form:', error)
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    )
  }
}
