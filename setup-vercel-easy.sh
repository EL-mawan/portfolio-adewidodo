#!/bin/bash

# CARA TERCEPAT SETUP DATABASE DI VERCEL
# ======================================
# Script ini akan memberikan instruksi dan membuka browser otomatis

echo "🚀 SETUP VERCEL DATABASE - OTOMATIS"
echo "===================================="
echo ""
echo "Saya akan membuka Vercel Dashboard untuk Anda."
echo "Ikuti langkah berikut di browser:"
echo ""
echo "1️⃣  Login ke Vercel (jika belum)"
echo "2️⃣  Di halaman Environment Variables, klik 'Add New'"
echo "3️⃣  Set:"
echo "     Name: DATABASE_URL"
echo "     Value: (akan di-copy otomatis ke clipboard)"
echo "     Environments: Production, Preview, Development (semua)"
echo "4️⃣  Klik Save"
echo "5️⃣  Redeploy project"
echo ""

# Copy DATABASE_URL ke clipboard
DATABASE_URL="postgresql://neondb_owner:npg_yMD3t4fVrGiK@ep-winter-water-a1gxcjcc-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Check if xclip or wl-copy available
if command -v xclip &> /dev/null; then
    echo "$DATABASE_URL" | xclip -selection clipboard
    echo "✅ DATABASE_URL sudah di-copy ke clipboard!"
elif command -v wl-copy &> /dev/null; then
    echo "$DATABASE_URL" | wl-copy
    echo "✅ DATABASE_URL sudah di-copy ke clipboard!"
else
    echo "⚠️  Clipboard tool tidak tersedia."
    echo "📋 Copy manual DATABASE_URL berikut:"
    echo ""
    echo "$DATABASE_URL"
    echo ""
fi

echo ""
echo "📖 DATABASE_URL yang akan di-set:"
echo "   postgresql://neondb_owner:npg_yMD3t4fVr...@ep-winter-water-a1gxcjcc..."
echo ""
read -p "Tekan ENTER untuk membuka Vercel Dashboard..." 

# Open browser
if command -v xdg-open &> /dev/null; then
    xdg-open "https://vercel.com/el-mawans-projects/portfolio-adewidodo/settings/environment-variables"
elif command -v open &> /dev/null; then
    open "https://vercel.com/el-mawans-projects/portfolio-adewidodo/settings/environment-variables"
else
    echo ""
    echo "🌐 Buka URL ini di browser:"
    echo "   https://vercel.com/el-mawans-projects/portfolio-adewidodo/settings/environment-variables"
fi

echo ""
echo "⏳ Setelah save di Vercel, lanjut dengan redeploy..."
echo ""
read -p "Sudah set DATABASE_URL di Vercel? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 Membuka halaman Deployments untuk redeploy..."
    
    if command -v xdg-open &> /dev/null; then
        xdg-open "https://vercel.com/el-mawans-projects/portfolio-adewidodo"
    elif command -v open &> /dev/null; then
        open "https://vercel.com/el-mawans-projects/portfolio-adewidodo"
    else
        echo "🌐 Buka URL ini untuk redeploy:"
        echo "   https://vercel.com/el-mawans-projects/portfolio-adewidodo"
    fi
    
    echo ""
    echo "Di halaman Deployments:"
    echo "1. Klik titik tiga (•••) pada deployment terakhir"
    echo "2. Pilih 'Redeploy'"
    echo "3. Klik 'Redeploy'"
    echo ""
    echo "⏳ Tunggu 1-2 menit untuk deployment selesai"
    echo ""
    echo "✅ SELESAI! Production akan sync dengan local!"
    echo ""
    echo "📊 Cek hasil:"
    echo "   https://portfolio-adewidodo.vercel.app/"
else
    echo ""
    echo "❌ Setup dibatalkan."
    echo "Jalankan script lagi kapan pun siap: ./setup-vercel-easy.sh"
fi

echo ""
