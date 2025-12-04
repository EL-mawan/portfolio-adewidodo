import { PrismaClient as PrismaClientSQLite } from '@prisma/client'
import { PrismaClient as PrismaClientPostgres } from '@prisma/client'

// Script to migrate data from SQLite to PostgreSQL

async function migrateData() {
  console.log('🚀 Starting data migration from SQLite to PostgreSQL...\n')

  // Connect to SQLite (old database)
  const sqliteUrl = 'file:./dev.db'
  const sqliteClient = new PrismaClientSQLite({
    datasources: { db: { url: sqliteUrl } }
  })

  // Connect to PostgreSQL (new database - using env var)
  const postgresClient = new PrismaClientPostgres()

  try {
    // 1. Migrate AboutContent
    console.log('📝 Migrating AboutContent...')
    const aboutContent = await sqliteClient.aboutContent.findMany()
    for (const item of aboutContent) {
      await postgresClient.aboutContent.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      })
    }
    console.log(`✅ Migrated ${aboutContent.length} AboutContent records\n`)

    // 2. Migrate HomepageContent
    console.log('📝 Migrating HomepageContent...')
    const homepageContent = await sqliteClient.homepageContent.findMany()
    for (const item of homepageContent) {
      await postgresClient.homepageContent.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      })
    }
    console.log(`✅ Migrated ${homepageContent.length} HomepageContent records\n`)

    // 3. Migrate Experience
    console.log('📝 Migrating Experience...')
    const experiences = await sqliteClient.experience.findMany()
    for (const item of experiences) {
      await postgresClient.experience.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      })
    }
    console.log(`✅ Migrated ${experiences.length} Experience records\n`)

    // 4. Migrate Skills
    console.log('📝 Migrating Skills...')
    const skills = await sqliteClient.skill.findMany()
    for (const item of skills) {
      await postgresClient.skill.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      })
    }
    console.log(`✅ Migrated ${skills.length} Skill records\n`)

    // 5. Migrate Education
    console.log('📝 Migrating Education...')
    const education = await sqliteClient.education.findMany()
    for (const item of education) {
      await postgresClient.education.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      })
    }
    console.log(`✅ Migrated ${education.length} Education records\n`)

    // 6. Migrate Certifications
    console.log('📝 Migrating Certifications...')
    const certifications = await sqliteClient.certification.findMany()
    for (const item of certifications) {
      await postgresClient.certification.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      })
    }
    console.log(`✅ Migrated ${certifications.length} Certification records\n`)

    // 7. Migrate Gallery
    console.log('📝 Migrating Gallery...')
    const gallery = await sqliteClient.gallery.findMany()
    for (const item of gallery) {
      await postgresClient.gallery.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      })
    }
    console.log(`✅ Migrated ${gallery.length} Gallery records\n`)

    // 8. Migrate Settings
    console.log('📝 Migrating Settings...')
    const settings = await sqliteClient.settings.findMany()
    for (const item of settings) {
      await postgresClient.settings.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      })
    }
    console.log(`✅ Migrated ${settings.length} Settings records\n`)

    // 9. Migrate Contact Messages
    console.log('📝 Migrating Contact Messages...')
    const messages = await sqliteClient.contactMessage.findMany()
    for (const item of messages) {
      await postgresClient.contactMessage.upsert({
        where: { id: item.id },
        update: item,
        create: item,
      })
    }
    console.log(`✅ Migrated ${messages.length} Contact Message records\n`)

    console.log('🎉 Migration completed successfully!')
    console.log('\n✅ All data has been transferred from SQLite to PostgreSQL (Neon).')
    console.log('You can now use your production database with all your previous data!')

  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  } finally {
    await sqliteClient.$disconnect()
    await postgresClient.$disconnect()
  }
}

migrateData()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
