import { config } from 'dotenv'
config() // Load .env file

import { put } from '@vercel/blob'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

async function uploadImagesToBlob() {
  console.log('🚀 Uploading all backup images to Vercel Blob...\n')
  
  // Verify token exists
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ BLOB_READ_WRITE_TOKEN not found in environment variables!')
    console.log('Please ensure BLOB_READ_WRITE_TOKEN is set in your .env file\n')
    process.exit(1)
  }

  console.log('✅ BLOB_READ_WRITE_TOKEN found\n')

  const backupDir = 'backup-images'
  const files = readdirSync(backupDir).filter(f => 
    f.endsWith('.jpeg') || f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.PNG')
  )

  console.log(`📸 Found ${files.length} images to upload\n`)

  const uploadedUrls: { filename: string; url: string }[] = []

  for (let i = 0; i < files.length; i++) {
    const filename = files[i]
    const filepath = join(backupDir, filename)
    
    try {
      console.log(`[${i + 1}/${files.length}] Uploading: ${filename}...`)
      
      // Read file
      const fileBuffer = readFileSync(filepath)
      const file = new File([fileBuffer], filename, { 
        type: filename.endsWith('.png') || filename.endsWith('.PNG') 
          ? 'image/png' 
          : 'image/jpeg' 
      })

      // Upload to Vercel Blob
      const blob = await put(filename, file, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      })

      uploadedUrls.push({ filename, url: blob.url })
      console.log(`   ✅ Uploaded: ${blob.url}\n`)

    } catch (error) {
      console.error(`   ❌ Failed to upload ${filename}:`, error)
    }
  }

  console.log('\n═══════════════════════════════════════')
  console.log('🎉 Upload Complete!')
  console.log(`✅ Successfully uploaded: ${uploadedUrls.length}/${files.length} images`)
  console.log('═══════════════════════════════════════\n')

  if (uploadedUrls.length > 0) {
    console.log('📋 Uploaded URLs (first 10):\n')
    uploadedUrls.slice(0, 10).forEach((item, i) => {
      console.log(`${i + 1}. ${item.filename}`)
      console.log(`   ${item.url}\n`)
    })
  }

  console.log('\n💡 Next Steps:')
  console.log('1. Login to admin panel: http://localhost:3000/login')
  console.log('2. Images are now in Vercel Blob (permanent cloud storage)')
  console.log('3. You can update Gallery entries with these new URLs\n')
}

uploadImagesToBlob()
  .catch(e => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
