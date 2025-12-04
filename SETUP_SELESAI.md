# 🎉 SETUP SELESAI! BISA LANGSUNG PAKAI

## ✅ LOCAL (Sudah Beres!)

Saya sudah setup semuanya untuk Anda:
- ✅ Database SQLite sudah ready
- ✅ Admin user sudah dibuat
- ✅ Login sudah tested dan working

**Sekarang bisa langsung login:**
- URL: http://localhost:3000/login
- Email: `admin@example.com`
- Password: `admin123`

**Dev server sudah jalan** - tinggal buka browser!

---

## 🚀 PRODUCTION (Vercel) - Nanti Setup Pas Mau Deploy

Untuk production di Vercel, ikuti langkah simpel ini **nanti** saat mau deploy:

### Step 1: Daftar di Neon (5 menit)
1. Buka: https://neon.tech
2. Sign up pakai GitHub (gratis, no credit card)
3. Create project → copy connection string

### Step 2: Set Environment di Vercel
1. Buka: https://vercel.com
2. Project Settings → Environment Variables
3. Tambahkan:
   ```
   DATABASE_URL = postgresql://xxx (dari Neon)
   JWT_SECRET = portfolio-secret-2024
   ```

### Step 3: Update Schema untuk Production
```bash
# Di lokal, ubah prisma/schema.prisma line 12:
provider = "postgresql"  # ganti dari "sqlite"

# Commit & push
git add -A
git commit -m "chore: switch to postgresql for production"
git push
```

### Step 4: Setup Admin di Production
Buka browser:
```
https://portfolio-adewidodo.vercel.app/api/setup-admin
```

**Done!** Login di production:
```
https://portfolio-adewidodo.vercel.app/login
```

---

## 📝 Kredensial Login (Sama untuk Local & Production)
- **Email:** admin@example.com
- **Password:** admin123

❗ **PENTING:** Ganti password setelah login pertama kali!

---

## 🔧 Commands Berguna

```bash
# Jalankan development server
npm run dev

# Reset database (hapus semua data)
rm prisma/dev.db
npx prisma db push
npx tsx prisma/seed.ts

# Update schema
npx prisma db push

# Create admin user lagi
npx tsx prisma/seed.ts
```

---

## ❓ Troubleshooting

**Q: Lupa password admin?**
A: Jalankan `npx tsx prisma/seed.ts` lagi

**Q: Database error?**
A: Hapus `prisma/dev.db` dan jalankan setup ulang

**Q: Port 3000 sudah dipakai?**
A: Ubah di `package.json` script "dev"

---

**Sekarang tinggal buka browser dan coba login! 🎊**
