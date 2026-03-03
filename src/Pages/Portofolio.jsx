import React, { useEffect, useState, useCallback } from "react";

import { supabase } from "../supabase";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";


const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);


function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// Tech Stack - Updated with all unique technologies from project JSON files
const techStacks = [
  // Core Languages & Markup
  { icon: "html.svg", language: "HTML5" },
  { icon: "css.svg", language: "CSS3" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", language: "TypeScript" },
  { icon: "https://img.icons8.com/?size=100&id=13441&format=png&color=000000", language: "Python" },

  // Frontend Frameworks & UI
  { icon: "reactjs.svg", language: "React" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", language: "Next.js" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4", language: "Shadcn UI" },

  // Backend & Databases
  { icon: "nodejs.svg", language: "Node.js" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", language: "Express.js" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", language: "PostgreSQL" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", language: "Supabase" },

  // Cloud & DevOps 
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", language: "Azure" },
  { icon: "/Tech Stack Icon/coolify.webp", language: "Coolify" },

  // Networking Infrastructure
  { icon: "/Tech Stack Icon/cisco.webp", language: "CCNA" },
  { icon: "/Tech Stack Icon/mikrotik-light.webp", language: "Mikrotik" },
];

// Hardcoded project data from JSON files - synced with Data Project folder
const localProjectsData = [
  {
    id: "academyspace",
    Title: "Academy Space",
    Description: "Platform manajemen reservasi fasilitas kampus yang modern dan terintegrasi, memungkinkan peminjaman ruangan secara transparan dengan fitur pengecekan ketersediaan real-time.",
    Img: "/Data Project/Screenshot Live Demo/AcademySpace.jpg",
    Link: "https://academy-space.vercel.app/",
    Github: "https://github.com/mhmmdragilpy/AcademySpace",
    TechStack: ["Next.js 16", "React 19", "TypeScript", "TailwindCSS 4", "PostgreSQL", "Express.js", "TanStack Query", "Zustand", "Redis", "NextAuth.js"],
    Features: [
      "Smart Availability Check (Real-time Conflict Detection)",
      "Secure Authentication (JWT & NextAuth)",
      "Interactive Booking Calendar",
      "Comprehensive Admin Dashboard",
      "Automated Reservation Approval Flow",
      "Facility Rating & Feedback System"
    ]
  },
  {
    id: "portofolio-v2",
    Title: "Portofolio V2",
    Description: "Website portofolio pribadi V2 yang dirancang modern dan interaktif untuk menampilkan proyek, keahlian, dan perjalanan karier, dilengkapi sistem komentar real-time.",
    Img: "/Data Project/Screenshot Live Demo/Portofolio_V2.jpg",
    Link: "https://mangdosan.vercel.app/",
    Github: "https://github.com/mhmmdragilpy/Portofolio_V2",
    TechStack: ["React 18", "Vite", "Tailwind CSS", "Framer Motion", "Supabase", "Firebase", "GSAP", "SweetAlert2", "Material UI", "Shadcn UI"],
    Features: [
      "Interactive Welcome Screen",
      "Real-time Comment System (Supabase)",
      "Comprehensive Project Gallery",
      "Animated Certificates Showcase",
      "Responsive Glassmorphism Design",
      "Scroll Animations (AOS)",
      "Integrated Contact Form",
      "Dynamic Tech Stack Visuals"
    ]
  },
  {
    id: "afm-companyprofile",
    Title: "AFM Company Profile",
    Description: "Website profil perusahaan profesional untuk PT Anugrah Firdaus Mandiri yang dirancang untuk menampilkan layanan logistik, galeri proyek, dan kredibilitas bisnis dengan antarmuka modern dan responsif.",
    Img: "/Data Project/Screenshot Live Demo/AFM-companyprofile.jpg",
    Link: "https://anugrahfirdausmandiri.vercel.app/",
    Github: "https://github.com/mhmmdragilpy/AFM-companyprofile",
    TechStack: ["HTML5", "CSS3 (Custom Properties)", "Vanilla JavaScript", "Font Awesome 6", "Google Fonts (Outfit & Inter)", "Vercel Deployment"],
    Features: [
      "Responsive Navigation dengan efek Glassmorphism dan Sticky Header",
      "Galeri Proyek Interaktif dengan fitur Image Lightbox",
      "Animasi Smooth Scroll Reveal menggunakan Intersection Observer API",
      "Real-time Animated Statistics Counter untuk data pengalaman klien",
      "Integrasi Floating WhatsApp Button untuk komunikasi langsung"
    ]
  },
  {
    id: "todo-app",
    Title: "Todo App",
    Description: "Aplikasi manajemen tugas modern yang responsif dan estetik, dirancang untuk meningkatkan produktivitas dengan fitur pelacakan progres real-time dan penyimpanan data lokal yang persisten.",
    Img: "/Data Project/Screenshot Live Demo/todo-app.jpg",
    Link: "https://todo-app-lovat-sigma.vercel.app/",
    Github: "https://github.com/mhmmdragilpy/todo-app",
    TechStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Lucide React", "Worker Threads", "Local Storage API"],
    Features: [
      "Manajemen Tugas Full CRUD (Create, Read, Update, Delete)",
      "Persistensi Data Lokal (Local Storage)",
      "Sistem Filtering Tugas (Active/Completed)",
      "Visualisasi Progres Real-time",
      "Arsitektur Concurrency Worker Pool",
      "Desain Responsif dengan Efek Glassmorphism"
    ]
  },
  {
    id: "whome",
    Title: "Whome",
    Description: "Platform manajemen ISP modern yang memfasilitasi pendaftaran pelanggan baru dan pemantauan status instalasi melalui dashboard admin yang intuitif.",
    Img: "/Data Project/Screenshot Live Demo/whome.jpg",
    Link: "https://whome-provider.vercel.app",
    Github: "https://github.com/mhmmdragilpy/whome.git",
    TechStack: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Supabase", "Zustand", "React 19"],
    Features: [
      "Sistem Pendaftaran Pelanggan (Leads) Real-time",
      "Dashboard Admin Interaktif untuk Manajemen Instalasi",
      "Pelacakan Lokasi & Validasi Input Otomatis",
      "Manajemen Paket Layanan Internet Dinamis",
      "State Management Global yang Teroptimasi"
    ]
  },
  {
    id: "smart-trucking",
    Title: "Smart Trucking Invoice System",
    Description: "Platform manajemen invoice logistik modern untuk mendigitalkan alur kerja penagihan, kalkulasi biaya otomatis, hingga pembuatan dokumen PDF profesional.",
    Img: "/Data Project/Screenshot Live Demo/smart-trucking-invoice-system.jpg",
    Link: "https://smart-trucking-invoice-system-tml.vercel.app",
    Github: "https://github.com/mhmmdragilpy/Smart-Trucking-Invoice-System.git",
    TechStack: ["Next.js 16.1", "React 19", "Supabase", "Drizzle ORM", "Tailwind CSS 4", "TypeScript"],
    Features: [
      "Manajemen Invoice (16+ Tipe)",
      "Kalkulasi Cerdas & Otomatis",
      "PDF Generator",
      "Dashboard & Rekapitulasi",
      "Autentikasi & Keamanan"
    ]
  },
  {
    id: "p8net",
    Title: "P8 NET - Modern ISP Management",
    Description: "Platform manajemen layanan penyedia internet (ISP) modern dan responsif untuk memudahkan pengelolaan paket layanan dan pemantauan status instalasi.",
    Img: "/Data Project/Screenshot Live Demo/p8net-provider.jpg",
    Link: "https://p8net-provider.vercel.app/",
    Github: "https://github.com/mhmmdragilpy/p8net-provider.git",
    TechStack: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Zustand", "Supabase", "Lucide React"],
    Features: [
      "Sistem Pendaftaran (Leads)",
      "Admin Dashboard Interaktif",
      "Manajemen Paket Internet",
      "Statistik Ringkas Performa",
      "Notifikasi Terintegrasi WhatsApp"
    ]
  },
  {
    id: "madun-net",
    Title: "MADUN NET - ISP Landing Page",
    Description: "Website landing page modern untuk penyedia layanan internet (ISP) yang informatif dan premium, terintegrasi langsung dengan WhatsApp Admin.",
    Img: "/Data Project/Screenshot Live Demo/madun-net-provider.jpg",
    Link: "https://madun-net-provider.vercel.app",
    Github: "https://github.com/mhmmdragilpy/madun-net-provider.git",
    TechStack: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Zustand"],
    Features: [
      "Landing Page Modern & Responsive",
      "Formulir Pendaftaran via WhatsApp",
      "Daftar Paket Internet Lengkap",
      "Static Export Support",
      "Validasi Input Pengguna"
    ]
  },
  {
    id: "whome-v2",
    Title: "Whome Management System v2",
    Description: "ISP management dashboard built for handling billing, tracking customers, and seamless WhatsApp-based notifications dengan backend serverless.",
    Img: "/Data Project/Screenshot Live Demo/whome-management-system.jpg",
    Link: "https://whome-management-system.vercel.app",
    Github: "https://github.com/mhmmdragilpy/whome-management-system.git",
    TechStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Shadcn UI", "Google Sheets API", "Apps Script"],
    Features: [
      "Dashboard Overview Statistik",
      "Customer Management Lengkap",
      "Automated Billing Workflow",
      "WhatsApp Integration (No PDF needed)",
      "GAS REST API Security Check"
    ]
  }
];

// Hardcoded Certificates Data
const hardSkillCertificates = [
  { id: "h1", Img: "/Certificates/Sertifikat HardSkill/Sertifikat Alibaba CLoud.jpg" },
  { id: "h2", Img: "/Certificates/Sertifikat HardSkill/Sertifikat FINALIS CTF Adikara 2024.jpg" },
  { id: "h3", Img: "/Certificates/Sertifikat HardSkill/idcamp-x-dicoding-live-5-ai-web-dev-build-real-apps-with-lovable-antigravity-certificate_page-0001.jpg" },
  { id: "h4", Img: "/Certificates/Sertifikat HardSkill/devcoach-226-n8n-cara-mudah-install-n8n-di-aws-cloud-via-easypanel-gratis-1-tahun-certificate_page-0001.jpg" },
  { id: "h5", Img: "/Certificates/Sertifikat HardSkill/devcoach-227-spotlight-unlock-potensi-cuan-lewat-pengembangan-product-certificate_page-0001.jpg" },
  { id: "h6", Img: "/Certificates/Sertifikat HardSkill/Sertifikat CySec_page-0001.jpg" },
  { id: "h7", Img: "/Certificates/Sertifikat HardSkill/Sertifikat MTCNA.jpg" },
  { id: "h8", Img: "/Certificates/Sertifikat HardSkill/Sertifikat BNSP TKJ.jpg" },
  { id: "h9", Img: "/Certificates/Sertifikat HardSkill/Sertifikat P2KPTK2 TKJ.jpg" },
  { id: "h10", Img: "/Certificates/Sertifikat HardSkill/Sertifikat Trainning CCNA.jpg" },
  { id: "h11", Img: "/Certificates/Sertifikat HardSkill/Sertifikat PKL Hipernet Indodata.jpg" },
  { id: "h12", Img: "/Certificates/Sertifikat HardSkill/Sertifikat Partisipan LKS SMK TKJ.jpg" }
];

const softSkillCertificates = [
  { id: "s1", Img: "/Certificates/Sertifikat SoftSkill/SERTIFIKAT_TEL-U_CAREER_COACH_-_ENTREPRENEURSHIP_page-0001.jpg" },
  { id: "s2", Img: "/Certificates/Sertifikat SoftSkill/Sertifikat_Anti_Korupsi.jpg" },
  { id: "s3", Img: "/Certificates/Sertifikat SoftSkill/Sertifikat_Anti_Napza.jpg" },
  { id: "s4", Img: "/Certificates/Sertifikat SoftSkill/Sertifikat_Anti_Radikalisme.jpg" },
  { id: "s5", Img: "/Certificates/Sertifikat SoftSkill/Sertifikat_Green_Campus.jpg" },
  { id: "s6", Img: "/Certificates/Sertifikat SoftSkill/Sertifikat_Leadership.jpg" },
  { id: "s7", Img: "/Certificates/Sertifikat SoftSkill/Sertifikat_MBTI.jpg" },
  { id: "s8", Img: "/Certificates/Sertifikat SoftSkill/Sertifikat_Relationship_Management.jpg" },
  { id: "s9", Img: "/Certificates/Sertifikat SoftSkill/Sertifikat_Self_Management_page-0001.jpg" },
  { id: "s10", Img: "/Certificates/Sertifikat SoftSkill/Sertifikat_Technopreneurship_page-0001.jpg" },
  { id: "s11", Img: "/Certificates/Sertifikat SoftSkill/2493bac0-ad44-41e2-a241-9c20c99c9f7a-0.jpg" },
  { id: "s12", Img: "/Certificates/Sertifikat SoftSkill/8b156bd4-ddae-4d7a-8be2-33433b2db074-0.jpg" },
];


export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllHardSkills, setShowAllHardSkills] = useState(false);
  const [showAllSoftSkills, setShowAllSoftSkills] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);


  const fetchData = useCallback(async () => {
    try {
      setProjects(localProjectsData);
      localStorage.setItem("projects", JSON.stringify(localProjectsData));

      // Use local static certificates instead of Supabase
      // Assuming user wants them separated but previously was a single array, 
      // here we merge them for the main certificates tab but we will split them in UI rendering later.
      // Wait, let's keep them combined in 'certificates' state for backward compatibility with total count in About.jsx
      const allCertificates = [...hardSkillCertificates, ...softSkillCertificates];
      setCertificates(allCertificates);
      localStorage.setItem("certificates", JSON.stringify(allCertificates));
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }, []);



  useEffect(() => {
    // Initialize projects immediately from localProjectsData
    setProjects(localProjectsData);

    // Try to load cached certificates for faster initial load
    const cachedCertificates = localStorage.getItem('certificates');
    if (cachedCertificates) {
      setCertificates(JSON.parse(cachedCertificates));
    }

    fetchData(); // Fetch latest certificates 
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else if (type === 'hardSkills') {
      setShowAllHardSkills(prev => !prev);
    } else if (type === 'softSkills') {
      setShowAllSoftSkills(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);

  // Create separated displays for rendering
  const displayedHardSkills = hardSkillCertificates;
  const displayedSoftSkills = softSkillCertificates;

  // Sisa dari komponen (return statement) tidak ada perubahan
  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise.
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            {/* Hard Skills Section */}
            <div className="container mx-auto pb-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2" data-aos="fade-right">
                <span className="w-8 h-[2px] bg-indigo-500"></span>
                Hard Skills
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedHardSkills.map((certificate, index) => (
                  <div
                    key={certificate.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate ImgSertif={certificate.Img} />
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills Section */}
            <div className="container mx-auto mt-10">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2" data-aos="fade-right">
                <span className="w-8 h-[2px] bg-purple-500"></span>
                Soft Skills
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedSoftSkills.map((certificate, index) => (
                  <div
                    key={certificate.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate ImgSertif={certificate.Img} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}