import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// This endpoint should only be used ONCE for initial setup
// After creating admin user, this should be disabled or removed
export async function POST(request: NextRequest) {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'adewidodo@hse.com' }
    })

    if (existingAdmin) {
      return NextResponse.json(
        { 
          message: 'Admin user already exists',
          email: 'adewidodo@hse.com',
          credentials: {
            email: 'adewidodo@hse.com',
            password: 'hse123456'
          }
        },
        { status: 200 }
      )
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('hse123456', 10)
    
    const admin = await prisma.user.create({
      data: {
        email: 'adewidodo@hse.com',
        name: 'Ade Widodo',
        password: hashedPassword,
        role: 'admin',
      },
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
          email: 'adewidodo@hse.com',
          password: 'hse123456',
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

export async function GET() {
  try {
    const adminExists = await prisma.user.findUnique({
      where: { email: 'adewidodo@hse.com' }
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
