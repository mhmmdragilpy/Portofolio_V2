-- SQL Script to Seed Data for Portofolio V2
-- Copy and paste this into your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- 1. Optional: Clear existing data (Be careful!)
TRUNCATE TABLE projects RESTART IDENTITY;
TRUNCATE TABLE certificates RESTART IDENTITY;

-- 2. Insert Projects
INSERT INTO projects ("Title", "Description", "Link", "Img") VALUES
(
  'Portofolio V2',
  'Personal website modern yang dibangun dengan React, Tailwind CSS, dan animasi interaktif (AOS, Lottie). Fitur komentar realtime dengan Supabase.',
  'https://github.com/mhmmdragilpy/Portofolio_V2',
  'https://placehold.co/600x400/6366f1/ffffff?text=Portofolio+V2'
),
(
  'Facility Reservation',
  'Sistem reservasi fasilitas kampus berbasis web untuk pengelolaan peminjaman ruangan dan peralatan yang efisien.',
  'https://github.com/mhmmdragilpy/facility-reservation',
  'https://placehold.co/600x400/a855f7/ffffff?text=Facility+Reservation'
),
(
  'File Integrity Monitor',
  'Aplikasi keamanan siber untuk memantau integritas file dan mendeteksi perubahan yang tidak sah secara real-time.',
  'https://github.com/mhmmdragilpy/File-Integrity-Monitor',
  'https://placehold.co/600x400/ec4899/ffffff?text=FIM'
),
(
  'ML URL Classifier',
  'Klasifikasi URL berbahaya menggunakan Machine Learning untuk mendeteksi website phishing dan malware.',
  'https://github.com/mhmmdragilpy/ML-URL-Classifier',
  'https://placehold.co/600x400/14b8a6/ffffff?text=ML+URL+Classifier'
),
(
  'Password Manager',
  'Aplikasi pengelola kata sandi yang aman dengan enkripsi untuk menyimpan dan mengelola kredensial pengguna.',
  'https://github.com/mhmmdragilpy/Password-Manager',
  'https://placehold.co/600x400/eab308/ffffff?text=Password+Manager'
),
(
  'Cloud Computing Task 15',
  'Implementasi tugas Cloud Computing (Awan Mendung) yang melibatkan deployment dan manajemen infrastruktur cloud.',
  'https://github.com/mhmmdragilpy/Cloud-Computing-Task-15',
  'https://placehold.co/600x400/f97316/ffffff?text=Cloud+Task'
);

-- 3. Insert Certificates
-- Ensure these image paths are accessbile in your public folder or deployed storage
INSERT INTO certificates ("Img") VALUES
('/Certificates/Sertifikat Alibaba CLoud.jpg'),
('/Certificates/Sertifikat BNSP TKJ.jpg'),
('/Certificates/Sertifikat MTCNA.jpg'),
('/Certificates/Sertifikat P2KPTK2 TKJ.jpg'),
('/Certificates/Sertifikat PKL Hipernet Indodata.jpg'),
('/Certificates/Sertifikat FINALIS CTF Adikara 2024.jpg');

-- Verifying
SELECT count(*) as total_projects FROM projects;
SELECT count(*) as total_certificates FROM certificates;
