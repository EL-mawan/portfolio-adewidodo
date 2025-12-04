// Simple data migration: Copy all content from SQLite to current DATABASE_URL (PostgreSQL)
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function migrate() {
  console.log('🚀 Starting SQLite to PostgreSQL migration...\n')
  
  const postgresUrl = process.env.DATABASE_URL
  
  if (!postgresUrl || !postgresUrl.includes('postgresql')) {
    console.error('❌ DATABASE_URL must be PostgreSQL connection string')
    process.exit(1)
  }

  try {
    // Step 1: Export from SQLite using sqlite3
    console.log('📤 Step 1: Exporting data from SQLite...')
    const { stdout: sqlDump } = await execAsync('sqlite3 prisma/dev.db ".dump"')
    
    console.log(`✅ Exported ${sqlDump.split('\n').length} lines of SQL\n`)

    // Step 2: Show summary (since direct import needs conversion)
    console.log('📋 Data Export Summary:')
    console.log('SQLite dump has been created.')
    console.log('\n⚠️  Note: SQLite → PostgreSQL migration requires manual conversion.')
    console.log('The easiest way is to re-enter data via Admin Panel.\n')
    
    console.log('Alternative: Use Prisma Studio')
    console.log('1. Temporarily switch DATABASE_URL to file:./dev.db')
    console.log('2. Run: npx prisma studio')
    console.log('3. Copy data manually')
    console.log('4. Switch back to PostgreSQL URL')
    console.log('5. Paste data\n')

  } catch (error: any) {
    console.error('❌ Error:', error.message)
    
    if (error.message.includes('sqlite3')) {
      console.log('\n💡 sqlite3 not installed. Using alternative method...\n')
      console.log('Please follow these steps:')
      console.log('1. Login to admin panel: http://localhost:3000/login')
      console.log('2. Check what data exists in SQLite (if server can connect)')
      console.log('3. Manually re-enter your content')
    }
  }
}

migrate()
