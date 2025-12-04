import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const homepageContent = await db.homepageContent.findFirst({
      orderBy: { createdAt: 'desc' }
    })

    if (!homepageContent) {
      return NextResponse.json({
        heroTitle: 'Ade Widodo',
        heroSubtitle: 'Full Stack Developer & UI/UX Designer',
        cvUrl: ''
      })
    }

    return NextResponse.json(homepageContent)
  } catch (error) {
    console.error('Error fetching homepage content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch homepage content' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { heroTitle, heroSubtitle, cvUrl } = body

    // Convert empty strings to null for optional fields
    const data = {
      heroTitle: heroTitle || 'Ade Widodo', // Default title if empty
      heroSubtitle: heroSubtitle?.trim() || null,
      cvUrl: cvUrl?.trim() || null,
    }

    // Find existing record first
    const existing = await db.homepageContent.findFirst({
      orderBy: { createdAt: 'desc' }
    })

    let homepageContent

    if (existing) {
      // Update existing record
      homepageContent = await db.homepageContent.update({
        where: { id: existing.id },
        data,
      })
    } else {
      // Create new record
      homepageContent = await db.homepageContent.create({
        data,
      })
    }

    return NextResponse.json(homepageContent)
  } catch (error) {
    console.error('Error updating homepage content:', error)
    return NextResponse.json(
      { error: 'Failed to update homepage content' },
      { status: 500 }
    )
  }
}