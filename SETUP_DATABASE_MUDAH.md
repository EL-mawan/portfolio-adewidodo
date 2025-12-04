# 🚀 SETUP DATABASE - LANGKAH MUDAH

## Anda punya 2 pilihan:

### ✅ PILIHAN 1: Pakai Web Dashboard (PALING MUDAH)

#### Step 1: Dapatkan Connection String dari Neon
1. Buka: https://console.neon.tech
2. Login/Sign up (gratis, pakai GitHub)
3. Create New Project → beri nama `portfolio-adewidodo`
4. Setelah dibuat, Anda akan lihat **Connection String**
5. Copy connection string yang terlihat seperti:
   ```
   postgresql://username:password@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require
   ```

#### Step 2: Update File .env
Buka file `.env` di project Anda dan ganti isinya dengan:

```env
# Database - Neon PostgreSQL
DATABASE_URL="postgresql://[paste-connection-string-dari-neon]"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# API URL
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

#### Step 3: Setup Database
```bash
# Generate Prisma Client
npx prisma generate

# Push schema ke database
npx prisma db push

# Create admin user
npx tsx prisma/seed.ts
```

#### Step 4: Test Login Local
```bash
# Jalankan dev server
npm run dev

# Buka browser: http://localhost:3000/login
# Login dengan:
# Email: admin@example.com
# Password: admin123
```

---

### ✅ PILIHAN 2: Setup untuk Vercel Production

#### Step 1: Sama seperti di atas - dapatkan connection string

#### Step 2: Setup di Vercel
1. Buka: https://vercel.com/dashboard
2. Pilih project: `portfolio-adewidodo`
3. Settings → Environment Variables
4. Add variables:
   - `DATABASE_URL` = [connection string dari Neon]
   - `JWT_SECRET` = `portfolio-secret-key-2024`
5. Save

#### Step 3: Redeploy
1. Deployments tab
2. Klik titik tiga (•••) pada deployment terakhir
3. Redeploy

#### Step 4: Create Admin di Production
Buka di browser:
```
https://portfolio-adewidodo.vercel.app/api/setup-admin
```

Atau pakai curl:
```bash
curl -X POST https://portfolio-adewidodo.vercel.app/api/setup-admin
```

#### Step 5: Login
```
https://portfolio-adewidodo.vercel.app/login
Email: admin@example.com
Password: admin123
```

---

## 🔍 Troubleshooting

**Q: Error "Can't reach database server"**
A: Pastikan connection string benar dan include `?sslmode=require`

**Q: Error "Table does not exist"**
A: Jalankan `npx prisma db push`

**Q: Lupa connection string**
A: Login ke https://console.neon.tech → pilih project → tab "Dashboard" → lihat Connection Details

---

## 📌 IMPORTANT NOTES

- **Development (Local)**: Bisa pakai connection string yang sama dari Neon
- **Production (Vercel)**: Set environment variables di Vercel dashboard
- **Connection string** harus include `?sslmode=require` di akhir
- **Gratis tier Neon**: 0.5 GB storage, cukup untuk portfolio

---

Butuh bantuan? Tanya saya! 🙋‍♂️
