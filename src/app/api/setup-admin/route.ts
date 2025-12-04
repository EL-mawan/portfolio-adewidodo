import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// This endpoint should only be used ONCE for initial setup
// After creating admin user, this should be disabled or removed
export async function POST(request: NextRequest) {
  try {
    // Security: Only allow in development or with special setup key
    const setupKey = request.headers.get('x-setup-key')
    const isProduction = process.env.NODE_ENV === 'production'
    
    if (isProduction && setupKey !== process.env.SETUP_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized. Setup key required.' },
        { status: 401 }
      )
    }

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@example.com' }
    })

    if (existingAdmin) {
      return NextResponse.json(
        { 
          message: 'Admin user already exists',
          email: 'admin@example.com'
        },
        { status: 200 }
      )
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        name: 'Admin',
        password: hashedPassword,
        role: 'admin',
      },
    })

    // Create default homepage content
    await prisma.homepageContent.upsert({
      where: { id: 'default' },
      update: {},
      create: {
        id: 'default',
        heroTitle: 'Ade Widodo',
        heroSubtitle: 'Full Stack Developer & UI/UX Designer',
        cvUrl: null,
      },
    }).catch(() => {
      // Ignore if already exists
    })

    // Create default about content
    await prisma.aboutContent.upsert({
      where: { id: 'default' },
      update: {},
      create: {
        id: 'default',
        fullName: 'Ade Widodo',
        profession: 'Full Stack Developer & UI/UX Designer',
        bio: 'Passionate developer with expertise in modern web technologies.',
        story: 'Experienced developer specializing in creating beautiful and functional web applications.',
      },
    }).catch(() => {
      // Ignore if already exists
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Setup completed successfully!',
        admin: {
          email: admin.email,
          name: admin.name,
        },
        credentials: {
          email: 'admin@example.com',
          password: 'admin123',
          loginUrl: '/login'
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json(
      { error: 'Failed to setup admin user', details: String(error) },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// GET method for checking if setup is needed
export async function GET() {
  try {
    const adminExists = await prisma.user.findUnique({
      where: { email: 'admin@example.com' }
    })

    return NextResponse.json({
      setupRequired: !adminExists,
      message: adminExists 
        ? 'Admin user already exists. Setup not needed.' 
        : 'Setup required. Send POST request to create admin user.'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to check setup status', details: String(error) },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
