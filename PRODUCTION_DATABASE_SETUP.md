# 🚀 Setup Database Production dengan Neon PostgreSQL

## Step 1: Daftar di Neon (GRATIS - Tidak Perlu Kartu Kredit)

1. **Buka** https://neon.tech
2. **Klik** "Sign Up" - bisa pakai GitHub account
3. **Buat Project Baru:**
   - Project name: `portfolio-adewidodo` (atau nama yang Anda mau)
   - Region: Pilih yang paling dekat (misal: Singapore)
   - PostgreSQL version: Pilih latest (15 atau 16)
4. **Klik "Create Project"**

## Step 2: Dapatkan Connection String

Setelah project dibuat, Anda akan melihat dashboard dengan connection string.

1. **Copy Connection String** yang bertuliskan `postgresql://...`
   
   Contoh format:
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

2. **SIMPAN connection string ini** - Anda akan membutuhkannya nanti!

## Step 3: Setup di Vercel

1. **Login ke Vercel** (https://vercel.com)
2. **Pilih project Anda** (`portfolio-adewidodo`)
3. **Go to Settings** > **Environment Variables**
4. **Tambahkan 2 variables:**

   **Variable 1:**
   - Key: `DATABASE_URL`
   - Value: [Paste connection string dari Neon]
   - Environment: Production, Preview, Development (centang semua)
   - Click "Save"

   **Variable 2:**
   - Key: `JWT_SECRET`
   - Value: `portfolio-jwt-secret-2024-secure-key-change-this`
   - Environment: Production, Preview, Development (centang semua)
   - Click "Save"

## Step 4: Deploy ke Vercel

**Karena schema sudah diubah ke PostgreSQL, kita perlu push perubahan:**

```bash
# Commit dan push perubahan
git add -A
git commit -m "feat: migrate to PostgreSQL for production"
git push origin main
```

Vercel akan otomatis deploy ulang dengan database PostgreSQL yang baru!

## Step 5: Setup Database & Create Admin User

Setelah deploy selesai, kita perlu setup database di Neon:

1. **Buka Neon Dashboard** (https://console.neon.tech)
2. **Pilih project Anda**
3. **Buka SQL Editor** (di sidebar kiri)
4. **Atau gunakan connection string** untuk connect via terminal:

```bash
# Install psql jika belum ada (Ubuntu/Debian)
sudo apt-get install postgresql-client

# Connect ke Neon database
psql "postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require"
```

**ATAU lebih mudah**, gunakan Neon SQL Editor dan jalankan script ini:

### Script SQL untuk Create Tables & Admin User

```sql
-- Prisma akan auto-create tables saat pertama kali diakses dari Vercel
-- Tapi kita bisa manual create admin user:

-- Create admin user (ubah password hash sesuai kebutuhan)
INSERT INTO "User" (id, email, name, password, role, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid()::text,
  'admin@example.com',
  'Admin',
  '$2a$10$YourHashedPasswordHere',  -- Ini akan kita generate
  'admin',
  NOW(),
  NOW()
);
```

**LEBIH MUDAH - Gunakan Vercel Console:**

Setelah deploy, buka: `https://portfolio-adewidodo.vercel.app/api/setup-admin`

Saya akan buat endpoint khusus untuk initial setup!

## Step 6: Verify & Login

1. Buka **https://portfolio-adewidodo.vercel.app/login**
2. Login dengan:
   - Email: `admin@example.com`
   - Password: `admin123`

---

## 🆘 Troubleshooting

**Problem: "Can't reach database server"**
- Solution: Pastikan DATABASE_URL di Vercel environment variables sudah benar
- Check: Connection string harus include `?sslmode=require` di akhir

**Problem: "Table does not exist"**
- Solution: Akses halaman admin pertama kali, Prisma akan auto-create tables
- Atau manual run: `npx prisma db push` di Vercel console

**Problem: "Cannot login"**
- Solution: User admin belum dibuat, gunakan endpoint `/api/setup-admin`

---

## 📝 Local Development

Untuk local, Anda bisa tetap pakai SQLite atau switch ke PostgreSQL:

**Option 1: Tetap SQLite (Recommended untuk local)**
```env
# .env.local
DATABASE_URL="file:./dev.db"
```

**Option 2: Pakai Neon juga untuk local**
```env
# .env.local
DATABASE_URL="postgresql://username:password@ep-xxx.neon.tech/neondb?sslmode=require"
```

Run migrations:
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

Selesai! 🎉
