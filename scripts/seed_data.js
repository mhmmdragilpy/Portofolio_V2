
import 'dotenv/config'; // Requires "type": "module" in package.json or using .mjs extension. 
// Since project package.json has "type": "module", we can use imports.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in .env file");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const projects = [
    {
        Title: "AcademySpace",
        Description: "Platform pencarian tempat kursus dan bimbingan belajar yang memudahkan siswa menemukan tempat belajar terbaik.",
        Link: "https://github.com/mhmmdragilpy/AcademySpace",
        Img: "https://placehold.co/600x400/6366f1/ffffff?text=AcademySpace"
    },
    {
        Title: "Facility Reservation",
        Description: "Sistem reservasi fasilitas kampus berbasis web untuk pengelolaan peminjaman ruangan dan peralatan yang efisien.",
        Link: "https://github.com/mhmmdragilpy/facility-reservation",
        Img: "https://placehold.co/600x400/a855f7/ffffff?text=Facility+Reservation"
    },
    {
        Title: "File Integrity Monitor",
        Description: "Aplikasi keamanan siber untuk memantau integritas file dan mendeteksi perubahan yang tidak sah secara real-time.",
        Link: "https://github.com/mhmmdragilpy/File-Integrity-Monitor",
        Img: "https://placehold.co/600x400/ec4899/ffffff?text=FIM"
    },
    {
        Title: "ML URL Classifier",
        Description: "Klasifikasi URL berbahaya menggunakan Machine Learning untuk mendeteksi website phishing dan malware.",
        Link: "https://github.com/mhmmdragilpy/ML-URL-Classifier",
        Img: "https://placehold.co/600x400/14b8a6/ffffff?text=ML+URL+Classifier"
    },
    {
        Title: "Password Manager",
        Description: "Aplikasi pengelola kata sandi yang aman dengan enkripsi untuk menyimpan dan mengelola kredensial pengguna.",
        Link: "https://github.com/mhmmdragilpy/Password-Manager",
        Img: "https://placehold.co/600x400/eab308/ffffff?text=Password+Manager"
    },
    {
        Title: "Cloud Computing Task 15",
        Description: "Implementasi tugas Cloud Computing (Awan Mendung) yang melibatkan deployment dan manajemen infrastruktur cloud.",
        Link: "https://github.com/mhmmdragilpy/Cloud-Computing-Task-15",
        Img: "https://placehold.co/600x400/f97316/ffffff?text=Cloud+Task"
    }
];

const certificates = [
    { Img: "/Certificates/Sertifikat Alibaba CLoud.jpg" },
    { Img: "/Certificates/Sertifikat BNSP TKJ.jpg" },
    { Img: "/Certificates/Sertifikat MTCNA.jpg" },
    { Img: "/Certificates/Sertifikat P2KPTK2 TKJ.jpg" },
    { Img: "/Certificates/Sertifikat PKL Hipernet Indodata.jpg" },
    { Img: "/Certificates/Sertifikat FINALIS CTF Adikara 2024.jpg" }
];

async function seed() {
    console.log("Starting seeding process...");

    // 1. Clear existing data (Optional: remove this if you want to append/keep existing)
    // Deleting without where clause might need "Delete all rows" policy enabled or specific RLS.
    // We'll assume we can just insert. If you want to clean, uncomment below but be careful.

    const { error: delProjErr } = await supabase.from('projects').delete().neq('id', 0); // Hack to delete all if ID != 0
    if (delProjErr) console.log("Warning clearing projects:", delProjErr.message);
    else console.log("Cleared existing projects.");

    const { error: delCertErr } = await supabase.from('certificates').delete().neq('id', 0);
    if (delCertErr) console.log("Warning clearing certificates:", delCertErr.message);
    else console.log("Cleared existing certificates.");


    // 2. Insert Projects
    const { data: projData, error: projError } = await supabase
        .from('projects')
        .insert(projects)
        .select();

    if (projError) {
        console.error("Error inserting projects:", projError);
    } else {
        console.log(`Successfully inserted ${projData.length} projects.`);
    }

    // 3. Insert Certificates
    const { data: certData, error: certError } = await supabase
        .from('certificates')
        .insert(certificates)
        .select();

    if (certError) {
        console.error("Error inserting certificates:", certError);
    } else {
        console.log(`Successfully inserted ${certData.length} certificates.`);
    }

    console.log("Seeding completed.");
}

seed();
