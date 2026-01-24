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

  // Frontend Frameworks & Libraries
  { icon: "reactjs.svg", language: "React" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", language: "Next.js" },
  { icon: "vite.svg", language: "Vite" },

  // Styling & UI
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4", language: "Shadcn UI" },

  // Animation Libraries
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg", language: "Framer Motion" },
  { icon: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg", language: "GSAP" },

  // Backend & Runtime
  { icon: "nodejs.svg", language: "Node.js" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", language: "Express.js" },

  // Databases
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", language: "PostgreSQL" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", language: "Redis" },

  // BaaS & Cloud
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", language: "Supabase" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "vercel.svg", language: "Vercel" },

  // State Management
  { icon: "/Tech Stack Icon/Zustand.webp", language: "Zustand" },

  // Auth
  { icon: "https://next-auth.js.org/img/logo/logo-sm.png", language: "NextAuth.js" },

  // Tools & Libraries
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
  { icon: "https://lucide.dev/logo.light.svg", language: "Lucide React" },

  // Networking (Certified)
  { icon: "/Tech Stack Icon/cisco.webp", language: "CCNA" },
  { icon: "/Tech Stack Icon/mikrotik-light.webp", language: "Mikrotik" },

  // DevOps & Cloud Infrastructure
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-original.svg", language: "Ubuntu" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", language: "Azure" },
  { icon: "/Tech Stack Icon/cloudflare.webp", language: "Cloudflare" },
  { icon: "/Tech Stack Icon/coolify.webp", language: "Coolify" },

  // Additional Languages (for showcase)
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", language: "Java" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", language: "C++" },
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
    Link: "https://mangdosan-portofolio.vercel.app/",
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
    Link: "https://afm-companyprofile.vercel.app/",
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
  }
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);


  const fetchData = useCallback(async () => {
    try {
      // Use localProjectsData as primary source for projects (synced with Data Project folder)
      // This ensures projects are always in sync with JSON files in the folder
      setProjects(localProjectsData);
      localStorage.setItem("projects", JSON.stringify(localProjectsData));

      // Fetch certificates from Supabase
      const certificatesResponse = await supabase
        .from("certificates")
        .select("*")
        .order('id', { ascending: true });

      if (certificatesResponse.error) throw certificatesResponse.error;

      const certificateData = certificatesResponse.data || [];
      setCertificates(certificateData);
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
      // Fallback: use cached certificates if available
      const cachedCertificates = localStorage.getItem('certificates');
      if (cachedCertificates) {
        setCertificates(JSON.parse(cachedCertificates));
      }
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

    fetchData(); // Fetch latest certificates from Supabase
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

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
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
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
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
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