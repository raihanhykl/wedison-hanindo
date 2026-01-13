import { NextResponse } from 'next/server'

// Edge Runtime for Cloudflare Pages
export const runtime = 'edge'

const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxta1aDG6Btj7zovplN9JsNpZLXeumUw-zHnx3HlMb23aEvs1fPPXKTf_lK-8rnskqMTQ/exec'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const res = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      body: JSON.stringify(body),
    })
    
    const text = await res.text()
    
    try {
      const json = JSON.parse(text)
      if (json.success) {
        return NextResponse.json({ success: true, message: 'Data berhasil disimpan' })
      }
      return NextResponse.json({ error: json.error || 'Failed' }, { status: 500 })
    } catch {
      // Non-JSON response
      return NextResponse.json({ success: true, message: 'Data berhasil disimpan' })
    }
  } catch (err) {
    return NextResponse.json(
      { error: 'Server error', details: String(err) },
      { status: 500 }
    )
  }
}
