# 🔐 LOGIN ADMIN PANEL

## ✅ KREDENSIAL LOGIN (SUDAH DIRESET)

```
Email:    admin@example.com
Password: admin123
```

**Login URL:** http://localhost:3000/login

---

## 🔧 JIKA LUPA PASSWORD

Jalankan command berikut untuk reset admin user:

```bash
npm run admin:reset
```

Atau:

```bash
npx tsx reset-admin.ts
```

Script akan:
1. ✅ Hapus semua user yang ada
2. ✅ Buat admin user baru
3. ✅ Password: `admin123`
4. ✅ Email: `admin@example.com`

---

## 📊 SETELAH LOGIN

Anda bisa akses:

- **Dashboard:** http://localhost:3000/admin
- **About Management:** Edit profil dan tentang
- **Skills Management:** Tambah/edit keahlian
- **Experience Management:** Tambah/edit pengalaman kerja
- **Education Management:** Tambah/edit pendidikan
- **Certification Management:** Tambah/edit sertifikat
- **Gallery Management:** Upload dan kelola gambar
- **Homepage Settings:** Edit hero section
- **Settings:** Konfigurasi footer dan kontak

---

## 🔄 AUTO-SYNC KE PRODUCTION

Setelah login dan edit content:
- ✅ Perubahan di local **LANGSUNG sync** ke production
- ✅ Tidak perlu deploy untuk perubahan data
- ✅ Cukup refresh browser di production

---

## 🎯 QUICK COMMANDS

```bash
# Reset admin user
npm run admin:reset

# Start dev server
npm run dev

# Quick deploy code changes
./quick-deploy.sh "commit message"
```

---

## ❓ TROUBLESHOOTING

### Tidak bisa login setelah reset?
1. Pastikan dev server running: `npm run dev`
2. Clear browser cache dan cookies
3. Coba incognito/private mode
4. Check terminal untuk error

### Error "Invalid credentials"?
- Email: `admin@example.com` (pastikan huruf kecil semua)
- Password: `admin123` (case sensitive)
- Jalankan `npm run admin:reset` untuk reset ulang

### Lupa email admin yang aktif?
Jalankan ini untuk cek:
```bash
npx tsx -e "import { PrismaClient } from '@prisma/client'; const p = new PrismaClient(); p.user.findMany().then(u => u.forEach(x => console.log('Email:', x.email))).finally(() => p.\$disconnect())"
```

---

## 📝 CATATAN PENTING

- ⚠️ Password default `admin123` hanya untuk development
- 🔒 Di production, gunakan password yang kuat
- 🔐 Jangan share kredensial admin
- 💾 Backup data secara berkala

---

**Happy Admin-ing! 🚀**
