import { config } from 'dotenv'
config()

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Base URL for Vercel Blob storage
const BLOB_BASE_URL = 'https://bpgkbngqrw5vnkda.public.blob.vercel-storage.com'

function convertToBlobUrl(oldPath: string): string {
  // Extract filename from /uploads/filename
  const filename = oldPath.split('/').pop()!
  return `${BLOB_BASE_URL}/${filename}`
}

async function updateImageUrls() {
  console.log('🔄 Updating all image URLs to Vercel Blob...\n')

  try {
    let totalUpdated = 0

    // 1. Update Gallery
    console.log('📸 Updating Gallery images...')
    const galleryItems = await prisma.gallery.findMany()
    for (const item of galleryItems) {
      if (item.imageUrl.startsWith('/uploads/')) {
        const newUrl = convertToBlobUrl(item.imageUrl)
        
        await prisma.gallery.update({
          where: { id: item.id },
          data: { imageUrl: newUrl }
        })
        console.log(`   ✅ Updated: ${item.title}`)
        console.log(`      Old: ${item.imageUrl}`)
        console.log(`      New: ${newUrl}\n`)
        totalUpdated++
      }
    }

    // 2. Update About Content (profile image)
    console.log('👤 Updating About profile images...')
    const aboutContent = await prisma.aboutContent.findMany()
    for (const item of aboutContent) {
      if (item.profileImage && item.profileImage.startsWith('/uploads/')) {
        const newUrl = convertToBlobUrl(item.profileImage)
        
        await prisma.aboutContent.update({
          where: { id: item.id },
          data: { profileImage: newUrl }
        })
        console.log(`   ✅ Updated profile image`)
        console.log(`      Old: ${item.profileImage}`)
        console.log(`      New: ${newUrl}\n`)
        totalUpdated++
      }
    }

    // 3. Update Experience images
    console.log('💼 Updating Experience images...')
    const experiences = await prisma.experience.findMany()
    for (const item of experiences) {
      if (item.image && item.image.startsWith('/uploads/')) {
        const newUrl = convertToBlobUrl(item.image)
        
        await prisma.experience.update({
          where: { id: item.id },
          data: { image: newUrl }
        })
        console.log(`   ✅ Updated: ${item.title}`)
        console.log(`      Old: ${item.image}`)
        console.log(`      New: ${newUrl}\n`)
        totalUpdated++
      }
    }

    // 4. Update Certification images
    console.log('🎓 Updating Certification images...')
    const certifications = await prisma.certification.findMany()
    for (const item of certifications) {
      if (item.image && item.image.startsWith('/uploads/')) {
        const newUrl = convertToBlobUrl(item.image)
        
        await prisma.certification.update({
          where: { id: item.id },
          data: { image: newUrl }
        })
        console.log(`   ✅ Updated: ${item.title}`)
        console.log(`      Old: ${item.image}`)
        console.log(`      New: ${newUrl}\n`)
        totalUpdated++
      }
    }

    console.log('═══════════════════════════════════════')
    console.log('🎉 Update Complete!')
    console.log(`✅ Total images updated: ${totalUpdated}`)
    console.log('═══════════════════════════════════════\n')

    console.log('💡 All image URLs now point to Vercel Blob!')
    console.log('🌐 Your images will now work on both local and production!')
    console.log('📱 Check your website: https://portfolio-adewidodo.vercel.app\n')

  } catch (error) {
    console.error('❌ Error updating URLs:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

updateImageUrls()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
