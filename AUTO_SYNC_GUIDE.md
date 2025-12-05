# 🔄 AUTO-SYNC LOCAL TO PRODUCTION

Panduan lengkap untuk membuat perubahan di localhost otomatis sync ke production Vercel.

---

## 🎯 APA YANG AKAN TERJADI SETELAH SETUP?

### ✅ Perubahan DATA (via Admin Panel)
- Edit content di `http://localhost:3000/admin`
- **LANGSUNG** terlihat di `https://portfolio-adewidodo.vercel.app/`
- **TIDAK PERLU** redeploy atau push code
- **INSTANT** sync (cukup refresh browser)

### ✅ Perubahan CODE (via VSCode/Editor)
- Edit file `.tsx`, `.css`, dll
- Push ke GitHub
- **OTOMATIS** deploy ke Vercel
- Deploy time: 1-2 menit

---

## 📋 SETUP (LAKUKAN SEKALI SAJA)

### Step 1: Setup Database Connection di Vercel

Jalankan script otomatis:

```bash
chmod +x setup-vercel-db.sh
./setup-vercel-db.sh
```

**Atau manual:**
1. Buka https://vercel.com/el-mawans-projects/portfolio-adewidodo/settings/environment-variables
2. Edit atau Add variable `DATABASE_URL`
3. Value:
   ```
   postgresql://neondb_owner:npg_yMD3t4fVrGiK@ep-winter-water-a1gxcjcc-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   ```
4. Pilih environments: Production, Preview, Development
5. Save
6. Redeploy project

### Step 2: Verifikasi Vercel Git Integration

Vercel seharusnya sudah auto-connect dengan GitHub. Untuk memastikan:

1. Buka https://vercel.com/el-mawans-projects/portfolio-adewidodo/settings/git
2. Pastikan terhubung dengan: `EL-mawan/portfolio-adewidodo`
3. Production Branch: `main`
4. Auto-deploy: **Enabled** ✅

---

## 🚀 CARA MENGGUNAKAN

### Untuk Perubahan DATA (Content):

1. **Buka Admin Panel:**
   ```
   http://localhost:3000/login
   Email: admin@example.com
   Password: admin123
   ```

2. **Edit Content:**
   - Tambah/Edit Experience, Skills, Education, dll
   - Upload gambar di Gallery
   - Update About page

3. **Lihat Hasil:**
   - **Local:** Refresh `http://localhost:3000` → Langsung tampil
   - **Production:** Refresh `https://portfolio-adewidodo.vercel.app/` → Langsung tampil
   - ✅ **TIDAK PERLU DEPLOY!** Data sync otomatis karena pakai database yang sama

---

### Untuk Perubahan CODE:

#### Opsi A: Quick Deploy (Recommended)

Gunakan script helper:

```bash
chmod +x quick-deploy.sh
./quick-deploy.sh "Pesan commit Anda"
```

Contoh:
```bash
./quick-deploy.sh "Fix: perbaiki tampilan mobile navbar"
```

Script ini akan otomatis:
1. ✅ Git add semua perubahan
2. ✅ Git commit dengan pesan yang Anda berikan
3. ✅ Git push ke GitHub
4. ✅ Vercel otomatis deploy

#### Opsi B: Manual Git

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Vercel akan otomatis detect push dan deploy dalam 1-2 menit.

#### Opsi C: Vercel CLI (Advanced)

```bash
# Install Vercel CLI (sekali saja)
npm i -g vercel

# Deploy langsung
vercel --prod
```

---

## 📊 MONITORING DEPLOYMENT

### Check Status Deployment:
- Dashboard: https://vercel.com/el-mawans-projects/portfolio-adewidodo
- Logs: https://vercel.com/el-mawans-projects/portfolio-adewidodo/logs

### Vercel akan kirim notifikasi:
- 📧 Email saat deployment start
- 📧 Email saat deployment success/fail
- 💬 Comment di GitHub PR (jika deploy dari PR)

---

## 🔄 WORKFLOW DEVELOPMENT

