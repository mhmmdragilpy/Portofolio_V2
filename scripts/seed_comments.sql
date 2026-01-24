-- SQL Script to Seed Dummy Comments
-- Run this in Supabase SQL Editor

-- 1. Clear existing comments (Hapus komentar lama)
TRUNCATE TABLE portfolio_comments RESTART IDENTITY;

-- 2. Insert Pinned Comment (Admin)
INSERT INTO portfolio_comments (user_name, content, is_pinned, created_at, profile_image) VALUES
('Mang Do-san', 'Thanks for visiting! Contact me if you need anything', true, NOW(), NULL);

-- 3. Insert Regular Comments
INSERT INTO portfolio_comments (user_name, content, is_pinned, created_at, profile_image) VALUES
('Alpin', 'Wah keren banget bang portofolionya! Desainnya modern dan eye-catching.', false, NOW() - INTERVAL '1 day', NULL),
('Raihan', 'Suka banget sama animasinya, smooth parah! 🔥', false, NOW() - INTERVAL '2 days', NULL),
('Patih', 'Project-projectnya inspiratif bro, semangat terus berkarya!', false, NOW() - INTERVAL '3 hours', NULL),
('George', 'UI/UX nya juara sih ini, simpel tapi elegan. Good Job!', false, NOW() - INTERVAL '5 hours', NULL),
('Dio', 'Frontend skills nya mantap, lanjutken!', false, NOW() - INTERVAL '1 day', NULL),
('Fahmi', 'Portofolio yang sangat profesional. Sukses selalu bro!', false, NOW() - INTERVAL '4 days', NULL),
('Hasan', 'Website nya ringan dan cepat diakses, optimasinya oke banget.', false, NOW() - INTERVAL '6 hours', NULL),
('Aldi', 'Gokil, tech stack nya update banget. Panutan!', false, NOW() - INTERVAL '2 days', NULL),
('Rangga', 'Keren bang, semoga bisa kolaborasi suatu saat nanti.', false, NOW() - INTERVAL '1 week', NULL),
('Fathur', 'Sangat rapi codingannya dan strukturnya jelas. Mantap!', false, NOW() - INTERVAL '3 days', NULL);

-- Verify insertion
SELECT * FROM portfolio_comments ORDER BY created_at DESC;
