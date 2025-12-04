# Setup Admin User - Database Seeder

Silakan jalankan command ini untuk membuat user admin di database:

```bash
# Pastikan database sudah di-push
npx prisma db push

# Buat user admin
npx tsx prisma/seed.ts
```

## Kredensial Login Default:
- **Email**: `admin@example.com`
- **Password**: `admin123`

## Login URL:
- **Local**: http://localhost:3000/login
- **Production**: https://portfolio-adewidodo.vercel.app/login

## Catatan untuk Vercel:
Jika deploy di Vercel gagal login, kemungkinan database belum di-setup. Vercel menggunakan SQLite yang tidak persistent. Pertimbangkan untuk:
1. Menggunakan Vercel Postgres
2. Atau database external seperti PlanetScale, Neon, atau Supabase

### Setup Database untuk Production:
1. Buat database di Vercel Postgres atau provider lain
2. Update `DATABASE_URL` di environment variables Vercel
3. Jalankan migration: `npx prisma db push`
4. Jalankan seed: `npx tsx prisma/seed.ts`
