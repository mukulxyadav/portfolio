# 🚀 Mukul Kumar | Premium Interactive Portfolio

A world-class developer portfolio featuring an interactive SVG avatar with mouse-tracking eyes, automated live coding statistics, an AI chatbot, and a premium glassmorphic UI.

## ✨ Core Features

- **Interactive SVG Avatar**: Custom-built avatar with mouse-tracking eyes, dynamic head movement, and realistic idle blink animations.
- **Automated Live Statistics**: Real-time data fetching from **LeetCode** (solved problems & global rank) and **GitHub** (public repositories).
- **AI Chatbot Assistant**: An intelligent chatbot trained on Mukul's professional background to answer recruiter questions instantly.
- **3D Hover Interactions**: Interactive project and skill cards with advanced 3D tilt-on-hover effects using Framer Motion.
- **Cinematic Design**: High-end glassmorphism aesthetic with ambient glow orbs, noise overlays, and custom cursor physics.
- **Buttery-Smooth Animations**: Integrated with GSAP and Framer Motion for high-performance, scroll-triggered visual storytelling.

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Animations**: Framer Motion, GSAP
- **3D/Visuals**: React Three Fiber (Background Effects)
- **Styling**: Tailwind CSS & Vanilla CSS (Glassmorphism)
- **Icons**: Lucide React, React Icons

## 📂 Project Structure

```
├── public/                 # Static assets (images, icons)
├── src/                    # Source code
│   ├── app/                # Next.js App Router (Layouts & Pages)
│   ├── components/         # Modular React Components
│   │   ├── Avatar.jsx      # Interactive SVG Avatar logic
│   │   ├── CodingProfiles.jsx # Automated API fetching logic
│   │   ├── Chatbot.jsx     # AI assistant implementation
│   │   ├── Projects.jsx    # 3D project showcase
│   │   └── ...
│   ├── data/
│   │   └── resume.js       # Centralized professional data source
│   └── ...
├── package.json            # Dependencies & Scripts
└── README.md               # You are here
```

## 🚀 Getting Started

1. **Clone & Install**:
   ```bash
   git clone https://github.com/mukulxyadav/portfolio.git
   cd portfolio
   npm install
   ```

2. **Run Locally**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🌐 Deployment

This project is optimized for deployment on **Vercel**. Simply push your changes to GitHub, and Vercel will handle the rest.

---

Designed and Developed by [Mukul Kumar](https://github.com/mukulxyadav).
