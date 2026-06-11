# 🎨 Radhika Bhoyar — Portfolio

A cutting-edge, dark-mode portfolio showcasing **AI & Data Science engineering** with bold GenZ energy, sophisticated design, and a subtle camera aesthetic. Built with vanilla HTML/CSS/JS, powered by GSAP animations and smooth Lenis scrolling.

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Design System](#design-system)
- [Animation Architecture](#animation-architecture)
- [Responsive Design](#responsive-design)
- [Deployment](#deployment)
- [Contact](#contact)

## 🎯 Project Overview

This portfolio is a carefully crafted digital experience that demonstrates Radhika Bhoyar's expertise in AI, Data Science, and full-stack development. The design reflects a personality that is **strong, confident, smart, determined, funny, mature, and GenZ** — with subtle camera/photography elements woven throughout.

### Key Highlights
- **Dark-mode design** with neon accent palette (purple, cyan, pink, teal)
- Award-worthy animations inspired by Awwwards-winning sites
- GSAP-powered scroll-triggered animations and page transitions
- Mobile-first responsive design with breakpoints at 1000px
- Subtle camera viewfinder aesthetic on hero images
- Performance-optimized with Vite build system

## ✨ Features

### Core Features
- **Smooth Page Transitions**: Multi-layer overlay reveal with GSAP
- **Scroll-Triggered Animations**: Dynamic hero image scaling, featured work horizontal scroll, stacked service cards
- **Responsive Design**: Optimized for mobile (≤1000px) and desktop
- **Interactive Navigation**: Animated slide-in menu with staggered item reveals
- **Contact Form**: Professional form with validation, focus animations, and success states
- **Project Showcase**: Interactive portfolio gallery featuring JalRakshak, FamWallet, Ayantra, and Aap Ki Awaz
- **Camera Aesthetic**: Viewfinder corner brackets on hero image, "Focus Mode: ON 📷" tagline

### Technical Features
- **GSAP + ScrollTrigger**: Professional animation library for scroll-linked effects
- **Lenis Smooth Scroll**: Butter-smooth scrolling experience
- **Custom Typography**: Three typefaces — Rader (headings), Formula Narrow (body), Supply Mono (UI)
- **CSS Custom Properties**: Full design system with color tokens
- **Vite**: Lightning-fast HMR development and optimized production builds

## 🛠 Technologies Used

| Category | Technologies |
|---|---|
| **Core** | HTML5, CSS3, JavaScript ES6+ |
| **Build** | Vite |
| **Animation** | GSAP, ScrollTrigger |
| **Scrolling** | Lenis |
| **Fonts** | PP Rader, PP Formula, PP Supply Mono |
| **Deployment** | Vercel |

## 📁 Project Structure
```
web-development-portfolio/
├── css/
│   ├── fonts.css           # @font-face declarations (3 typefaces)
│   ├── globals.css          # CSS custom properties, resets, global styles
│   ├── transition.css       # Page transition overlay styles
│   ├── menu.css             # Navigation & menu overlay
│   ├── home.css             # Hero, featured work, services, CTA
│   ├── about.css            # About hero, bio, stats
│   ├── contact.css          # Contact form & floating elements
│   ├── work.css             # Work/portfolio grid
│   └── footer.css           # Footer layout & explosion effect
├── js/
│   ├── hero.js              # Hero image cycling & scroll animation
│   ├── featured-work.js     # Horizontal scroll gallery with 3D cards
│   ├── services.js          # Stacked service card pinning
│   ├── about.js             # Portrait parallax & tag animations
│   ├── menu.js              # Menu open/close with GSAP
│   ├── footer.js            # Particle explosion on scroll
│   ├── contact.js           # Mouse trail, floating elements, form handling
│   ├── transition.js        # Page transition controller
│   └── lenis-scroll.js      # Smooth scroll initialization
├── public/
│   ├── fonts/               # Custom font files
│   └── images/
│       ├── global/          # Site icons, symbols
│       ├── hero/            # Hero background images
│       ├── services/        # Service card images
│       ├── services-header/ # Portrait photo
│       └── work-items/      # Project showcase images
├── index.html               # Main homepage
├── contact.html             # Contact page
├── package.json             # Dependencies (gsap, lenis, vite)
├── vite.config.js           # Multi-page Vite config
├── vercel.json              # Vercel deployment config
└── README.md                # This file
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm

### Local Development
```bash
# Clone the repository
git clone https://github.com/radhika0910/portfolio.git

# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Start dev server accessible via network
npm run host
```

## 🎨 Design System

### Color Palette (Dark Mode)
```css
:root {
  --bg: #0a0a0a;       /* Deep dark — strong, mature */
  --bg2: #151515;       /* Slightly lighter dark */
  --fg: #f0ece2;        /* Warm off-white — sophisticated */
  --accent1: #c084fc;   /* Soft purple — GenZ, creative */
  --accent2: #38bdf8;   /* Electric cyan — smart, tech */
  --accent3: #f472b6;   /* Pink — confident, bold */
  --accent4: #22d3ee;   /* Teal — determined, calm */
}
```

### Typography
| Typeface | Usage | Style |
|---|---|---|
| **PP Rader** | Headings (h1-h3) | Uppercase, italic, tight line-height (0.95) |
| **PP Formula Narrow** | Body text | Semi-bold, 1.25rem, condensed |
| **PP Supply Mono** | UI labels, meta text | Uppercase, monospace, 0.875rem |

### Personality-Driven Design Decisions
| Trait | Design Expression |
|---|---|
| Strong & Confident | Bold dark base, high-contrast neon accents |
| Smart & Determined | Clean grid layouts, technical monospace elements |
| Funny & GenZ | Playful micro-copy ("Focus Mode: ON 📷"), vibrant pops |
| Mature | Sophisticated dark mode, muted secondary tones |
| Camera Lover | Viewfinder corners on hero image, camera emoji accents |

## 🎭 Animation Architecture

### Page Transitions (`transition.js`)
5-layer overlay reveal with staggered timing using accent colors.

### Hero Section (`hero.js`)
- Image cycling every 250ms through 10 work items
- Scroll-driven transform: scale (0.25→1), rotation (-15°→0°), translateY

### Featured Work (`featured-work.js`)
- Horizontal scroll across 4× viewport width
- 10 floating 3D image cards with staggered z-position animation
- Progress indicator dots

### Services (`services.js`)
- Stacked card pinning during scroll
- Vertical movement based on card index
- Disabled on mobile for performance

### Footer (`footer.js`)
- Particle explosion with physics simulation (gravity, friction, rotation)
- Triggered when footer enters viewport

## 📱 Responsive Design

| Breakpoint | Strategy |
|---|---|
| **≤ 1000px** (Mobile) | Simplified animations, single-column, stacked layouts, touch-friendly |
| **> 1000px** (Desktop) | Full animation suite, multi-column, hover effects, 3D transforms |

## 🚀 Deployment

Deployed on **Vercel** with automatic GitHub integration.

### Deploy Steps
1. Connect GitHub repository to Vercel
2. Auto-deploy on push to main branch
3. Custom domain + SSL configured automatically

## 📞 Contact

**Radhika Bhoyar** — AI & Data Science Engineer

- 📧 Email: [radhika.bhoyar09@gmail.com](mailto:radhika.bhoyar09@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/radhika-bhoyar](https://linkedin.com/in/radhika-bhoyar)
- 🐙 GitHub: [github.com/radhika0910](https://github.com/radhika0910)
- 📍 Nagpur, India

### Professional Services
- AI & Machine Learning Solutions
- Data Engineering & Analytics
- Full-Stack Web Development
- Cloud & DevOps Solutions
- Consultation

---

Built with ❤️ and a lot of ☕ by Radhika Bhoyar