import { PrismaClient } from '@prisma/client'
import { promisify } from 'util'
import { exec } from 'child_process'

const execAsync = promisify(exec)

// Backup PostgreSQL URL
const postgresUrl = process.env.DATABASE_URL

async function migrateData() {
  console.log('🚀 Starting automatic data migration...\n')
  console.log('Step 1️⃣: Reading data from SQLite...\n')

  // Connect to SQLite
  const sqliteClient = new PrismaClient({
    datasources: {
      db: {
        url: 'file:./dev.db'
      }
    }
  })

  try {
    // Read all data from SQLite
    const [
      aboutContent,
      homepageContent,
      experiences,
      skills,
      education,
      certifications,
      gallery,
      settings,
      messages,
      users
    ] = await Promise.all([
      sqliteClient.aboutContent.findMany(),
      sqliteClient.homepageContent.findMany(),
      sqliteClient.experience.findMany(),
      sqliteClient.skill.findMany(),
      sqliteClient.education.findMany(),
      sqliteClient.certification.findMany(),
      sqliteClient.gallery.findMany(),
      sqliteClient.settings.findMany(),
      sqliteClient.contactMessage.findMany(),
      sqliteClient.user.findMany()
    ])

    await sqliteClient.$disconnect()

    console.log('✅ Data read from SQLite:')
    console.log(`   - About: ${aboutContent.length}`)
    console.log(`   - Homepage: ${homepageContent.length}`)
    console.log(`   - Experiences: ${experiences.length}`)
    console.log(`   - Skills: ${skills.length}`)
    console.log(`   - Education: ${education.length}`)
    console.log(`   - Certifications: ${certifications.length}`)
    console.log(`   - Gallery: ${gallery.length}`)
    console.log(`   - Settings: ${settings.length}`)
    console.log(`   - Messages: ${messages.length}`)
    console.log(`   - Users: ${users.length}`)
    console.log('')

    // Connect to PostgreSQL
    console.log('Step 2️⃣: Writing data to PostgreSQL (Neon)...\n')
    
    const postgresClient = new PrismaClient({
      datasources: {
        db: {
          url: postgresUrl
        }
      }
    })

    let migrated = 0

    // Migrate About Content
    if (aboutContent.length > 0) {
      console.log('📝 Migrating About Content...')
      for (const item of aboutContent) {
        await postgresClient.aboutContent.upsert({
          where: { id: item.id },
          update: item,
          create: item
        })
        migrated++
      }
      console.log(`   ✅ ${aboutContent.length} records migrated`)
    }

    // Migrate Homepage Content
    if (homepageContent.length > 0) {
      console.log('📝 Migrating Homepage Content...')
      for (const item of homepageContent) {
        await postgresClient.homepageContent.upsert({
          where: { id: item.id },
          update: item,
          create: item
        })
        migrated++
      }
      console.log(`   ✅ ${homepageContent.length} records migrated`)
    }

    // Migrate Experiences
    if (experiences.length > 0) {
      console.log('📝 Migrating Experiences...')
      for (const item of experiences) {
        await postgresClient.experience.upsert({
          where: { id: item.id },
          update: item,
          create: item
        })
        migrated++
      }
      console.log(`   ✅ ${experiences.length} records migrated`)
    }

    // Migrate Skills
    if (skills.length > 0) {
      console.log('📝 Migrating Skills...')
      for (const item of skills) {
        await postgresClient.skill.upsert({
          where: { id: item.id },
          update: item,
          create: item
        })
        migrated++
      }
      console.log(`   ✅ ${skills.length} records migrated`)
    }

    // Migrate Education
    if (education.length > 0) {
      console.log('📝 Migrating Education...')
      for (const item of education) {
        await postgresClient.education.upsert({
          where: { id: item.id },
          update: item,
          create: item
        })
        migrated++
      }
      console.log(`   ✅ ${education.length} records migrated`)
    }

    // Migrate Certifications
    if (certifications.length > 0) {
      console.log('📝 Migrating Certifications...')
      for (const item of certifications) {
        await postgresClient.certification.upsert({
          where: { id: item.id },
          update: item,
          create: item
        })
        migrated++
      }
      console.log(`   ✅ ${certifications.length} records migrated`)
    }

    // Migrate Gallery
    if (gallery.length > 0) {
      console.log('📝 Migrating Gallery...')
      for (const item of gallery) {
        await postgresClient.gallery.upsert({
          where: { id: item.id },
          update: item,
          create: item
        })
        migrated++
      }
      console.log(`   ✅ ${gallery.length} records migrated`)
    }

    // Migrate Settings
    if (settings.length > 0) {
      console.log('📝 Migrating Settings...')
      for (const item of settings) {
        await postgresClient.settings.upsert({
          where: { id: item.id },
          update: item,
          create: item
        })
        migrated++
      }
      console.log(`   ✅ ${settings.length} records migrated`)
    }

    // Migrate Messages
    if (messages.length > 0) {
      console.log('📝 Migrating Contact Messages...')
      for (const item of messages) {
        await postgresClient.contactMessage.upsert({
          where: { id: item.id },
          update: item,
          create: item
        })
        migrated++
      }
      console.log(`   ✅ ${messages.length} records migrated`)
    }

    // Note: Skip migrating users as we already have the new admin user

    await postgresClient.$disconnect()

    console.log('\n🎉 Migration completed successfully!')
    console.log(`✅ Total records migrated: ${migrated}`)
    console.log('\n💡 Your old data is now available in production!')
    console.log('You can check it at: https://portfolio-adewidodo.vercel.app')

  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    throw error
  }
}

migrateData()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
