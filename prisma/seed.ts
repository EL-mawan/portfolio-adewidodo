import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Creating admin user...')

    // Create or update admin user
    const hashedPassword = await bcrypt.hash('hse123456', 10)
    
    // Check if old admin exists and update, or create new
    const oldAdmin = await prisma.user.findUnique({ where: { email: 'admin@example.com' } })
    
    if (oldAdmin) {
      await prisma.user.update({
        where: { email: 'admin@example.com' },
        data: {
          email: 'adewidodo@hse.com',
          password: hashedPassword,
          name: 'Ade Widodo',
        }
      })
      console.log('Updated existing admin user.')
    } else {
      await prisma.user.upsert({
        where: { email: 'adewidodo@hse.com' },
        update: {
          password: hashedPassword,
          name: 'Ade Widodo',
        },
        create: {
          email: 'adewidodo@hse.com',
          name: 'Ade Widodo',
          password: hashedPassword,
          role: 'admin',
        },
      })
      console.log('Created/Updated new admin user.')
    }

    console.log('✅ Admin user credentials updated successfully!')
    console.log('Email: adewidodo@hse.com')
    console.log('Password: hse123456')
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