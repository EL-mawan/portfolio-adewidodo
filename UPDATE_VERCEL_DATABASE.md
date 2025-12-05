# 🔧 UPDATE DATABASE DI VERCEL

## ⚠️ MASALAH
Data yang sudah diinput di admin panel tidak tampil di production (https://portfolio-adewidodo.vercel.app/)

## 🎯 SOLUSI
Update environment variable `DATABASE_URL` di Vercel agar menggunakan database yang sama dengan local (database yang berisi data dari admin panel)

---

## 📋 LANGKAH-LANGKAH

### 1. Buka Vercel Dashboard
Kunjungi: https://vercel.com/el-mawans-projects/portfolio-adewidodo/settings/environment-variables

Atau:
1. Buka https://vercel.com/dashboard
2. Pilih project: **portfolio-adewidodo**
3. Klik tab **Settings**
4. Pilih menu **Environment Variables**

### 2. Cari Variable `DATABASE_URL`
- Jika sudah ada, klik **Edit** atau **Delete** terlebih dahulu
- Jika belum ada, Klik **Add New**

### 3. Set Value Baru
**Name:** `DATABASE_URL`

**Value:**
```
postgresql://neondb_owner:npg_yMD3t4fVrGiK@ep-winter-water-a1gxcjcc-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

**Environments:**
- ✅ Production
- ✅ Preview
- ✅ Development

### 4. Save
Klik tombol **Save**

### 5. Redeploy
Ada 2 cara:

#### Cara A: Otomatis (via Git Push)
Push commit baru ke GitHub:
```bash
git commit --allow-empty -m "trigger redeploy"
git push origin main
```

#### Cara B: Manual
1. Buka tab **Deployments**
2. Klik titik tiga (•••) pada deployment terakhir
3. Pilih **Redeploy**
4. Centang **Use existing Build Cache** (opsional, untuk lebih cepat)
5. Klik **Redeploy**

---

## ✅ VERIFIKASI

Tunggu 1-2 menit sampai deployment selesai, lalu:

1. Buka: https://portfolio-adewidodo.vercel.app/
2. Data yang sudah diinput di admin panel seharusnya sudah tampil!

---

## 📊 INFO DATABASE

**Database yang digunakan:**
- Provider: Neon PostgreSQL
- Region: Singapore (ap-southeast-1)
- Database: `neondb`
- Connection: `ep-winter-water-a1gxcjcc-pooler`

**Database ini berisi:**
- ✅ Data Experience yang sudah diinput
- ✅ Data Skills yang sudah diinput
- ✅ Data Education yang sudah diinput
- ✅ Data Certification yang sudah diinput
- ✅ Data Gallery yang sudah diinput
- ✅ User admin credentials
- ✅ Semua content dari admin panel

---

## 🔐 KEAMANAN

⚠️ **PENTING:** 
- Jangan share DATABASE_URL ke publik
- Credential ada di environment variables (tidak di-commit ke Git)
- File `.env` sudah ada di `.gitignore`

---

## 💡 TIPS

**Untuk development selanjutnya:**
1. Local dan Production sekarang menggunakan database yang sama
2. Edit di local admin → Langsung tampil di production!
3. Tidak perlu redeploy untuk perubahan content, cukup refresh browser

**Untuk backup data:**
```bash
# Export data menggunakan Prisma Studio
npx prisma studio
```

Atau buka Neon Console: https://console.neon.tech

---

## 📞 TROUBLESHOOTING

### Data masih tidak tampil setelah redeploy?
1. Cek di Vercel Dashboard → Settings → Environment Variables
2. Pastikan `DATABASE_URL` sudah benar
3. Cek Vercel Logs untuk error: https://vercel.com/el-mawans-projects/portfolio-adewidodo/logs

### Error "Can't reach database server"?
1. Pastikan Neon database masih aktif di: https://console.neon.tech
2. Cek connection string sudah benar (tidak ada typo)
3. Pastikan semua character escaped dengan benar (gunakan `&` bukan `&amp;`)

### Ingin test connection di local?
```bash
# Test koneksi database
npx prisma db pull

# Jika berhasil, akan muncul "Introspected 9 models"
```

---

## ✨ Selesai!

Setelah mengikuti langkah di atas, website production Anda akan menampilkan semua data yang sudah diinput melalui admin panel! 🎉

Good luck! 🚀
