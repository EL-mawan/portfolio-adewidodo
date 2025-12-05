#!/bin/bash

echo "🚀 SYNC LOCAL TO PRODUCTION - OTOMATIS"
echo "========================================"
echo ""
echo "Script ini akan:"
echo "1. ✅ Setup DATABASE_URL di Vercel"
echo "2. ✅ Deploy ulang production"
echo "3. ✅ Production akan sync dengan local"
echo ""

# Get DATABASE_URL from .env
if [ -f .env ]; then
    DATABASE_URL=$(grep "^DATABASE_URL=" .env | cut -d '=' -f2- | tr -d '"')
    echo "📋 DATABASE_URL dari local:"
    echo "   ${DATABASE_URL:0:50}..."
    echo ""
else
    echo "❌ File .env tidak ditemukan!"
    exit 1
fi

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm i -g vercel
fi

echo "🔗 Linking to Vercel project..."
vercel link --yes --scope el-mawans-projects --project portfolio-adewidodo 2>/dev/null

echo ""
echo "🔧 Setting DATABASE_URL environment variable..."
echo ""

# Remove old DATABASE_URL if exists
vercel env rm DATABASE_URL production --yes 2>/dev/null
vercel env rm DATABASE_URL preview --yes 2>/dev/null  
vercel env rm DATABASE_URL development --yes 2>/dev/null

# Add new DATABASE_URL
echo "$DATABASE_URL" | vercel env add DATABASE_URL production
echo "$DATABASE_URL" | vercel env add DATABASE_URL preview
echo "$DATABASE_URL" | vercel env add DATABASE_URL development

echo ""
echo "✅ DATABASE_URL berhasil di-set!"
echo ""
echo "🚀 Triggering production deployment..."
echo ""

# Trigger deployment
git commit --allow-empty -m "chore: trigger production deployment"
git push origin main

echo ""
echo "✅ SELESAI!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⏳ Tunggu 1-2 menit untuk deployment selesai"
echo ""
echo "📊 Monitor deployment:"
echo "   https://vercel.com/el-mawans-projects/portfolio-adewidodo"
echo ""
echo "🎯 Setelah selesai, test login di:"
echo "   https://portfolio-adewidodo.vercel.app/login"
echo ""
echo "🔐 Kredensial:"
echo "   Email: adewidodo@hse.com"
echo "   Password: hse123456"
echo ""
echo "✨ Data akan sync antara local dan production!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
