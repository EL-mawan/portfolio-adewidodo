import { NextResponse } from 'next/server'
import { db as prisma } from '@/lib/db'

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst()
    return NextResponse.json(settings || {})
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { footerUrl, email, phone, location, githubUrl, linkedinUrl, twitterUrl } = body

    const settings = await prisma.settings.findFirst()

    if (settings) {
      const updated = await prisma.settings.update({
        where: { id: settings.id },
        data: { 
          footerUrl,
          email,
          phone,
          location,
          githubUrl,
          linkedinUrl,
          twitterUrl
        }
      })
      return NextResponse.json(updated)
    } else {
      const created = await prisma.settings.create({
        data: { 
          footerUrl,
          email,
          phone,
          location,
          githubUrl,
          linkedinUrl,
          twitterUrl
        }
      })
      return NextResponse.json(created)
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
