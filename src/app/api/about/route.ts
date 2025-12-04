import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const aboutContent = await db.aboutContent.findFirst({
      orderBy: { createdAt: 'desc' }
    })

    if (!aboutContent) {
      return NextResponse.json({
        fullName: 'Ade Widodo',
        profession: 'Full Stack Developer & UI/UX Designer',
        bio: 'Passionate developer with expertise in modern web technologies and a keen eye for design.',
        story: 'I started my journey in web development over 5 years ago, and since then, I have been honing my skills in creating beautiful, functional, and user-friendly applications.',
        strengths: 'Problem Solving, Creative Design, Technical Leadership, Team Collaboration',
        profileImage: null
      })
    }

    return NextResponse.json(aboutContent)
  } catch (error) {
    console.error('Error fetching about content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch about content' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, profession, bio, story, strengths, profileImage } = body

    const aboutContent = await db.aboutContent.upsert({
      where: { id: 'default' },
      update: {
        fullName,
        profession,
        bio,
        story,
        strengths,
        profileImage,
      },
      create: {
        id: 'default',
        fullName,
        profession,
        bio,
        story,
        strengths,
        profileImage,
      },
    })

    return NextResponse.json(aboutContent)
  } catch (error) {
    console.error('Error updating about content:', error)
    return NextResponse.json(
      { error: 'Failed to update about content' },
      { status: 500 }
    )
  }
}