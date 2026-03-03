# P8 NET - Modern ISP Management Platform

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)
![License](https://img.shields.io/badge/license-MIT-blue)

**P8 NET** adalah platform manajemen layanan penyedia internet (ISP) yang modern dan responsif. Aplikasi ini dirancang untuk memudahkan pengelolaan paket layanan, pendaftaran calon pelanggan (Leads), dan pemantauan status instalasi melalui dashboard admin yang interaktif.

---

## 🚀 Tech Stack

Project ini dibangun menggunakan teknologi terkini untuk memastikan performa yang cepat dan maintainability yang baik.

| Category | Technology | Description |
|----------|------------|-------------|
| **Frontend** | [Next.js 16 (App Router)](https://nextjs.org/) | Framework React modern untuk server-side rendering dan static generation. |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Superset JavaScript dengan static typing untuk keamanan kode. |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS framework untuk desain cepat dan fleksibel. |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) | Manajemen state global yang ringan dan scalable. |
| **Backend / DB** | [Supabase](https://supabase.com/) | Backend-as-a-Service (BaaS) untuk database PostgreSQL dan realtime subscriptions. |
| **Icons** | [Lucide React](https://lucide.dev/) | Koleksi icon yang bersih dan konsisten. |

---

## ✨ Fitur Utama

Berikut adalah fitur-fitur unggulan yang telah diimplementasikan dalam **P8 NET**:

- **Landing Page Modern**: Halaman depan yang informatif dengan tema hitam-hijau premium.
- **Sistem Pendaftaran (Leads)**: Formulir pendaftaran calon pelanggan yang terintegrasi langsung dengan database.
  - Validasi input pengguna.
  - Integrasi WhatsApp untuk notifikasi.
- **Admin Dashboard**: Pusat kontrol untuk administrator.
  - **Manajemen Leads**: Melihat, memfilter, dan memperbarui status calon pelanggan (New Lead, Surveying, Installed).
  - **Statistik Ringkas**: Overview cepat mengenai performa penjualan.
- **Manajemen Paket Internet**: Struktur data yang fleksibel untuk berbagai jenis paket (Speed, Price, Features).
- **Responsive Design**: Tampilan yang optimal di berbagai perangkat (Desktop, Tablet, Mobile).

---

## 🛠️ Prerequisites

Sebelum memulai, pastikan Anda telah menginstal tools berikut di komputer Anda:

- **Node.js**: Versi 18.x atau lebih baru.
- **npm**: Biasanya sudah terinstall bersama Node.js.
- **Git**: Untuk cloning repository.

---

## 📦 Installation & Getting Started

Ikuti langkah-langkah berikut untuk menjalankan project ini di environment lokal Anda.

### 1. Clone Repository
```bash
git clone https://github.com/your-username/p8net.git
cd p8net
```

### 2. Install Dependencies
Install semua library yang dibutuhkan menggunakan npm:
```bash
npm install
```

### 3. Setup Environment Variables
Buat file `.env.local` di root directory project Anda:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_WHATSAPP_ADMIN=085117088518
```

### 4. Menjalankan Development Server
Jalankan server lokal dalam mode development:
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

---

## 📄 License

Project ini didistribusikan di bawah lisensi MIT.

---

## 👤 Author

Developed with 💚 by **Mang Do-san**
