import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 })
    }

    // Check if we're in production (Vercel) or development (local)
    const isProduction = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production'
    
    if (isProduction && process.env.BLOB_READ_WRITE_TOKEN) {
      // Production: Use Vercel Blob
      try {
        const blob = await put(file.name, file, {
          access: 'public',
        })
        return NextResponse.json({ url: blob.url, filename: file.name })
      } catch (blobError) {
        console.error('Vercel Blob error:', blobError)
        // Fall through to local storage
      }
    }
    
    // Development or Vercel Blob fallback: Use local file system
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Create unique filename
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const filename = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExtension}`
    
    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    try {
      await mkdir(uploadsDir, { recursive: true })
    } catch (mkdirError) {
      // Directory might already exist
    }
    
    // Write file
    const filepath = path.join(uploadsDir, filename)
    await writeFile(filepath, buffer)
    
    // Return public URL
    const publicUrl = `/uploads/${filename}`
    return NextResponse.json({ url: publicUrl, filename: file.name })
    
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ 
      error: 'Failed to upload file',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
