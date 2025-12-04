# 🔄 FINAL SYNC: Local → Production

## ✅ Yang Sudah Dilakukan:

1. **Database**: Local sudah menggunakan Neon PostgreSQL
2. **Data**: 38 records sudah di-migrate
3. **Gambar**: 47 gambar sudah di-upload ke Vercel Blob
4. **URL**: 33 image URLs sudah diupdate
5. **Code**: Semua sudah di-push ke GitHub

---

## ⚠️ LANGKAH KRUSIAL: Set Environment Variables di Vercel

Agar Production menggunakan database yang sama dengan Local, **HARUS** set environment variables di Vercel:

### 1. Buka Vercel Dashboard
https://vercel.com/dashboard

### 2. Pilih Project
Klik project: `portfolio-adewidodo`

### 3. Settings → Environment Variables

**Tambahkan 3 variables ini:**

#### Variable 1: DATABASE_URL
```
Key: DATABASE_URL
Value: postgresql://neondb_owner:npg_yMD3t4fVrGiK@ep-winter-water-a1gxcjcc-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 2: JWT_SECRET
```
Key: JWT_SECRET
Value: your-super-secret-jwt-key-change-this-in-production
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 3: BLOB_READ_WRITE_TOKEN
```
Key: BLOB_READ_WRITE_TOKEN
Value: vercel_blob_rw_bpGKBngQrW5VnkDA_izgrg6XZ9C6VTmofT9E0WgGGYXxwta
Environments: ✅ Production ✅ Preview ✅ Development
```

### 4. Redeploy
Setelah save, klik **Deployments** → titik tiga (•••) → **Redeploy**

---

## ✅ Setelah Deployment Selesai (Tunggu ~2 Menit):

### 1. Create Admin User di Production
Buka di browser:
```
https://portfolio-adewidodo.vercel.app/api/setup-admin
```

Atau via curl:
```bash
curl -X POST https://portfolio-adewidodo.vercel.app/api/setup-admin
```

Response sukses:
```json
{
  "success": true,
  "credentials": {
    "email": "adewidodo@hse.com",
    "password": "hse123456"
  }
}
```

### 2. Login ke Production
```
URL: https://portfolio-adewidodo.vercel.app/login
Email: adewidodo@hse.com
Password: hse123456
```

---

## 🎯 Hasil Akhir

Setelah steps di atas, Local dan Production akan **BENAR-BENAR SINKRON**:

- ✅ Database sama (Neon PostgreSQL)
- ✅ Data sama (About, Skills, Experience, Certifications, Gallery)
- ✅ Gambar sama (Vercel Blob - permanent storage)
- ✅ Edit di Local → Langsung tampil di Production
- ✅ Edit di Production → Langsung tampil di Local

---

## 📋 Checklist:

- [ ] Set DATABASE_URL di Vercel
- [ ] Set JWT_SECRET di Vercel
- [ ] Set BLOB_READ_WRITE_TOKEN di Vercel
- [ ] Redeploy project
- [ ] Hit /api/setup-admin
- [ ] Login ke production
- [ ] Verify data tampil semua

---

**Status deployment terakhir bisa dicek di:**
https://vercel.com/el-mawans-projects/portfolio-adewidodo/deployments

Setelah deployment selesai, buka website production dan pastikan semua data (About, Gallery, dll) tampil.