```
┌──────────────────────────────────────────────────────────────┐
│                    PERUBAHAN DATA                            │
│                                                              │
│  Local Admin Panel                                           │
│  localhost:3000/admin                                        │
│         │                                                    │
│         ├──► Neon PostgreSQL ◄────┐                         │
│         │    (Database Pusat)      │                         │
│         │                          │                         │
│         ▼                          ▼                         │
│  Local Frontend              Production Site                 │
│  localhost:3000              portfolio-adewidodo.vercel.app  │
│                                                              │
│  🔄 SYNC: INSTANT (cukup refresh)                            │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                    PERUBAHAN CODE                            │
│                                                              │
│  Edit di VSCode                                              │
│  (file .tsx, .css, dll)                                      │
│         │                                                    │
│         ├──► Git Push to GitHub                             │
│         │                                                    │
│         ├──► Vercel Auto-Deploy (1-2 min)                   │
│         │                                                    │
│         ▼                                                    │
│  Production Site Updated                                     │
│  portfolio-adewidodo.vercel.app                             │
│                                                              │
│  🔄 DEPLOY TIME: 1-2 menit                                   │
└──────────────────────────────────────────────────────────────┘
```

---

## 💡 TIPS & BEST PRACTICES

### ✅ DO:
- Edit content via admin panel → Instant sync
- Commit code changes dengan pesan yang jelas
- Test di local dulu sebelum push ke production
- Monitor deployment status di Vercel dashboard

### ❌ DON'T:
- Deploy manual untuk setiap perubahan content (database sudah sync)
- Push code yang belum ditest
- Commit credential atau .env ke Git

---

## 🐛 TROUBLESHOOTING

### Data tidak sync ke production?

**Cek:**
1. DATABASE_URL di Vercel sudah sama dengan local?
   - https://vercel.com/el-mawans-projects/portfolio-adewidodo/settings/environment-variables
2. Neon database masih aktif?
   - https://console.neon.tech
3. Cek Vercel logs untuk error

**Fix:**
```bash
./setup-vercel-db.sh  # Re-run setup script
```

### Code changes tidak auto-deploy?

**Cek:**
1. Git push berhasil?
   ```bash
   git log --oneline -5  # Check recent commits
   ```
2. Vercel Git integration aktif?
   - https://vercel.com/el-mawans-projects/portfolio-adewidodo/settings/git
3. Branch yang di-push adalah `main`?

**Fix:**
- Re-connect GitHub integration di Vercel
- Manual trigger deploy: `vercel --prod`

### Deployment gagal?

**Cek Logs:**
- https://vercel.com/el-mawans-projects/portfolio-adewidodo/logs

**Common Issues:**
- Build error → Fix error di code
- Environment variable missing → Check di Vercel settings
- Database connection error → Verify DATABASE_URL

---

## 📞 QUICK REFERENCE

### URLs:
- **Local Dev:** http://localhost:3000
- **Local Admin:** http://localhost:3000/login
- **Production:** https://portfolio-adewidodo.vercel.app/
- **Vercel Dashboard:** https://vercel.com/el-mawans-projects/portfolio-adewidodo
- **Neon Console:** https://console.neon.tech
- **GitHub Repo:** https://github.com/EL-mawan/portfolio-adewidodo

### Commands:
```bash
# Start local dev
npm run dev

# Quick deploy
./quick-deploy.sh "commit message"

# Setup Vercel DB (sekali saja)
./setup-vercel-db.sh

# Manual deploy
git add .
git commit -m "message"
git push origin main

# Vercel CLI deploy
vercel --prod
```

### Credentials:
```
Admin Login:
Email: admin@example.com
Password: admin123
```

---

## ✨ SELESAI!

Sekarang workflow Anda:

1. **Edit Content** → Admin Panel → **Instant Sync** ⚡
2. **Edit Code** → Git Push → **Auto Deploy (1-2 min)** 🚀

Semua otomatis! No manual deployment needed! 🎉

---

**Made with ❤️ for seamless development experience**
