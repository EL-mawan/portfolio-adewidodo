import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const education = await db.education.findMany({
      orderBy: [
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json(education)
  } catch (error) {
    console.error('Error fetching education:', error)
    return NextResponse.json(
      { error: 'Failed to fetch education' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { degree, institution, location, startDate, endDate, current, gpa, description, order } = body

    const educationRecord = await db.education.create({
      data: {
        degree,
        institution,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current: current || false,
        gpa,
        description,
        order: order || 0,
      },
    })

    return NextResponse.json(educationRecord)
  } catch (error) {
    console.error('Error creating education:', error)
    return NextResponse.json(
      { error: 'Failed to create education' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, degree, institution, location, startDate, endDate, current, gpa, description, order } = body

    const educationRecord = await db.education.update({
      where: { id },
      data: {
        degree,
        institution,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current,
        gpa,
        description,
        order,
      },
    })

    return NextResponse.json(educationRecord)
  } catch (error) {
    console.error('Error updating education:', error)
    return NextResponse.json(
      { error: 'Failed to update education' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Education ID is required' },
        { status: 400 }
      )
    }

    await db.education.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Education record deleted successfully' })
  } catch (error) {
    console.error('Error deleting education:', error)
    return NextResponse.json(
      { error: 'Failed to delete education' },
      { status: 500 }
    )
  }
}