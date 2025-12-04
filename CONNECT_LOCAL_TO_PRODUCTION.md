# 🔗 HUBUNGKAN LOCAL ADMIN KE PRODUCTION

## Masalah yang Dipecahkan:

Saat ini:
- ❌ Local menggunakan SQLite → Data terpisah
- ❌ Production menggunakan PostgreSQL Neon → Data terpisah
- ❌ Edit di local tidak tampil di production

Setelah setup:
- ✅ Local dan Production menggunakan database yang sama (Neon PostgreSQL)
- ✅ Edit di local admin panel → Langsung tampil di production!
- ✅ Satu database untuk semua

---

## 🚀 CARA SETUP (3 Menit!)

### Opsi 1: Menggunakan Script Otomatis (TERMUDAH)

```bash
./connect-to-production.sh
```

Script akan tanya connection string, lalu otomatis setup semuanya!

### Opsi 2: Manual

#### 1. Daftar di Neon
- Buka: https://console.neon.tech
- Sign in with GitHub (gratis, no credit card)
- Create project: `portfolio-adewidodo`
- Region: Pilih Singapore
- Copy connection string

#### 2. Update .env
Edit file `.env`:
```env
DATABASE_URL="postgresql://neondb_owner:npg_kyVf3jdL1Qhg@ep-gentle-lab-a1u7dph3-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

#### 3. Setup Database
```bash
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
```

#### 4. Restart Dev Server
```bash
# Stop (Ctrl+C) dan start lagi
npm run dev
```

---

## 🎯 Setelah Setup

### Test di Local:
```
http://localhost:3000/login
Email: admin@example.com
Password: admin123
```

### Edit Content:
1. Login ke admin panel di local
2. Edit homepage, about, upload gallery, dll
3. Content langsung tersimpan di Neon PostgreSQL

### Lihat Hasil:
- **Local:** http://localhost:3000
- **Production:** https://portfolio-adewidodo.vercel.app

**Keduanya akan menampilkan data yang sama!** 🎉

---

## ⚙️ Setup Environment di Vercel (Sekali Saja)

Agar production juga pakai database yang sama:

1. Buka: https://vercel.com/dashboard
2. Pilih project: `portfolio-adewidodo`
3. Settings → Environment Variables
4. Add variable:
   - Name: `DATABASE_URL`
   - Value: [Connection string yang sama dari Neon]
   - Environments: ✅ All

5. Redeploy project

---

## 📋 Workflow Development

```
┌─────────────────┐
│   Local Admin   │ ← Edit content di sini
│  localhost:3000 │
└────────┬────────┘
         │
         ├────► Neon PostgreSQL ◄────┐
         │      (Database Pusat)      │
         │                            │
         ▼                            │
┌─────────────────┐         ┌────────┴────────┐
│  Local Frontend │         │ Production Site │
│  localhost:3000 │         │  vercel.app     │
└─────────────────┘         └─────────────────┘
```

**Semua connect ke 1 database yang sama = Data selalu sync!**

---

## ❓ FAQ

**Q: Apakah aman edit di local langsung ke production database?**
A: Ya, karena Anda punya kontrol penuh. Tapi bisa buat branch database terpisah untuk testing.

**Q: Bagaimana kalau mau database terpisah untuk testing?**
A: Buat project Neon kedua untuk development, pakai connection string berbeda.

**Q: Perlu bayar?**
A: Tidak! Neon free tier: 0.5 GB storage, cukup untuk portfolio.

**Q: Bagaimana backup data?**
A: Neon automatically backup. Atau export via Prisma Studio: `npx prisma studio`

---

## 🎊 Ready?

Jalankan sekarang:
```bash
./connect-to-production.sh
```

Atau ikuti step manual di atas!

Good luck! 🚀
