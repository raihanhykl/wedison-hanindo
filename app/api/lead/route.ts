import { NextRequest, NextResponse } from 'next/server'

// Edge Runtime configuration for Cloudflare Pages
export const runtime = 'edge'

// Google Apps Script Web App URL
const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxta1aDG6Btj7zovplN9JsNpZLXeumUw-zHnx3HlMb23aEvs1fPPXKTf_lK-8rnskqMTQ/exec'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    const webAppUrl = GOOGLE_SHEETS_WEB_APP_URL

    // Send data to Google Apps Script Web App
    // Google Apps Script does redirects, so we need to follow them
    const response = await fetch(webAppUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain', // Use text/plain to avoid CORS preflight
      },
      body: JSON.stringify(formData),
      redirect: 'follow',
    })

    const responseText = await response.text()

    // Try to parse JSON response
    let result
    try {
      result = responseText ? JSON.parse(responseText) : { success: false }
    } catch {
      // If response is not JSON, check if it contains success indicators
      if (responseText.includes('success') || responseText.includes('berhasil')) {
        return NextResponse.json(
          { success: true, message: 'Data berhasil disimpan' },
          { status: 200 }
        )
      }
      return NextResponse.json(
        { error: 'Invalid response from Google Sheets', details: responseText.substring(0, 200) },
        { status: 500 }
      )
    }

    if (result.success) {
      return NextResponse.json(
        { success: true, message: 'Data berhasil disimpan' },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { error: result.error || 'Failed to save data', details: result },
      { status: 500 }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    )
  }
}
