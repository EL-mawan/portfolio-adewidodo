import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Creating admin user...')

  // Hash password
  const hashedPassword = await bcrypt.hash('admin123', 10)

  // Create or update admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      password: hashedPassword,
    },
  })

  console.log('✅ Admin user created/updated successfully!')
  console.log('Email:', admin.email)
  console.log('Password: admin123')
  console.log('\nYou can now login with these credentials.')
}

main()
  .catch((e) => {
    console.error('Error creating admin user:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })