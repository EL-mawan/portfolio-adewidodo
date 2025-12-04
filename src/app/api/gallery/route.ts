import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const gallery = await db.gallery.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(gallery)
  } catch (error) {
    console.error('Error fetching gallery:', error)
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const gallery = await db.gallery.create({
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        category: body.category,
        order: body.order || 0
      }
    })
    return NextResponse.json(gallery)
  } catch (error) {
    console.error('Error creating gallery:', error)
    return NextResponse.json({ error: 'Failed to create gallery' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body
    
    const gallery = await db.gallery.update({
      where: { id },
      data
    })
    return NextResponse.json(gallery)
  } catch (error) {
    console.error('Error updating gallery:', error)
    return NextResponse.json({ error: 'Failed to update gallery' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await db.gallery.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting gallery:', error)
    return NextResponse.json({ error: 'Failed to delete gallery' }, { status: 500 })
  }
}
