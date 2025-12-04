#!/bin/bash

# 🔗 KONEKSI LOCAL KE PRODUCTION DATABASE
# Script ini akan setup local development untuk connect ke Neon PostgreSQL

echo "================================================================"
echo "🔗 SETUP LOCAL ADMIN → PRODUCTION DATABASE CONNECTION"
echo "================================================================"
echo ""
echo "Dengan setup ini:"
echo "  ✅ Admin panel di localhost:3000/login/admin"
echo "  ✅ Connect ke database yang sama dengan production"
echo "  ✅ Edit di local → langsung tampil di production!"
echo ""
echo "================================================================"
echo ""

# Get Neon connection string
echo "📦 Step 1: Dapatkan Connection String dari Neon"
echo ""
echo "1. Buka: https://console.neon.tech"
echo "2. Login (pakai GitHub)"
echo "3. Create project: portfolio-adewidodo"
echo "4. Copy connection string"
echo ""
echo "Connection string format:"
echo "postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require"
echo ""
read -p "Paste connection string di sini: " DB_URL

if [ -z "$DB_URL" ]; then
    echo "❌ Connection string tidak boleh kosong!"
    exit 1
fi

# Update .env
echo ""
echo "📝 Updating .env file..."
cat > .env << EOF
DATABASE_URL="$DB_URL"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
NEXT_PUBLIC_API_URL="http://localhost:3000"
EOF

echo "✅ .env updated!"
echo ""

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate --quiet

# Push schema to database
echo "📤 Pushing database schema..."
npx prisma db push --accept-data-loss

# Create admin user
echo "👤 Creating admin user..."
npx tsx prisma/seed.ts

echo ""
echo "================================================================"
echo "✅ SETUP SELESAI!"
echo "================================================================"
echo ""
echo "🎉 Local development sekarang tersambung ke Neon PostgreSQL!"
echo ""
echo "Next steps:"
echo "1. Restart dev server: npm run dev"
echo "2. Login: http://localhost:3000/login"
echo "   Email: admin@example.com"
echo "   Password: admin123"
echo ""
echo "3. Edit content di local admin panel"
echo "4. Content akan langsung tampil di:"
echo "   - Local: http://localhost:3000"
echo "   - Production: https://portfolio-adewidodo.vercel.app"
echo ""
echo "================================================================"
