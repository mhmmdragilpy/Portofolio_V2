# MADUN NET - Website Landing Page ISP

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)
![License](https://img.shields.io/badge/license-MIT-blue)

**MADUN NET** adalah website landing page modern untuk penyedia layanan internet (ISP). Website ini sepenuhnya static dan dapat di-deploy sebagai front-end only website tanpa memerlukan database atau backend.

---

## 🚀 Tech Stack

| Category | Technology | Description |
|----------|------------|-------------|
| **Frontend** | [Next.js 16 (App Router)](https://nextjs.org/) | Framework React modern untuk static generation. |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Superset JavaScript dengan static typing. |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS framework. |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) | Manajemen state ringan. |

---

## ✨ Fitur Utama

- **Landing Page Modern**: Halaman depan informatif dengan desain premium menampilkan paket layanan dan keunggulan provider.
- **Formulir Pendaftaran**: Form pendaftaran calon pelanggan yang terintegrasi langsung ke WhatsApp admin.
  - Validasi input pengguna
  - Redirect otomatis ke WhatsApp dengan pesan terformat
- **Paket Internet**: Menampilkan 4 paket internet (10/20/30/50 Mbps) dengan harga dan fitur lengkap.
- **Responsive Design**: Tampilan optimal di berbagai perangkat (Desktop, Tablet, Mobile).
- **Static Export**: Dapat di-deploy ke platform hosting statis seperti Vercel, Netlify, GitHub Pages, dll.

---

## 🛠️ Prerequisites

- **Node.js**: Versi 18.x atau lebih baru.
- **npm**: Biasanya sudah terinstall bersama Node.js.
- **Git**: Untuk cloning repository.

---

## 📦 Installation & Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/mhmmdragilpy/madun-net-providet.git
cd madun-net-providet
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Buat file `.env` atau `.env.local` di root directory:

```bash
# WhatsApp Admin - MADUN NET
NEXT_PUBLIC_WHATSAPP_ADMIN=6287823030960
```

Ganti nomor di atas dengan nomor WhatsApp admin yang akan menerima pendaftaran.

### 4. Menjalankan Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### 5. Build untuk Production
```bash
npm run build
```

---

## 🌐 Deploy

Website ini dapat di-deploy ke berbagai platform hosting:

### Vercel (Recommended)
1. Push repository ke GitHub
2. Connect ke Vercel
3. Deploy otomatis

### Static Export
Tambahkan di `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
};
```

Kemudian jalankan `npm run build` dan upload folder `out` ke hosting statis Anda.

---

## 📁 Struktur Proyek

```
madun-net/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── daftar/     # Halaman pendaftaran
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx    # Landing page
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/         # Komponen UI
│   ├── lib/               # Utility functions
│   └── stores/            # State management
├── public/                # Static assets
└── package.json
```

---

## 🤝 Contributing

Kontribusi sangat diterima! 

1. Fork repository ini.
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`).
3. Commit perubahan Anda (`git commit -m 'Add some AmazingFeature'`).
4. Push ke branch tersebut (`git push origin feature/AmazingFeature`).
5. Buat Pull Request.

---

## 📄 License

Project ini didistribusikan di bawah lisensi MIT.

---

## 👤 Author

Developed with ❤️ by **Mang Do-san**
