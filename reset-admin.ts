import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function resetAdmin() {
  console.log('🔧 RESET ADMIN USER')
  console.log('===================\n')

  try {
    // Check existing users
    const existingUsers = await prisma.user.findMany()
    console.log(`Found ${existingUsers.length} existing user(s):\n`)
    existingUsers.forEach(u => {
      console.log(`  - Email: ${u.email}`)
      console.log(`    Name: ${u.name || 'N/A'}`)
      console.log(`    Role: ${u.role}\n`)
    })

    // Delete all existing users
    console.log('Deleting all existing users...')
    await prisma.user.deleteMany()
    console.log('✅ All users deleted\n')

    // Create new admin user
    console.log('Creating new admin user...')
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    const newAdmin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        name: 'Admin',
        password: hashedPassword,
        role: 'admin'
      }
    })

    console.log('✅ Admin user created successfully!\n')
    console.log('📋 LOGIN CREDENTIALS:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('Email:    admin@example.com')
    console.log('Password: admin123')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('🌐 Login at: http://localhost:3000/login')
    console.log('\n✨ Done!')

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

resetAdmin()
