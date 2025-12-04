#!/bin/bash

# 🚀 VERCEL & NEON AUTO SETUP SCRIPT
# Script ini akan memandu Anda setup production dengan mudah

echo "=================================================="
echo "🚀 SETUP VERCEL & NEON DATABASE"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Setup Neon Database
echo -e "${BLUE}📦 Step 1: Setup Neon Database${NC}"
echo ""
echo "1. Buka browser: https://console.neon.tech"
echo "2. Login/Sign up (bisa pakai GitHub)"
echo "3. Create Project → nama: portfolio-adewidodo"
echo "4. Copy connection string yang muncul"
echo ""
echo -e "${YELLOW}Connection string akan seperti:${NC}"
echo "postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require"
echo ""
read -p "Paste connection string di sini: " DATABASE_URL

if [ -z "$DATABASE_URL" ]; then
    echo -e "${YELLOW}⚠️  Connection string kosong. Silakan coba lagi.${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Database URL tersimpan!${NC}"
echo ""

# Step 2: Setup Vercel
echo -e "${BLUE}🌐 Step 2: Setup Environment di Vercel${NC}"
echo ""
echo "Sekarang kita akan setup Vercel environment variables..."
echo ""
echo "Cara 1 (Manual - Recommended):"
echo "  1. Buka: https://vercel.com/dashboard"
echo "  2. Pilih project: portfolio-adewidodo"
echo "  3. Settings → Environment Variables"
echo "  4. Tambahkan variables berikut:"
echo ""
echo "     DATABASE_URL = $DATABASE_URL"
echo "     JWT_SECRET = portfolio-super-secret-jwt-2024"
echo ""
echo "  5. Save dan Redeploy"
echo ""
echo "Cara 2 (Menggunakan Vercel CLI):"
echo "  Jalankan: npx vercel env add DATABASE_URL"
echo ""

# Step 3: Commit dan Push
echo -e "${BLUE}📤 Step 3: Push ke GitHub${NC}"
echo ""
read -p "Push ke GitHub sekarang? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    git add -A
    git commit -m "chore: prepare for production deployment with PostgreSQL"
    git push origin main
    echo -e "${GREEN}✅ Code berhasil di-push!${NC}"
fi

echo ""
echo "=================================================="
echo -e "${GREEN}✅ SETUP SELESAI!${NC}"
echo "=================================================="
echo ""
echo "Next Steps:"
echo "1. Buka Vercel dashboard dan setup environment variables"
echo "2. Tunggu auto-deploy selesai"
echo "3. Buka: https://portfolio-adewidodo.vercel.app/api/setup-admin"
echo "4. Login di: https://portfolio-adewidodo.vercel.app/login"
echo ""
echo "Kredensial:"
echo "  Email: admin@example.com"
echo "  Password: admin123"
echo ""
