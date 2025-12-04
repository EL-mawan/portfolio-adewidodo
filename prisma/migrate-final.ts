import Database from 'better-sqlite3'
import { PrismaClient } from '@prisma/client'

async function migrateSQLiteToPostgres() {
  console.log('🚀 Starting SQLite → PostgreSQL Migration\n')

  // Open SQLite database
  const sqlite = new Database('prisma/dev.db', { readonly: true })
  
  // Connect to PostgreSQL (Neon)
  const postgres = new PrismaClient()

  try {
    let totalMigrated = 0

    // 1. Migrate AboutContent
    console.log('📝 Migrating AboutContent...')
    const aboutContent = sqlite.prepare('SELECT * FROM AboutContent').all()
    for (const row: any of aboutContent) {
      await postgres.aboutContent.upsert({
        where: { id: row.id },
        update: {
          fullName: row.fullName,
          profession: row.profession,
          bio: row.bio,
          story: row.story,
          strengths: row.strengths,
          profileImage: row.profileImage,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt)
        },
        create: {
          id: row.id,
          fullName: row.fullName,
          profession: row.profession,
          bio: row.bio,
          story: row.story,
          strengths: row.strengths,
          profileImage: row.profileImage,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt)
        }
      })
      totalMigrated++
    }
    console.log(`   ✅ ${aboutContent.length} records migrated\n`)

    // 2. Migrate HomepageContent
    console.log('📝 Migrating HomepageContent...')
    const homepageContent = sqlite.prepare('SELECT * FROM HomepageContent').all()
    for (const row: any of homepageContent) {
      await postgres.homepageContent.upsert({
        where: { id: row.id },
        update: {
          heroTitle: row.heroTitle,
          heroSubtitle: row.heroSubtitle,
          cvUrl: row.cvUrl,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt)
        },
        create: {
          id: row.id,
          heroTitle: row.heroTitle,
          heroSubtitle: row.heroSubtitle,
          cvUrl: row.cvUrl,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt)
        }
      })
      totalMigrated++
    }
    console.log(`   ✅ ${homepageContent.length} records migrated\n`)

    // 3. Migrate Experience
    console.log('📝 Migrating Experience...')
    const experiences = sqlite.prepare('SELECT * FROM Experience').all()
    for (const row: any of experiences) {
      await postgres.experience.upsert({
        where: { id: row.id },
        update: {
          title: row.title,
          company: row.company,
          location: row.location,
          startDate: new Date(row.startDate),
          endDate: row.endDate ? new Date(row.endDate) : null,
          description: row.description,
          image: row.image,
          current: row.current === 1,
          order: row.order,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt)
        },
        create: {
          id: row.id,
          title: row.title,
          company: row.company,
          location: row.location,
          startDate: new Date(row.startDate),
          endDate: row.endDate ? new Date(row.endDate) : null,
          description: row.description,
          image: row.image,
          current: row.current === 1,
          order: row.order,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt)
        }
      })
      totalMigrated++
    }
    console.log(`   ✅ ${experiences.length} records migrated\n`)

    // 4. Migrate Skills
    console.log('📝 Migrating Skills...')
    const skills = sqlite.prepare('SELECT * FROM Skill').all()
    for (const row: any of skills) {
      await postgres.skill.upsert({
        where: { id: row.id },
        update: {
          name: row.name,
          category: row.category,
          level: row.level,
          order: row.order,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt)
        },
        create: {
          id: row.id,
          name: row.name,
          category: row.category,
          level: row.level,
          order: row.order,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt)
        }
      })
      totalMigrated++
    }
    console.log(`   ✅ ${skills.length} records migrated\n`)

    // 5. Migrate Education
    console.log('📝 Migrating Education...')
    const education = sqlite.prepare('SELECT * FROM Education').all()
    for (const row: any of education) {
      await postgres.education.upsert({
        where: { id: row.id },
        update: {
          degree: row.degree,
          institution: row.institution,
          location: row.location,
          startDate: new Date(row.startDate),
          endDate: row.endDate ? new Date(row.endDate) : null,
          current: row.current === 1,
          gpa: row.gpa,
          description: row.description,
          order: row.order,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt)
        },
        create: {
          id: row.id,
          degree: row.degree,
          institution: row.institution,
          location: row.location,
          startDate: new Date(row.startDate),
          endDate: row.endDate ? new Date(row.endDate) : null,
          current: row.current === 1,
          gpa: row.gpa,
          description: row.description,
          order: row.order,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt)
        }
      })
      totalMigrated++
    }
    console.log(`   ✅ ${education.length} records migrated\n`)

    // 6. Migrate Certifications
    console.log('📝 Migrating Certifications...')
    const certifications = sqlite.prepare('SELECT * FROM Certification').all()
    for (const row: any of certifications) {
      await postgres.certification.upsert({
        where: { id: row.id },
        update: {
          title: row.title,
          issuer: row.issuer,
          issueDate: new Date(row.issueDate),
          expiryDate: row.expiryDate ? new Date(row.expiryDate) : null,
          credentialId: row.credentialId,
          credentialUrl: row.credentialUrl,
          image: row.image,
          description: row.description,
          order: row.order,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt)
        },
        create: {
          id: row.id,
          title: row.title,
          issuer: row.issuer,
          issueDate: new Date(row.issueDate),
          expiryDate: row.expiryDate ? new Date(row.expiryDate) : null,
          credentialId: row.credentialId,
          credentialUrl: row.credentialUrl,
          image: row.image,
          description: row.description,
          order: row.order,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt)
        }
      })
      totalMigrated++
    }
    console.log(`   ✅ ${certifications.length} records migrated\n`)

    // 7. Migrate Gallery
    console.log('📝 Migrating Gallery...')
    const gallery = sqlite.prepare('SELECT * FROM Gallery').all()
    for (const row: any of gallery) {
      await postgres.gallery.upsert({
        where: { id: row.id },
        update: {
          title: row.title,
          description: row.description,
          imageUrl: row.imageUrl,
          category: row.category,
          order: row.order,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt)
        },
        create: {
          id: row.id,
          title: row.title,
          description: row.description,
          imageUrl: row.imageUrl,
          category: row.category,
          order: row.order,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt)
        }
      })
      totalMigrated++
    }
    console.log(`   ✅ ${gallery.length} records migrated\n`)

    // 8. Migrate Settings
    console.log('📝 Migrating Settings...')
    const settings = sqlite.prepare('SELECT * FROM Settings').all()
    for (const row: any of settings) {
      await postgres.settings.upsert({
        where: { id: row.id },
        update: {
          footerUrl: row.footerUrl,
          email: row.email,
          phone: row.phone,
          location: row.location,
          githubUrl: row.githubUrl,
          linkedinUrl: row.linkedinUrl,
          twitterUrl: row.twitterUrl,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt)
        },
        create: {
          id: row.id,
          footerUrl: row.footerUrl,
          email: row.email,
          phone: row.phone,
          location: row.location,
          githubUrl: row.githubUrl,
          linkedinUrl: row.linkedinUrl,
          twitterUrl: row.twitterUrl,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt)
        }
      })
      totalMigrated++
    }
    console.log(`   ✅ ${settings.length} records migrated\n`)

    // 9. Migrate Contact Messages
    console.log('📝 Migrating Contact Messages...')
    const messages = sqlite.prepare('SELECT * FROM ContactMessage').all()
    for (const row: any of messages) {
      await postgres.contactMessage.upsert({
        where: { id: row.id },
        update: {
          name: row.name,
          email: row.email,
          subject: row.subject,
          message: row.message,
          read: row.read === 1,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt)
        },
        create: {
          id: row.id,
          name: row.name,
          email: row.email,
          subject: row.subject,
          message: row.message,
          read: row.read === 1,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt)
        }
      })
      totalMigrated++
    }
    console.log(`   ✅ ${messages.length} records migrated\n`)

    console.log('═══════════════════════════════════════')
    console.log('🎉 Migration Completed Successfully!')
    console.log(`✅ Total records migrated: ${totalMigrated}`)
    console.log('═══════════════════════════════════════')
    console.log('\n💡 All your old data is now in PostgreSQL (Neon)!')
    console.log('🌐 Check it at: https://portfolio-adewidodo.vercel.app\n')

  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    throw error
  } finally {
    sqlite.close()
    await postgres.$disconnect()
  }
}

migrateSQLiteToPostgres()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
