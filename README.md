# 🚀 Ade Widodo - Personal Portfolio

Portfolio website pribadi yang dibangun dengan teknologi modern untuk menampilkan profil profesional, keahlian, pengalaman, dan proyek-proyek yang telah dikerjakan.

## ✨ Technology Stack

Website ini dibangun menggunakan teknologi terkini:

### 🎯 Core Framework
- **⚡ Next.js 15** - React framework untuk production dengan App Router
- **📘 TypeScript 5** - JavaScript dengan type-safe untuk pengalaman development yang lebih baik
- **🎨 Tailwind CSS 4** - Utility-first CSS framework untuk pengembangan UI yang cepat

### 🧩 UI Components & Styling
- **🧩 shadcn/ui** - Komponen berkualitas tinggi dan accessible berbasis Radix UI
- **🎯 Lucide React** - Library icon yang indah dan konsisten
- **🌈 Framer Motion** - Library animasi production-ready untuk React
- **🎨 Next Themes** - Dukungan dark mode yang sempurna

### 📋 Forms & Validation
- **🎣 React Hook Form** - Form yang performant dengan validasi mudah
- **✅ Zod** - Schema validation TypeScript-first

### 🔄 State Management & Data Fetching
- **🐻 Zustand** - State management yang simple dan scalable
- **🔄 TanStack Query** - Sinkronisasi data yang powerful untuk React
- **🌐 Axios** - HTTP client berbasis Promise

### 🗄️ Database & Backend
- **🗄️ Prisma** - ORM generasi terbaru untuk Node.js dan TypeScript
- **🔐 JWT Authentication** - Sistem autentikasi yang aman

### 🎨 Advanced UI Features
- **📊 TanStack Table** - Headless UI untuk membangun tabel dan datagrid
- **🖱️ DND Kit** - Toolkit drag and drop modern untuk React
- **📊 Recharts** - Library chart yang dibangun dengan React dan D3
- **🖼️ Sharp** - Image processing performa tinggi

### 🌍 Internationalization & Utilities
- **🌍 Next Intl** - Library internationalization untuk Next.js
- **📅 Date-fns** - Library utilitas tanggal JavaScript modern
- **🪝 ReactUse** - Koleksi React hooks esensial untuk development modern

## 🎯 Fitur Utama

- **🏎️ Fast Development** - Tooling dan best practices yang sudah dikonfigurasi
- **🎨 Beautiful UI** - Library komponen shadcn/ui lengkap dengan interaksi advanced
- **🔒 Type Safety** - Konfigurasi TypeScript lengkap dengan validasi Zod
- **📱 Responsive** - Prinsip desain mobile-first dengan animasi smooth
- **🗄️ Database Ready** - Prisma ORM dikonfigurasi untuk pengembangan backend yang cepat
- **🔐 Auth Included** - Autentikasi JWT untuk alur keamanan
- **📊 Data Visualization** - Charts, tables, dan fungsi drag-and-drop
- **🌍 i18n Ready** - Dukungan multi-bahasa dengan Next Intl
- **🚀 Production Ready** - Setting build dan deployment yang optimal

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup database
npm run db:push

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi berjalan.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── admin/          # Admin panel pages
│   ├── api/            # API routes
│   ├── about/          # About page
│   ├── contact/        # Contact page
│   ├── education/      # Education page
│   ├── experience/     # Experience page
│   ├── skills/         # Skills page
│   └── certification/  # Certification page
├── components/          # Reusable React components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
└── lib/                # Utility functions and configurations

prisma/
└── schema.prisma       # Database schema
```

## 🎨 Halaman & Fitur

### 🌐 Public Pages
- **Home** - Halaman utama dengan hero section dan overview
- **About** - Profil dan informasi pribadi
- **Skills** - Daftar keahlian dan kompetensi
- **Experience** - Riwayat pengalaman kerja
- **Education** - Riwayat pendidikan
- **Certification** - Sertifikat dan penghargaan
- **Contact** - Form kontak dan informasi kontak

### 🔐 Admin Panel
- **Dashboard** - Overview dan statistik
- **Profile Management** - Kelola informasi profil
- **Skills Management** - CRUD untuk keahlian
- **Experience Management** - CRUD untuk pengalaman kerja
- **Education Management** - CRUD untuk riwayat pendidikan
- **Certification Management** - CRUD untuk sertifikat
- **Contact Messages** - Lihat dan kelola pesan kontak
- **Site Settings** - Pengaturan website

## 🗄️ Database Schema

Database menggunakan Prisma ORM dengan schema yang mencakup:
- **User** - Data admin/user
- **Profile** - Informasi profil
- **Skill** - Keahlian
- **Experience** - Pengalaman kerja
- **Education** - Riwayat pendidikan
- **Certification** - Sertifikat
- **Contact** - Pesan kontak
- **SiteSettings** - Pengaturan website

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server

# Build
npm run build           # Build for production
npm start               # Start production server

# Database
npm run db:push         # Push schema to database
npm run db:generate     # Generate Prisma client
npm run db:migrate      # Run migrations
npm run db:reset        # Reset database

# Code Quality
npm run lint            # Run ESLint
```

## 🚀 Deployment

Website ini siap untuk di-deploy ke berbagai platform:
- **Vercel** - Recommended untuk Next.js
- **Netlify** - Alternative deployment platform
- **Railway/Render** - Untuk backend dengan database

## 📝 Environment Variables

Buat file `.env` dengan variabel berikut:

```env
DATABASE_URL="your-database-url"
JWT_SECRET="your-jwt-secret"
NEXT_PUBLIC_API_URL="your-api-url"
```

---

Dibuat dengan ❤️ oleh Ade Widodo
