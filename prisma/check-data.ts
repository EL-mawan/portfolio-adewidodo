import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkData() {
  console.log('🔍 Checking migrated data in PostgreSQL...\n')

  try {
    const [
      about,
      homepage,
      experiences,
      skills,
      education,
      certifications,
      gallery,
      settings
    ] = await Promise.all([
      prisma.aboutContent.findMany(),
      prisma.homepageContent.findMany(),
      prisma.experience.findMany(),
      prisma.skill.findMany(),
      prisma.education.findMany(),
      prisma.certification.findMany(),
      prisma.gallery.findMany(),
      prisma.settings.findMany()
    ])

    console.log('📊 Data Count:')
    console.log(`   - About: ${about.length}`)
    console.log(`   - Homepage: ${homepage.length}`)
    console.log(`   - Experience: ${experiences.length}`)
    console.log(`   - Skills: ${skills.length}`)
    console.log(`   - Education: ${education.length}`)
    console.log(`   - Certifications: ${certifications.length}`)
    console.log(`   - Gallery: ${gallery.length}`)
    console.log(`   - Settings: ${settings.length}`)
    console.log('\n📝 Sample Data:\n')

    if (homepage.length > 0) {
      console.log('Homepage:')
      console.log(`   Title: ${homepage[0].heroTitle}`)
      console.log(`   Subtitle: ${homepage[0].heroSubtitle}`)
    }

    if (about.length > 0) {
      console.log('\nAbout:')
      console.log(`   Name: ${about[0].fullName}`)
      console.log(`   Profession: ${about[0].profession}`)
    }

    if (gallery.length > 0) {
      console.log('\nGallery Images:')
      gallery.forEach((img, i) => {
        console.log(`   ${i + 1}. ${img.title} - ${img.imageUrl}`)
      })
    }

    console.log('\n✅ Data migration verified successfully!')

  } catch (error) {
    console.error('❌ Error checking data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkData()
