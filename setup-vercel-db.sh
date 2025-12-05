#!/bin/bash

echo "🔧 SETUP VERCEL DATABASE CONNECTION"
echo "======================================"
echo ""
echo "Script ini akan mengupdate environment variable DATABASE_URL di Vercel"
echo "agar production menggunakan database yang sama dengan local development."
echo ""
echo "⚠️  PASTIKAN sudah install Vercel CLI:"
echo "    npm i -g vercel"
echo ""
read -p "Sudah install Vercel CLI? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Installing Vercel CLI..."
    npm i -g vercel
fi

echo ""
echo "📋 Login ke Vercel..."
vercel login

echo ""
echo "🔗 Link project (jika belum)..."
vercel link --yes

echo ""
echo "📝 Set DATABASE_URL environment variable..."
DATABASE_URL="postgresql://neondb_owner:npg_yMD3t4fVrGiK@ep-winter-water-a1gxcjcc-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

vercel env rm DATABASE_URL production --yes 2>/dev/null
vercel env rm DATABASE_URL preview --yes 2>/dev/null
vercel env rm DATABASE_URL development --yes 2>/dev/null

echo "$DATABASE_URL" | vercel env add DATABASE_URL production
echo "$DATABASE_URL" | vercel env add DATABASE_URL preview
echo "$DATABASE_URL" | vercel env add DATABASE_URL development

echo ""
echo "✅ Environment variable berhasil di-set!"
echo ""
echo "🚀 Triggering deployment..."
vercel --prod

echo ""
echo "✨ SELESAI!"
echo ""
echo "Tunggu 1-2 menit untuk deployment selesai."
echo "Cek status: https://vercel.com/el-mawans-projects/portfolio-adewidodo"
echo ""
echo "Setelah selesai, https://portfolio-adewidodo.vercel.app/ akan:"
echo "  ✅ Menampilkan data yang sama dengan localhost:3000"
echo "  ✅ Auto-sync setiap ada perubahan di admin panel"
echo "  ✅ Auto-deploy setiap ada git push"
echo ""
